import React, { useState } from 'react';
import { Question, UserAnswer } from '../types';
import { CheckCircleIcon, XCircleIcon } from './Icons';
import Modal from './Modal';

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: () => void;
  onNextQuestion: () => void;
  onExit: () => void;
  lastAnswerResult: UserAnswer | null;
  isLastQuestion: boolean;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, questionNumber, totalQuestions, onSubmit, onNextQuestion, onExit, lastAnswerResult, isLastQuestion, selectedAnswer, setSelectedAnswer }) => {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const isAnswered = !!lastAnswerResult;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswer.trim() === '' || isAnswered) return;
    onSubmit();
  };

  const handleExitClick = () => {
    setIsExitModalOpen(true);
  };

  const handleConfirmExit = () => {
    setIsExitModalOpen(false);
    onExit();
  };

  const renderQuestionBody = () => {
    if (question.questionType === 'multiple-choice' && question.options) {
      return (
        <fieldset disabled={isAnswered} className="space-y-4">
          <legend className="sr-only">Svarsalternativ</legend>
          {question.options.map((option, index) => {
            let optionClassName = 'bg-black border-zinc-800';
            let icon = null;

            if (isAnswered) {
              const isCorrectAnswer = option.text === question.correctAnswer;
              const isSelectedAnswer = option.text === lastAnswerResult.answer;

              if (isCorrectAnswer) {
                optionClassName = 'bg-green-900/20 border-green-800';
                icon = <CheckCircleIcon className="w-6 h-6 text-green-400" />;
              } else if (isSelectedAnswer && !isCorrectAnswer) {
                optionClassName = 'bg-red-900/30 border-red-700';
                icon = <XCircleIcon className="w-6 h-6 text-red-400" />;
              } else {
                optionClassName = 'bg-black border-zinc-800 opacity-50';
              }
            } else {
              if (selectedAnswer === option.text) {
                optionClassName = 'bg-zinc-900 border-white';
              } else {
                optionClassName = 'bg-black border-zinc-800 hover:border-zinc-500';
              }
            }

            return (
              <label
                key={index}
                className={`flex items-center p-4 rounded-lg border-2 transition-all duration-300 ${isAnswered ? '' : 'cursor-pointer'} ${optionClassName}`}
              >
                <input
                  type="radio"
                  name="option"
                  value={option.text}
                  checked={selectedAnswer === option.text}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="hidden"
                />
                 <span className={`w-6 h-6 mr-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selectedAnswer === option.text && !isAnswered ? 'border-white' : 'border-zinc-700'} ${ isAnswered ? 'bg-transparent border-transparent' : 'bg-zinc-900'}`}>
                   {icon}
                 </span>
                <span className="text-zinc-200 text-lg flex-1">{option.text}</span>
              </label>
            );
          })}
        </fieldset>
      );
    } else {
      return (
        <textarea
          value={isAnswered ? lastAnswerResult.answer : selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          placeholder="Skriv ditt svar här..."
          readOnly={isAnswered}
          className="w-full h-48 p-4 bg-zinc-900 border-2 border-zinc-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-lg disabled:opacity-70 disabled:bg-zinc-900/70"
        />
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={handleConfirmExit}
        title="Avsluta provet"
        confirmText="Avsluta"
      >
        <p>Är du säker på att du vill avsluta provet? Dina framsteg kommer att förloras.</p>
      </Modal>

      <div className="min-h-screen flex items-center justify-center bg-black p-4 relative">
        <div className="absolute top-6 right-6 z-10">
          <button
            type="button"
            onClick={handleExitClick}
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Avsluta provet och återgå till menyn"
          >
            <XCircleIcon className="w-8 h-8" />
          </button>
        </div>

        <div className="w-full max-w-3xl">
          <div className="bg-black border border-zinc-800 rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center text-zinc-400 mb-2">
                <span>Fråga {questionNumber} av {totalQuestions}</span>
                 {isAnswered && lastAnswerResult ? (
                  <div className={`font-bold flex items-center gap-2 px-3 py-1 rounded-full text-sm ${lastAnswerResult.isCorrect ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {lastAnswerResult.isCorrect ? <CheckCircleIcon className="w-5 h-5"/> : <XCircleIcon className="w-5 h-5"/>}
                    <span>{lastAnswerResult.score}/{question.points}p</span>
                  </div>
                ) : (
                  <span className="font-bold text-zinc-400">{question.points} poäng</span>
                )}
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2.5">
                <div className="bg-white h-2.5 rounded-full" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">{question.questionText}</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                {renderQuestionBody()}
              </div>
              
              {isAnswered && lastAnswerResult && !(lastAnswerResult.isCorrect && question.questionType === 'multiple-choice') && (
                <div className={`mt-6 p-4 rounded-lg border ${lastAnswerResult.isCorrect ? 'bg-green-900/20 border-green-700' : 'bg-orange-900/20 border-orange-700'}`}>
                  <div className="flex items-start">
                    {lastAnswerResult.isCorrect ? <CheckCircleIcon className="w-8 h-8 text-green-400 mr-3 flex-shrink-0" /> : <XCircleIcon className="w-8 h-8 text-orange-400 mr-3 flex-shrink-0" />}
                    <div>
                      <h3 className={`text-xl font-bold ${lastAnswerResult.isCorrect ? 'text-green-300' : 'text-orange-300'}`}>
                        {lastAnswerResult.isCorrect ? `Rätt! (${lastAnswerResult.score}/${question.points}p)` : `Fel. (${lastAnswerResult.score}/${question.points}p)`}
                      </h3>
                      {lastAnswerResult.feedback && <p className="text-zinc-300 mt-1">{lastAnswerResult.feedback}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8">
                {isAnswered ? (
                   <button
                      type="button"
                      onClick={onNextQuestion}
                      className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg text-lg hover:bg-zinc-200 transition-all focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                    >
                      {isLastQuestion ? 'Visa resultat' : 'Nästa fråga'}
                    </button>
                ) : (
                   <button
                    type="submit"
                    disabled={selectedAnswer.trim() === ''}
                    className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg text-lg hover:bg-zinc-200 transition-all disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                  >
                    Svara
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizScreen;
