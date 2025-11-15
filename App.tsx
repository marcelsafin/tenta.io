import React, { useState, useCallback } from 'react';
import { AppState, Question, UserAnswer } from './types';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import Loader from './components/Loader';
import { gradeOpenEndedAnswer } from './services/geminiService';
import { quizQuestions } from './data/quizData';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lastAnswerResult, setLastAnswerResult] = useState<UserAnswer | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const [isHintLoading, setIsHintLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [hintUsed, setHintUsed] = useState(false);

  const handleStartQuiz = useCallback((mode: 'linear' | 'shuffle') => {
    setAppState('loading');
    setError(null);
    try {
      let questionsToSet: Question[];
      if (mode === 'shuffle') {
        // Shuffle questions to make it feel different each time
        questionsToSet = [...quizQuestions].sort(() => Math.random() - 0.5);
      } else {
        // Use questions in their original order
        questionsToSet = [...quizQuestions];
      }

      if (questionsToSet && questionsToSet.length > 0) {
        // Use a small timeout to ensure the loading screen is visible for a moment,
        // providing a smoother user experience than an instantaneous flash.
        setTimeout(() => {
          setQuestions(questionsToSet);
          setCurrentQuestionIndex(0);
          setUserAnswers([]);
          setLastAnswerResult(null);
          setSelectedAnswer('');
          setAppState('quiz');
        }, 500);
      } else {
        throw new Error("Provet som genererades var tomt.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett okänt fel uppstod.");
      setAppState('error');
    }
  }, []);

  const handleGetHint = useCallback(() => {
    if (hintUsed || isHintLoading) return;

    setIsHintLoading(true);
    const currentQuestion = questions[currentQuestionIndex];
    const hintText = currentQuestion.hint || "Inget tips tillgängligt för denna fråga.";

    // Simulate a short loading time for better UX, even though it's instant
    setTimeout(() => {
        setHint(hintText);
        setHintUsed(true);
        setIsHintLoading(false);
    }, 300);

  }, [currentQuestionIndex, questions, hintUsed, isHintLoading]);


  const handleAnswerSubmit = useCallback(async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const answer = selectedAnswer;
    let result: { score: number; feedback: string; isCorrect: boolean };

    if (currentQuestion.questionType === 'multiple-choice') {
      const isCorrect = answer === currentQuestion.correctAnswer;
      // For multiple choice, we might have multiple correct answers if we split the string
      let isAlsoCorrect = false;
      if (currentQuestion.correctAnswer.includes(', ')) {
          const correctAnswers = currentQuestion.correctAnswer.split(', ');
          isAlsoCorrect = correctAnswers.includes(answer);
      }

      const finalIsCorrect = isCorrect || isAlsoCorrect;
      
      const score = finalIsCorrect ? currentQuestion.points : 0;

      result = {
        score: score,
        feedback: finalIsCorrect ? "" : currentQuestion.feedbackForWrongAnswer,
        isCorrect: finalIsCorrect,
      };
    } else {
      setAppState('grading');
      try {
        const gradingResult = await gradeOpenEndedAnswer(currentQuestion, answer);
        
        result = {
          ...gradingResult,
          isCorrect: gradingResult.score === currentQuestion.points,
        };
      } catch (err) {
         setError(err instanceof Error ? err.message : "Ett okänt fel uppstod vid rättning.");
         setAppState('error');
         return;
      }
    }

    const newUserAnswer: UserAnswer = {
      question: currentQuestion,
      answer,
      isCorrect: result.isCorrect,
      score: result.score,
      feedback: result.feedback,
    };

    setUserAnswers(prev => [...prev, newUserAnswer]);
    setLastAnswerResult(newUserAnswer);
    setAppState('quiz');

  }, [currentQuestionIndex, questions, selectedAnswer]);
  
  const handleNextQuestion = useCallback(() => {
    setLastAnswerResult(null);
    setSelectedAnswer('');
    setHint(null);
    setHintUsed(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setAppState('results');
    }
  }, [currentQuestionIndex, questions.length]);


  const handleRestart = () => {
    setAppState('start');
    setQuestions([]);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setError(null);
    setLastAnswerResult(null);
    setSelectedAnswer('');
    setHint(null);
    setHintUsed(false);
    setIsHintLoading(false);
  };

  const renderContent = () => {
    switch (appState) {
      case 'start':
        return <StartScreen onStart={handleStartQuiz} />;
      case 'loading':
        return <Loader message="Startar..." />;
      case 'grading':
        return <Loader message="Rättar..." />;
      case 'quiz':
        return (
          <QuizScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
            onExit={handleRestart}
            lastAnswerResult={lastAnswerResult}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            onGetHint={handleGetHint}
            isHintLoading={isHintLoading}
            hint={hint}
            hintUsed={hintUsed}
          />
        );
      case 'results':
        return <ResultsScreen answers={userAnswers} onRestart={handleRestart} />;
      case 'error':
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4 text-center">
                <h2 className="text-3xl font-bold text-red-500 mb-4">Ett fel uppstod</h2>
                <p className="text-zinc-400 mb-6 max-w-md">{error}</p>
                <button
                    onClick={handleRestart}
                    className="bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-zinc-200 transition-colors"
                >
                    Försök igen
                </button>
            </div>
        );
      default:
        return <StartScreen onStart={handleStartQuiz} />;
    }
  };

  return <div className="App">{renderContent()}</div>;
};

export default App;