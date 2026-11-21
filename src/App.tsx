import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { TrainerForm } from './components/TrainerForm';
import { GeneratingSequence } from './components/GeneratingSequence';
import { TrainerProfileCard } from './components/TrainerProfileCard';
import { PokemonCard } from './components/PokemonCard';
import { TeamStatsBar } from './components/TeamStatsBar';
import { Footer } from './components/Footer';
import { EasterEggStevenModal, SecretPokeballModal } from './components/EasterEggsModal';
import { TrainerProfile, GeneratedPokemon, STEVEN_EASTER_EGG_TEAM } from './data/pokemonData';
import { generateTeam, calculateTeamStats } from './utils/teamGenerator';
import { generateTrainerCardPdf } from './utils/pdfGenerator';
import { RefreshCw, Download, Share2, Sparkles, Check, ArrowLeft } from 'lucide-react';

type ViewMode = 'landing' | 'form' | 'generating' | 'team';

export function App() {
  const [view, setView] = useState<ViewMode>('landing');
  const [trainer, setTrainer] = useState<TrainerProfile | null>(null);
  const [team, setTeam] = useState<GeneratedPokemon[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Easter Egg Modals
  const [isStevenModalOpen, setIsStevenModalOpen] = useState(false);
  const [isSecretPokeballModalOpen, setIsSecretPokeballModalOpen] = useState(false);

  // Trigger celebratory confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#38bdf8', '#fbbf24', '#ffffff']
      });
    } catch (e) {
      // Graceful fallback
    }
  };

  // 1. Submit Form & Begin Generation
  const handleFormSubmit = (profile: TrainerProfile) => {
    setTrainer(profile);
    setView('generating');
  };

  // 2. Generation complete (called after 2-3s animation)
  const handleGenerationComplete = () => {
    if (trainer?.isEasterEggSteven) {
      setTeam(STEVEN_EASTER_EGG_TEAM);
    } else {
      const newTeam = generateTeam();
      setTeam(newTeam);
    }
    setView('team');
    triggerConfetti();
  };

  // 3. Regenerate 6 Pokémon keeping profile intact
  const handleRegenerateTeam = () => {
    const newTeam = generateTeam(team);
    setTeam(newTeam);
    triggerConfetti();
  };

  // 4. Download PDF Trainer Card
  const handleDownloadPdf = async () => {
    if (!trainer || team.length === 0 || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      await generateTrainerCardPdf(trainer, team);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // 5. Share with Web Share API or Clipboard Fallback
  const handleShare = async () => {
    if (!trainer) return;
    const shareText = `Check out my official Hyderabad Comic Con Pokémon Squad! Trainer: ${trainer.name} (${trainer.trainerId}), Squad: ${team.map(p => p.name).join(', ')}.`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${trainer.name}'s Comic Con Pokémon Team`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 6. Reset / Start New Adventure
  const handleReset = () => {
    setTrainer(null);
    setTeam([]);
    setView('landing');
  };

  // 7. Easter Egg 3 Trigger: Load Steven's Team directly
  const handleLoadStevenTeam = () => {
    const stevenProfile: TrainerProfile = {
      name: 'Shiva Ram (Steven)',
      age: 24,
      gender: 'Male',
      comicConTeam: 'Cosplay Registrations',
      trainerId: 'HYD-7777-SR',
      isEasterEggSteven: true,
    };
    setTrainer(stevenProfile);
    setTeam(STEVEN_EASTER_EGG_TEAM);
    setView('team');
    triggerConfetti();
  };

  const stats = team.length > 0 ? calculateTeamStats(team) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#080d1a] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Header */}
      <Header onReset={handleReset} showReset={view === 'team'} />

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-start w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: LANDING */}
        {view === 'landing' && (
          <LandingHero onStart={() => setView('form')} />
        )}

        {/* VIEW 2: FORM */}
        {view === 'form' && (
          <TrainerForm
            onSubmit={handleFormSubmit}
            onCancel={() => setView('landing')}
          />
        )}

        {/* VIEW 3: GENERATING SEQUENCE ANIMATION */}
        {view === 'generating' && (
          <GeneratingSequence onComplete={handleGenerationComplete} />
        )}

        {/* VIEW 4: TEAM DASHBOARD */}
        {view === 'team' && trainer && (
          <div className="w-full animate-fade-in">
            {/* Trainer Profile Card */}
            <TrainerProfileCard trainer={trainer} />

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-['Rajdhani'] tracking-wide flex items-center gap-2">
                  <span>Your 6-Member Squad</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30 font-sans">
                    READY FOR BATTLE
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Carefully balanced across generations and types for the Comic Con arena
                </p>
              </div>

              {/* Action Buttons Top Bar on Desktop */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={handleRegenerateTeam}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 hover:border-slate-500 active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                  <span>Generate Another Team</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-red-600/30 border border-red-400/30 active:scale-95 disabled:opacity-50"
                >
                  <Download className={`w-3.5 h-3.5 ${isGeneratingPdf ? 'animate-bounce' : ''}`} />
                  <span>{isGeneratingPdf ? 'Rendering PDF...' : 'Download My Trainer Card'}</span>
                </button>
              </div>
            </div>

            {/* 6-Pokemon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {team.map((pokemon, idx) => (
                <PokemonCard key={`${pokemon.id}-${idx}`} pokemon={pokemon} index={idx} />
              ))}
            </div>

            {/* Team Battle Analytics Bar */}
            {stats && <TeamStatsBar stats={stats} />}

            {/* Bottom Actions Hub */}
            <div className="mt-8 p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  {shareSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-amber-400" />
                      <span>Share Squad</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Start A New Adventure</span>
                </button>
              </div>

              {/* PDF reminder */}
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 border border-red-400/40"
              >
                <Download className="w-4 h-4" />
                <span>Download My Trainer Card (PDF)</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onStevenClick={() => setIsStevenModalOpen(true)}
        onSecretPokeballUnlock={() => setIsSecretPokeballModalOpen(true)}
      />

      {/* Easter Egg 1 & 3 Modal: Steven Credit & Squad Summon */}
      <EasterEggStevenModal
        isOpen={isStevenModalOpen}
        onClose={() => setIsStevenModalOpen(false)}
        onLoadStevenTeam={handleLoadStevenTeam}
      />

      {/* Easter Egg 2 Modal: 5-clicks Secret Cosplay Registrations */}
      <SecretPokeballModal
        isOpen={isSecretPokeballModalOpen}
        onClose={() => setIsSecretPokeballModalOpen(false)}
      />
    </div>
  );
}

export default App;
