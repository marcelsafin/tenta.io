import React from 'react';
import { SparklesIcon } from './Icons';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-6">
            <SparklesIcon className="h-16 w-16 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Tenta.io
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 mb-8">
          Dags att visa vad du kan! Lycka till!
        </p>
        <button
          onClick={onStart}
          className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-zinc-200 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 text-xl shadow-lg"
        >
          Starta provet
        </button>
      </div>
    </div>
  );
};

export default StartScreen;