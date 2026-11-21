import React, { useState } from 'react';
import { GeneratedPokemon, TYPE_COLORS } from '../data/pokemonData';
import { Sparkles } from 'lucide-react';

interface PokemonCardProps {
  pokemon: GeneratedPokemon;
  index: number;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, index }) => {
  const [imageState, setImageState] = useState<'primary' | 'fallback' | 'failed'>('primary');

  const primaryType = pokemon.types[0] || 'Normal';
  const typeStyle = TYPE_COLORS[primaryType] || TYPE_COLORS['Normal'];

  const imgSrc =
    imageState === 'primary'
      ? pokemon.sprite
      : imageState === 'fallback'
      ? pokemon.fallbackSprite
      : null;

  return (
    <div
      className={`group relative rounded-2xl glass-panel-interactive p-4 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 ${typeStyle.border}`}
      style={{
        boxShadow: `0 8px 24px -6px rgba(0, 0, 0, 0.6)`,
      }}
    >
      {/* Subtle type-colored gradient accent in background */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none ${typeStyle.bg}`}
      />

      {/* Top Header: Dex Number & Level Badge */}
      <div className="flex items-center justify-between z-10 mb-2">
        <span className="font-mono text-xs font-bold text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
          #{pokemon.id.toString().padStart(3, '0')}
        </span>

        <div className="flex items-center gap-1 bg-amber-400 text-slate-950 font-black text-xs px-2 py-0.5 rounded shadow-sm">
          <span>LV.</span>
          <span>{pokemon.level}</span>
        </div>
      </div>

      {/* Pokemon Artwork Area */}
      <div className="relative py-2 flex items-center justify-center min-h-[140px]">
        {/* Glow circle behind Pokemon */}
        <div className="absolute w-28 h-28 rounded-full bg-slate-900/80 border border-slate-800/80 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
          <div className={`w-20 h-20 rounded-full ${typeStyle.bg} filter blur-sm`} />
        </div>

        {imgSrc ? (
          <img
            src={imgSrc}
            alt={pokemon.name}
            loading="lazy"
            onError={() => {
              if (imageState === 'primary') {
                setImageState('fallback');
              } else {
                setImageState('failed');
              }
            }}
            className="relative z-10 w-28 h-28 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="relative z-10 w-28 h-28 flex flex-col items-center justify-center text-center p-2">
            <span className="text-3xl">⚡</span>
            <span className="text-[11px] font-bold text-slate-400 mt-1">{pokemon.name}</span>
          </div>
        )}

        {pokemon.isLegendary && (
          <div className="absolute top-1 right-1 z-20 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Legend</span>
          </div>
        )}
      </div>

      {/* Bottom: Name & Type Badges */}
      <div className="z-10 mt-2 text-center">
        <h4 className="text-lg font-black text-white font-['Rajdhani'] uppercase tracking-wide group-hover:text-sky-300 transition-colors">
          {pokemon.name}
        </h4>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">
          Gen {pokemon.generation}
        </p>

        {/* Type Badges */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {pokemon.types.map((type) => {
            const style = TYPE_COLORS[type] || TYPE_COLORS['Normal'];
            return (
              <span
                key={type}
                className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white shadow-sm ${style.badge}`}
              >
                {type}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
