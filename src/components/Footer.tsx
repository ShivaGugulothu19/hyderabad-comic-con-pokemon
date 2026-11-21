import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onStevenClick: () => void;
  onSecretPokeballUnlock: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStevenClick, onSecretPokeballUnlock }) => {
  const [clickCount, setClickCount] = useState(0);

  const handlePokeballClick = () => {
    const nextCount = clickCount + 1;
    if (nextCount >= 5) {
      setClickCount(0);
      onSecretPokeballUnlock();
    } else {
      setClickCount(nextCount);
    }
  };

  return (
    <footer className="w-full mt-auto border-t border-slate-800/80 bg-slate-950/90 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Interactive Footer Poké Ball for Easter Egg 2 */}
        <div className="flex flex-col items-center">
          <button
            onClick={handlePokeballClick}
            title={clickCount > 0 ? `${5 - clickCount} clicks to unlock secret` : 'Mystery Poké Ball'}
            className="group relative p-2 transition-transform active:scale-90"
          >
            <div className="w-10 h-10 rounded-full border-2 border-slate-800 group-hover:border-red-500 overflow-hidden relative shadow-md shadow-red-500/10 group-hover:rotate-45 transition-all">
              <div className="w-full h-1/2 bg-red-600" />
              <div className="w-full h-1/2 bg-white" />
              <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-slate-950" />
              <div className="absolute top-1/2 left-1/2 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-slate-950 flex items-center justify-center">
                <div className={`w-1.5 h-1.5 rounded-full ${clickCount > 0 ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
              </div>
            </div>
          </button>
          {clickCount > 0 && (
            <span className="text-[10px] text-red-400 font-mono mt-1">
              Secret calibration: {clickCount}/5
            </span>
          )}
        </div>

        {/* Branding & Subtitle */}
        <div>
          <h4 className="text-base font-extrabold uppercase tracking-wider text-slate-200 font-['Rajdhani']">
            Hyderabad Comic Con
          </h4>
          <p className="text-xs text-slate-400">
            An unofficial fan-made Pokémon experience.
          </p>
        </div>

        {/* Easter Egg 1: Clickable Steven Credit */}
        <div className="text-xs text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
          <span>Crafted with a little Pokémon magic by</span>
          <button
            onClick={onStevenClick}
            className="text-sky-400 hover:text-sky-300 font-bold underline decoration-dotted decoration-sky-500/50 hover:decoration-sky-400 transition-all cursor-pointer inline-flex items-center gap-1"
          >
            <span>Steven</span>
            <Heart className="w-3 h-3 text-red-500 inline fill-red-500" />
          </button>
        </div>

        {/* Mandatory Legal & Disclaimer */}
        <div className="max-w-2xl text-[11px] text-slate-400 leading-relaxed pt-2 border-t border-slate-900">
          <p>
            Pokémon and Pokémon character names and images are trademarks of Nintendo, Creatures Inc., and GAME FREAK inc. 
            This is an unofficial, non-commercial fan-created tribute and is neither affiliated with, endorsed by, nor representative of 
            The Pokémon Company, Nintendo, or Comic Con India / Hyderabad Comic Con.
          </p>
        </div>
      </div>
    </footer>
  );
};
