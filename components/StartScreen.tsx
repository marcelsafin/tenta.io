import React from 'react';
import { SparklesIcon } from './Icons';

interface StartScreenProps {
  onStart: (mode: 'linear' | 'shuffle') => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="text-center max-w-3xl">
        <div className="flex justify-center mb-6">
            <SparklesIcon className="h-16 w-16 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Tenta.io
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 mb-12">
          Välj ett läge för att starta provet. Lycka till!
        </p>
        
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 md:gap-8">
          
          <div className="flex-1 flex flex-col p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-3">Linjärt Läge</h2>
            <p className="text-zinc-400 mb-6 flex-grow">
              Frågorna kommer i förutbestämd ordning. Perfekt för en strukturerad genomgång.
            </p>
            <button
              onClick={() => onStart('linear')}
              className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-zinc-200 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 text-lg shadow-lg"
            >
              Starta Linjärt
            </button>
          </div>
          
          <div className="flex-1 flex flex-col p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-3">Slumpmässigt Läge</h2>
            <p className="text-zinc-400 mb-6 flex-grow">
              Frågorna blandas för en ny utmaning varje gång.
            </p>
            <button
              onClick={() => onStart('shuffle')}
              className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-zinc-200 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 text-lg shadow-lg"
            >
              Starta Slumpmässigt
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StartScreen;