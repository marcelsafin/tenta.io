
import React from 'react';
import { UserAnswer } from '../types';
import { CheckCircleIcon, XCircleIcon, BookOpenIcon } from './Icons';

interface ResultsScreenProps {
  answers: UserAnswer[];
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ answers, onRestart }) => {
  const totalScore = answers.reduce((sum, ans) => sum + ans.score, 0);
  const maxScore = answers.reduce((sum, ans) => sum + ans.question.points, 0);
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Fantastiskt! Du har full koll på React!";
    if (percentage >= 70) return "Mycket bra jobbat! Du är på god väg att bli en React-expert.";
    if (percentage >= 50) return "Bra försök! Fortsätt öva på de områden du hade svårt med.";
    return "Fortsätt kämpa! Repetition är nyckeln till framgång. Gå igenom feedbacken noga.";
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Resultat</h1>
          <p className="text-xl text-zinc-400 mb-6">{getPerformanceMessage()}</p>
          <div className="flex items-center justify-center space-x-4">
            <div className={`text-6xl font-bold ${percentage >= 50 ? 'text-green-400' : 'text-red-400'}`}>{percentage}%</div>
            <div className="text-left">
              <div className="text-2xl font-semibold text-white">{totalScore} / {maxScore}</div>
              <div className="text-zinc-500">poäng</div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Genomgång av frågor</h2>
        <div className="space-y-4">
          {answers.map((ans, index) => (
            <div key={index} className="bg-zinc-900 rounded-lg p-5 border border-zinc-800">
              <div className="flex items-start justify-between mb-3">
                <p className="text-lg font-semibold text-white flex-1">{index + 1}. {ans.question.questionText}</p>
                <div className={`flex items-center gap-2 font-bold text-lg ml-4 ${ans.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {ans.isCorrect ? <CheckCircleIcon className="w-6 h-6" /> : <XCircleIcon className="w-6 h-6" />}
                  <span>{ans.score}/{ans.question.points}p</span>
                </div>
              </div>

              <div className="bg-black p-3 rounded-md mb-3 border border-zinc-800">
                <p className="text-sm text-zinc-500 mb-1">Ditt svar:</p>
                <p className="text-zinc-200 whitespace-pre-wrap">{ans.answer}</p>
              </div>

              {!ans.isCorrect && (
                 <div className="bg-orange-900/10 p-3 rounded-md mb-3 border border-orange-800/50 space-y-3">
                    <div>
                      <p className="text-sm text-orange-400/80 mb-1 font-semibold">Korrekt svar/koncept:</p>
                      <p className="text-zinc-200 whitespace-pre-wrap text-sm">{ans.question.correctAnswer}</p>
                    </div>
                    {ans.question.simpleCorrectAnswer && (
                        <div>
                            <p className="text-sm text-orange-400/80 mb-1 font-semibold">Enkel förklaring:</p>
                            <p className="text-zinc-200 whitespace-pre-wrap text-sm">{ans.question.simpleCorrectAnswer}</p>
                        </div>
                    )}
                     {ans.question.w3sLink && (
                        <div>
                            <p className="text-sm text-orange-400/80 mb-2 font-semibold">Lär dig mer:</p>
                            <a href={ans.question.w3sLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors">
                            <BookOpenIcon className="w-4 h-4" />
                            W3Schools
                            </a>
                        </div>
                      )}
                 </div>
              )}
              
              {ans.feedback && (
                <div className="bg-zinc-900/50 p-3 rounded-md border border-zinc-800">
                     <p className="text-sm text-zinc-400 mb-1">Feedback från AI:</p>
                     <p className="text-zinc-200 whitespace-pre-wrap">{ans.feedback}</p>
                </div>
              )}

            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={onRestart}
            className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-zinc-200 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 text-xl shadow-lg"
          >
            Gör om provet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;