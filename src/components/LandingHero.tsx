import React from 'react';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

interface LandingHeroProps {
  onStart: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden py-12 md:py-20 flex flex-col items-center text-center px-4 sm:px-6">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Comic Con Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner mb-6 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        <span className="text-xs uppercase font-bold tracking-widest text-slate-300">
          Hyderabad Comic Con Arena Experience
        </span>
      </div>

      {/* Prominent Poké Ball Centerpiece */}
      <div className="relative my-4 group cursor-pointer" onClick={onStart}>
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full border-4 border-slate-900 overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.35)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-12">
          {/* Top Half Red */}
          <div className="w-full h-1/2 bg-gradient-to-b from-red-500 to-red-600 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-28 h-28 bg-white/20 rounded-full blur-md" />
          </div>
          {/* Bottom Half White */}
          <div className="w-full h-1/2 bg-gradient-to-b from-slate-100 to-slate-200" />
          {/* Center Dividing Belt */}
          <div className="absolute top-1/2 left-0 right-0 h-4 -translate-y-1/2 bg-slate-950 flex items-center justify-center">
            <div className="w-full h-0.5 bg-sky-400/30" />
          </div>
          {/* Center Button */}
          <div className="absolute top-1/2 left-1/2 w-14 h-14 sm:w-16 sm:h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-4 border-slate-950 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_#38bdf8] transition-shadow">
            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-slate-400 group-hover:bg-sky-400 transition-colors animate-pulse" />
          </div>
        </div>

        {/* Orbiting particles */}
        <div className="absolute -top-2 -right-2 p-2 bg-slate-900/90 rounded-full border border-amber-500/50 shadow-lg text-amber-400">
          <Sparkles className="w-5 h-5 animate-spin-slow" />
        </div>
        <div className="absolute -bottom-2 -left-2 p-2 bg-slate-900/90 rounded-full border border-sky-500/50 shadow-lg text-sky-400">
          <Zap className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-['Rajdhani'] uppercase leading-none max-w-4xl">
        YOUR ADVENTURE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-sky-400">STARTS HERE.</span>
      </h1>

      {/* Subtitle */}
      <h2 className="mt-3 text-lg sm:text-2xl font-semibold text-sky-300 font-['Rajdhani'] tracking-wide">
        Every trainer needs a team. Let's find yours.
      </h2>

      {/* Description */}
      <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
        Discover your Pokémon identity, generate your six-member team and download your personalised trainer card.
      </p>

      {/* Primary CTA Button */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onStart}
          className="relative group px-8 py-4 rounded-xl font-bold text-base sm:text-lg tracking-wider uppercase text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 border border-red-400/40"
        >
          <span>CREATE MY TEAM</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Features summary pills */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl text-left">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> 6 Unique Pokémon
          </div>
          <p className="text-xs text-slate-400">Weighted balanced squad spanning Gen 1 through 9</p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-rose-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Trainer ID Card
          </div>
          <p className="text-xs text-slate-400">Personalized avatar based on your Comic Con squad</p>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Instant PDF Export
          </div>
          <p className="text-xs text-slate-400">High-resolution downloadable souvenir card</p>
        </div>
      </div>
    </div>
  );
};
