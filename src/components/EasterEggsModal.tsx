import React, { useState } from 'react';
import { X, Sparkles, Shield, UserCheck, Zap } from 'lucide-react';
import { TRAINER_CHARACTERS } from '../data/trainerAssets';

interface EasterEggStevenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadStevenTeam: () => void;
}

export const EasterEggStevenModal: React.FC<EasterEggStevenModalProps> = ({
  isOpen,
  onClose,
  onLoadStevenTeam,
}) => {
  const [imgError, setImgError] = useState(false);
  if (!isOpen) return null;

  const steven = TRAINER_CHARACTERS.Steven;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl glass-panel p-6 border-2 border-red-500/60 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Surprise Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/40 mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Easter Egg 1 Unlocked</span>
        </div>

        <h3 className="text-2xl font-black text-white font-['Rajdhani'] uppercase tracking-wider mb-1">
          "WAIT... YOU FOUND ME!"
        </h3>

        {/* Steven Profile Card */}
        <div className="my-5 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center gap-4">
          <div className="w-20 h-20 rounded-xl bg-slate-950 border border-slate-800 p-1 shrink-0 overflow-hidden">
            <img
              src={!imgError ? steven.imageUrl : steven.fallbackSvg}
              alt="Steven"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>

          <div>
            <h4 className="text-lg font-bold text-white font-['Rajdhani'] leading-tight">
              Shiva Ram, better known as Steven.
            </h4>
            <p className="text-xs font-semibold text-rose-400 mt-0.5 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Volunteer | Cosplay Registrations
            </p>
            <p className="text-xs text-sky-400 font-bold uppercase tracking-wider mt-1">
              Hyderabad Comic Con
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Welcome to the Cosplay desk! Whether you're dressed as Ash Ketchum or Cynthia, every trainer has a place here.
        </p>

        {/* Action: Easter Egg 3 Loader */}
        <button
          onClick={() => {
            onLoadStevenTeam();
            onClose();
          }}
          className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2 border border-red-400/40"
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>Summon Steven's Hidden Squad</span>
        </button>
      </div>
    </div>
  );
};

interface SecretPokeballModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretPokeballModal: React.FC<SecretPokeballModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl glass-panel p-6 border-2 border-sky-500/60 shadow-[0_0_50px_rgba(56,189,248,0.3)] text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-lg">
          <UserCheck className="w-8 h-8 animate-bounce" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-500/40 mb-3">
          <span>Easter Egg 2 Unlocked</span>
        </div>

        <h3 className="text-2xl font-black text-white font-['Rajdhani'] uppercase tracking-wider mb-2">
          "SECRET UNLOCKED: COSPLAY REGISTRATIONS"
        </h3>

        <p className="text-sm text-slate-300 font-medium italic my-4 px-4 leading-relaxed">
          "Even the rarest Pokémon need to register before entering the arena."
        </p>

        <p className="text-xs text-slate-400 mb-6">
          Presented with love from the Comic Con Volunteer Crew.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
        >
          Return to Arena
        </button>
      </div>
    </div>
  );
};
