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
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = useCallback(() => {
    setAppState('loading');
    setError(null);
    try {
      // Shuffle questions to make it feel different each time
      const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);

      if (shuffledQuestions && shuffledQuestions.length > 0) {
        // Use a small timeout to ensure the loading screen is visible for a moment,
        // providing a smoother user experience than an instantaneous flash.
        setTimeout(() => {
          setQuestions(shuffledQuestions);
          setCurrentQuestionIndex(0);
          setUserAnswers([]);
          setLastAnswerResult(null);
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

  const handleAnswerSubmit = useCallback(async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
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

      result = {
        score: finalIsCorrect ? currentQuestion.points : 0,
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

  }, [currentQuestionIndex, questions]);
  
  const handleNextQuestion = useCallback(() => {
    setLastAnswerResult(null);
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
  };

  const renderContent = () => {
    switch (appState) {
      case 'start':
        return <StartScreen onStart={handleStartQuiz} />;
      case 'loading':
        return <Loader message="Genererar ditt personliga prov..." />;
      case 'grading':
        return <Loader message="AI:n rättar ditt svar..." />;
      case 'quiz':
        return (
          <QuizScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
            lastAnswerResult={lastAnswerResult}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
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
