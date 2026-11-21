import React, { useState } from 'react';
import { TrainerProfile } from '../data/pokemonData';
import { TRAINER_CHARACTERS } from '../data/trainerAssets';
import { Shield, Sparkles, Award, Hash } from 'lucide-react';

interface TrainerProfileCardProps {
  trainer: TrainerProfile;
}

export const TrainerProfileCard: React.FC<TrainerProfileCardProps> = ({ trainer }) => {
  const [imageError, setImageError] = useState(false);

  // Determine avatar character
  let character = TRAINER_CHARACTERS.Neutral;
  if (trainer.isEasterEggSteven) {
    character = TRAINER_CHARACTERS.Steven;
  } else if (trainer.gender === 'Male') {
    character = TRAINER_CHARACTERS.Red;
  } else if (trainer.gender === 'Female') {
    character = trainer.femaleCharacter === 'Dawn' ? TRAINER_CHARACTERS.Dawn : TRAINER_CHARACTERS.Serena;
  }

  const avatarSrc = !imageError && character.imageUrl ? character.imageUrl : character.fallbackSvg;

  return (
    <div className="relative rounded-2xl glass-panel p-5 sm:p-6 border border-slate-800 shadow-xl overflow-hidden mb-8">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
        {/* Avatar Display */}
        <div className="relative group shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-red-500/50 p-2 overflow-hidden shadow-lg shadow-red-500/10 flex items-center justify-center">
            <img
              src={avatarSrc}
              alt={character.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-600 to-rose-600 text-white p-1.5 rounded-lg border border-red-400 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Info Column */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/30 flex items-center gap-1">
              <Shield className="w-3 h-3" /> Hyderabad Comic Con Pass
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-900 text-sky-400 border border-slate-800 flex items-center gap-1">
              <Hash className="w-3 h-3" /> {trainer.trainerId}
            </span>
          </div>

          {/* Trainer Name */}
          <h2 className="text-2xl sm:text-3xl font-black text-white font-['Rajdhani'] uppercase tracking-wide">
            {trainer.name}
          </h2>

          {/* Details Row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Team:</span>
              <strong className="text-slate-100">{trainer.comicConTeam}</strong>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-slate-400">Avatar:</span>
              <strong className="text-sky-300 font-['Rajdhani'] text-sm tracking-wide">
                {character.name} {character.title ? `(${character.title})` : ''}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
