import React, { useState } from 'react';
import { User, Calendar, Award, Sparkles, AlertCircle } from 'lucide-react';
import { Gender, ComicConTeam, TrainerProfile, COMIC_CON_TEAMS } from '../data/pokemonData';
import { generateTrainerId } from '../utils/teamGenerator';

interface TrainerFormProps {
  onSubmit: (profile: TrainerProfile) => void;
  onCancel?: () => void;
}

export const TrainerForm: React.FC<TrainerFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<Gender>('Male');
  const [comicConTeam, setComicConTeam] = useState<ComicConTeam>('Welcoming');
  const [otherTeamName, setOtherTeamName] = useState('');

  const [errors, setErrors] = useState<{ name?: string; age?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; age?: string } = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = 'Trainer name is required';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const parsedAge = parseInt(age, 10);
    if (!age || isNaN(parsedAge)) {
      newErrors.age = 'Please enter a valid age';
    } else if (parsedAge < 5 || parsedAge > 99) {
      newErrors.age = 'Age must be between 5 and 99';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if name triggers Steven easter egg
    const isSteven = trimmedName.toLowerCase() === 'steven' || trimmedName.toLowerCase() === 'shiva ram';

    // Female character random assignment: Dawn or Serena
    const femaleCharacter = Math.random() > 0.5 ? 'Dawn' : 'Serena';

    const finalTeam = isSteven
      ? 'Cosplay Registrations'
      : (comicConTeam === 'Other' && otherTeamName.trim() ? otherTeamName.trim() : comicConTeam);

    const profile: TrainerProfile = {
      name: trimmedName,
      age: parsedAge,
      gender,
      comicConTeam: finalTeam,
      trainerId: generateTrainerId(),
      femaleCharacter,
      isEasterEggSteven: isSteven
    };

    onSubmit(profile);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      <div className="relative rounded-2xl glass-panel p-6 sm:p-8 shadow-2xl border border-slate-700/60 overflow-hidden">
        {/* Top ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-sky-400" />
        
        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 mb-3 text-red-400 shadow-inner">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-['Rajdhani'] tracking-wide">
            Trainer Registration
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fill in your credentials to initialize your Hyderabad Comic Con Poké Ball
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Trainer Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-sky-400" /> Trainer Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="e.g. Ash Ketchum or Shiva Ram"
              maxLength={30}
              className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                errors.name
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
                  : 'border-slate-700 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Age and Sex Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Age
              </label>
              <input
                type="number"
                min="5"
                max="99"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  if (errors.age) setErrors({ ...errors, age: undefined });
                }}
                placeholder="e.g. 21"
                className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                  errors.age
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500/30'
                    : 'border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'
                }`}
              />
              {errors.age && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.age}
                </p>
              )}
            </div>

            {/* Sex / Gender */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Sex
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Male', 'Female', 'Prefer not to say'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center text-center ${
                      gender === g
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30 border border-red-400'
                        : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {g === 'Prefer not to say' ? 'Neutral' : g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comic Con Team */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-red-400" /> Comic Con Squad / Team
            </label>
            <div className="relative">
              <select
                value={comicConTeam}
                onChange={(e) => setComicConTeam(e.target.value as ComicConTeam)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 appearance-none cursor-pointer"
              >
                {COMIC_CON_TEAMS.map((team) => (
                  <option key={team} value={team} className="bg-slate-950 text-slate-200">
                    {team}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {comicConTeam === 'Other' && (
              <div className="mt-2.5">
                <input
                  type="text"
                  value={otherTeamName}
                  onChange={(e) => setOtherTeamName(e.target.value)}
                  placeholder="Specify custom squad / department name..."
                  maxLength={35}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 text-xs transition-all"
                />
              </div>
            )}
          </div>

          {/* Privacy Note */}
          <p className="text-[11px] text-slate-500 text-center">
            No emails, passwords, or sensitive personal data collected. Pure fan experience.
          </p>

          {/* Submit Action */}
          <div className="pt-2 flex items-center gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-1/3 py-3.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all border border-red-400/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Initialize & Generate Team</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
