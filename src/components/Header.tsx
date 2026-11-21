import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
  showReset?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReset, showReset }) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Animated Mini Pokeball */}
          <div className="relative w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden shadow-md shadow-rose-500/20 group-hover:rotate-180 transition-transform duration-700">
            <div className="w-full h-1/2 bg-red-600" />
            <div className="w-full h-1/2 bg-white" />
            <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-slate-900" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-slate-900 shadow-sm" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-sky-400 font-['Rajdhani'] text-lg sm:text-xl uppercase">
                Hyderabad Comic Con
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-full">
                Fan Edition
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
              Pokémon Trainer Generator
            </p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 bg-slate-900/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="whitespace-nowrap font-medium">Bharat Future City</span>
          </div>

          {showReset && (
            <button
              onClick={onReset}
              className="text-xs px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>New Trainer</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
