import React from 'react';
import { TeamStats } from '../utils/teamGenerator';
import { BarChart3, TrendingUp, TrendingDown, Layers } from 'lucide-react';

interface TeamStatsBarProps {
  stats: TeamStats;
}

export const TeamStatsBar: React.FC<TeamStatsBarProps> = ({ stats }) => {
  return (
    <div className="w-full mt-6 mb-8 rounded-2xl glass-panel p-4 sm:p-5 border border-slate-800">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/80">
        <BarChart3 className="w-4 h-4 text-sky-400" />
        <h3 className="text-xs uppercase tracking-wider font-bold text-slate-300 font-['Rajdhani']">
          Squad Battle Analytics
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Average Level */}
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Average Level
            </div>
            <div className="text-xl font-black text-white font-['Rajdhani']">
              LV. {stats.averageLevel}
            </div>
          </div>
        </div>

        {/* Highest-level Pokemon */}
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Ace (Highest)
            </div>
            <div className="text-sm font-black text-white font-['Rajdhani'] truncate">
              {stats.highestLevelPokemon.name} <span className="text-amber-400 text-xs">LV.{stats.highestLevelPokemon.level}</span>
            </div>
          </div>
        </div>

        {/* Lowest-level Pokemon */}
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Rookie (Lowest)
            </div>
            <div className="text-sm font-black text-white font-['Rajdhani'] truncate">
              {stats.lowestLevelPokemon.name} <span className="text-amber-400 text-xs">LV.{stats.lowestLevelPokemon.level}</span>
            </div>
          </div>
        </div>

        {/* Unique Types */}
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Unique Types
            </div>
            <div className="text-xl font-black text-white font-['Rajdhani']">
              {stats.uniqueTypesCount} Types
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
