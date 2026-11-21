import { POKEMON_DATA, Pokemon, GeneratedPokemon } from '../data/pokemonData';

// Generates a unique Trainer ID in Comic Con format
export function generateTrainerId(): string {
  const prefix = "HYD";
  const num = Math.floor(1000 + Math.random() * 9000);
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const suffix = chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${num}-${suffix}`;
}

// Generates a varied team of 6 Pokémon
export function generateTeam(previousTeam?: GeneratedPokemon[]): GeneratedPokemon[] {
  const previousIds = new Set(previousTeam?.map(p => p.id) || []);
  let attempts = 0;
  let selected: Pokemon[] = [];

  while (attempts < 10) {
    attempts++;
    selected = [];
    const usedIds = new Set<number>();
    let legendaryCount = 0;

    // Shuffle pool
    const pool = [...POKEMON_DATA].sort(() => 0.5 - Math.random());

    // Group candidates to ensure generational variety
    const generationsPresent = new Set<number>();

    for (const p of pool) {
      if (selected.length >= 6) break;
      if (usedIds.has(p.id)) continue;

      // Rule: Avoid excessive legendaries (Max 1)
      if (p.isLegendary && legendaryCount >= 1) continue;

      // Prioritize mixing generations for the first 4 slots
      if (selected.length < 4 && generationsPresent.has(p.generation) && pool.length > 20) {
        // Chance to skip to encourage other generations
        if (Math.random() < 0.6) continue;
      }

      selected.push(p);
      usedIds.add(p.id);
      generationsPresent.add(p.generation);
      if (p.isLegendary) legendaryCount++;
    }

    // Ensure not identical to previous team
    const isIdentical = selected.length === 6 && selected.every(p => previousIds.has(p.id));
    if (!isIdentical && selected.length === 6) {
      break;
    }
  }

  // Assign random levels between 10 and 100
  // Balanced level distribution: e.g. 1 ace (75-100), others (30-85), 1 rookie (15-35)
  return selected.map((p, index) => {
    let level: number;
    if (index === 0) {
      // Ace Pokémon
      level = Math.floor(75 + Math.random() * 26); // 75 - 100
    } else if (index === 5) {
      // Junior / Rookie member
      level = Math.floor(10 + Math.random() * 30); // 10 - 40
    } else {
      level = Math.floor(25 + Math.random() * 60); // 25 - 85
    }
    // Clamp to 10 - 100
    level = Math.min(100, Math.max(10, level));
    return {
      ...p,
      level,
    };
  });
}

export interface TeamStats {
  averageLevel: number;
  highestLevelPokemon: GeneratedPokemon;
  lowestLevelPokemon: GeneratedPokemon;
  uniqueTypesCount: number;
  uniqueTypes: string[];
}

export function calculateTeamStats(team: GeneratedPokemon[]): TeamStats {
  if (!team || team.length === 0) {
    return {
      averageLevel: 0,
      highestLevelPokemon: {} as GeneratedPokemon,
      lowestLevelPokemon: {} as GeneratedPokemon,
      uniqueTypesCount: 0,
      uniqueTypes: [],
    };
  }

  const totalLevel = team.reduce((sum, p) => sum + p.level, 0);
  const averageLevel = Math.round(totalLevel / team.length);

  let highest = team[0];
  let lowest = team[0];
  const typesSet = new Set<string>();

  for (const p of team) {
    if (p.level > highest.level) highest = p;
    if (p.level < lowest.level) lowest = p;
    p.types.forEach(t => typesSet.add(t));
  }

  return {
    averageLevel,
    highestLevelPokemon: highest,
    lowestLevelPokemon: lowest,
    uniqueTypesCount: typesSet.size,
    uniqueTypes: Array.from(typesSet),
  };
}
