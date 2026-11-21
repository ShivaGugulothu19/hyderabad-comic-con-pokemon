import React, { useEffect, useState } from 'react';
import { Database, Search, Shield, CheckCircle2 } from 'lucide-react';

interface GeneratingSequenceProps {
  onComplete: () => void;
}

const STEPS = [
  { text: 'INITIALISING TRAINER PROFILE', icon: Shield, duration: 600 },
  { text: 'SEARCHING POKÉDEX', icon: Search, duration: 700 },
  { text: 'SELECTING POKÉMON', icon: Database, duration: 700 },
  { text: 'YOUR TEAM IS READY', icon: CheckCircle2, duration: 500 },
];

export const GeneratingSequence: React.FC<GeneratingSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (currentStep < STEPS.length - 1) {
      timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, STEPS[currentStep].duration);
    } else {
      timeout = setTimeout(() => {
        onComplete();
      }, STEPS[currentStep].duration);
    }

    return () => clearTimeout(timeout);
  }, [currentStep, onComplete]);

  const CurrentIcon = STEPS[currentStep].icon;
  const progressPercent = Math.round(((currentStep + 1) / STEPS.length) * 100);

  return (
    <div className="w-full max-w-md mx-auto py-16 px-4 flex flex-col items-center justify-center text-center">
      {/* Animated Poké Ball Radar */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-8">
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-sky-400/30 animate-pulse" />

        {/* Central Poké Ball */}
        <div className="w-24 h-24 rounded-full border-4 border-slate-950 overflow-hidden relative shadow-[0_0_35px_rgba(239,68,68,0.5)] animate-spin-slow">
          <div className="w-full h-1/2 bg-red-600" />
          <div className="w-full h-1/2 bg-white" />
          <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-slate-950" />
          <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-4 border-slate-950 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Progress text */}
      <div className="flex items-center gap-2 mb-3 text-sky-400 font-bold uppercase tracking-widest text-xs">
        <CurrentIcon className="w-4 h-4 animate-spin" />
        <span>Step {currentStep + 1} of {STEPS.length}</span>
      </div>

      {/* Current phase headline */}
      <h3 className="text-xl sm:text-2xl font-black text-white font-['Rajdhani'] uppercase tracking-wider h-10 transition-all duration-300">
        {STEPS[currentStep].text}
      </h3>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-2.5 mt-6 overflow-hidden p-0.5">
        <div
          className="bg-gradient-to-r from-red-500 via-amber-400 to-sky-400 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-3 text-[11px] text-slate-500 font-mono">
        HYD-SYS // SYNCING SQUAD DATABASE...
      </div>
    </div>
  );
};
