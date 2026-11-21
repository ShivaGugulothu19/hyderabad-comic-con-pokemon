export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  generation: number;
  isLegendary?: boolean;
  sprite: string;
  fallbackSprite: string;
}

export interface GeneratedPokemon extends Pokemon {
  level: number;
}

export type Gender = 'Male' | 'Female' | 'Prefer not to say';

export type ComicConTeam =
  | 'Cosplay Registrations'
  | 'Event Management'
  | 'Operations'
  | 'Artist Alley'
  | 'Gaming'
  | 'Photography'
  | 'General Attendee'
  | 'Other';

export interface TrainerProfile {
  name: string;
  age: number;
  gender: Gender;
  comicConTeam: ComicConTeam;
  trainerId: string;
  femaleCharacter?: 'Dawn' | 'Serena';
  isEasterEggSteven?: boolean;
}

export const POKEMON_DATA: Pokemon[] = [
  // Gen 1
  { id: 1, name: "Bulbasaur", types: ["Grass", "Poison"], generation: 1 },
  { id: 3, name: "Venusaur", types: ["Grass", "Poison"], generation: 1 },
  { id: 4, name: "Charmander", types: ["Fire"], generation: 1 },
  { id: 6, name: "Charizard", types: ["Fire", "Flying"], generation: 1 },
  { id: 7, name: "Squirtle", types: ["Water"], generation: 1 },
  { id: 9, name: "Blastoise", types: ["Water"], generation: 1 },
  { id: 25, name: "Pikachu", types: ["Electric"], generation: 1 },
  { id: 26, name: "Raichu", types: ["Electric"], generation: 1 },
  { id: 38, name: "Ninetales", types: ["Fire"], generation: 1 },
  { id: 59, name: "Arcanine", types: ["Fire"], generation: 1 },
  { id: 65, name: "Alakazam", types: ["Psychic"], generation: 1 },
  { id: 68, name: "Machamp", types: ["Fighting"], generation: 1 },
  { id: 94, name: "Gengar", types: ["Ghost", "Poison"], generation: 1 },
  { id: 123, name: "Scyther", types: ["Bug", "Flying"], generation: 1 },
  { id: 130, name: "Gyarados", types: ["Water", "Flying"], generation: 1 },
  { id: 131, name: "Lapras", types: ["Water", "Ice"], generation: 1 },
  { id: 133, name: "Eevee", types: ["Normal"], generation: 1 },
  { id: 134, name: "Vaporeon", types: ["Water"], generation: 1 },
  { id: 135, name: "Jolteon", types: ["Electric"], generation: 1 },
  { id: 136, name: "Flareon", types: ["Fire"], generation: 1 },
  { id: 143, name: "Snorlax", types: ["Normal"], generation: 1 },
  { id: 144, name: "Articuno", types: ["Ice", "Flying"], generation: 1, isLegendary: true },
  { id: 145, name: "Zapdos", types: ["Electric", "Flying"], generation: 1, isLegendary: true },
  { id: 146, name: "Moltres", types: ["Fire", "Flying"], generation: 1, isLegendary: true },
  { id: 149, name: "Dragonite", types: ["Dragon", "Flying"], generation: 1 },
  { id: 150, name: "Mewtwo", types: ["Psychic"], generation: 1, isLegendary: true },
  { id: 151, name: "Mew", types: ["Psychic"], generation: 1, isLegendary: true },

  // Gen 2
  { id: 157, name: "Typhlosion", types: ["Fire"], generation: 2 },
  { id: 160, name: "Feraligatr", types: ["Water"], generation: 2 },
  { id: 169, name: "Crobat", types: ["Poison", "Flying"], generation: 2 },
  { id: 181, name: "Ampharos", types: ["Electric"], generation: 2 },
  { id: 196, name: "Espeon", types: ["Psychic"], generation: 2 },
  { id: 197, name: "Umbreon", types: ["Dark"], generation: 2 },
  { id: 208, name: "Steelix", types: ["Steel", "Ground"], generation: 2 },
  { id: 212, name: "Scizor", types: ["Bug", "Steel"], generation: 2 },
  { id: 214, name: "Heracross", types: ["Bug", "Fighting"], generation: 2 },
  { id: 229, name: "Houndoom", types: ["Dark", "Fire"], generation: 2 },
  { id: 230, name: "Kingdra", types: ["Water", "Dragon"], generation: 2 },
  { id: 248, name: "Tyranitar", types: ["Rock", "Dark"], generation: 2 },
  { id: 249, name: "Lugia", types: ["Psychic", "Flying"], generation: 2, isLegendary: true },
  { id: 250, name: "Ho-Oh", types: ["Fire", "Flying"], generation: 2, isLegendary: true },

  // Gen 3
  { id: 254, name: "Sceptile", types: ["Grass"], generation: 3 },
  { id: 257, name: "Blaziken", types: ["Fire", "Fighting"], generation: 3 },
  { id: 260, name: "Swampert", types: ["Water", "Ground"], generation: 3 },
  { id: 282, name: "Gardevoir", types: ["Psychic", "Fairy"], generation: 3 },
  { id: 306, name: "Aggron", types: ["Steel", "Rock"], generation: 3 },
  { id: 330, name: "Flygon", types: ["Ground", "Dragon"], generation: 3 },
  { id: 350, name: "Milotic", types: ["Water"], generation: 3 },
  { id: 359, name: "Absol", types: ["Dark"], generation: 3 },
  { id: 373, name: "Salamence", types: ["Dragon", "Flying"], generation: 3 },
  { id: 376, name: "Metagross", types: ["Steel", "Psychic"], generation: 3 },
  { id: 384, name: "Rayquaza", types: ["Dragon", "Flying"], generation: 3, isLegendary: true },
  { id: 385, name: "Jirachi", types: ["Steel", "Psychic"], generation: 3, isLegendary: true },

  // Gen 4
  { id: 389, name: "Torterra", types: ["Grass", "Ground"], generation: 4 },
  { id: 392, name: "Infernape", types: ["Fire", "Fighting"], generation: 4 },
  { id: 395, name: "Empoleon", types: ["Water", "Steel"], generation: 4 },
  { id: 405, name: "Luxray", types: ["Electric"], generation: 4 },
  { id: 407, name: "Roserade", types: ["Grass", "Poison"], generation: 4 },
  { id: 445, name: "Garchomp", types: ["Dragon", "Ground"], generation: 4 },
  { id: 448, name: "Lucario", types: ["Fighting", "Steel"], generation: 4 },
  { id: 461, name: "Weavile", types: ["Dark", "Ice"], generation: 4 },
  { id: 466, name: "Electivire", types: ["Electric"], generation: 4 },
  { id: 468, name: "Togekiss", types: ["Fairy", "Flying"], generation: 4 },
  { id: 471, name: "Glaceon", types: ["Ice"], generation: 4 },
  { id: 475, name: "Gallade", types: ["Psychic", "Fighting"], generation: 4 },
  { id: 483, name: "Dialga", types: ["Steel", "Dragon"], generation: 4, isLegendary: true },
  { id: 484, name: "Palkia", types: ["Water", "Dragon"], generation: 4, isLegendary: true },
  { id: 487, name: "Giratina", types: ["Ghost", "Dragon"], generation: 4, isLegendary: true },
  { id: 491, name: "Darkrai", types: ["Dark"], generation: 4, isLegendary: true },

  // Gen 5
  { id: 497, name: "Serperior", types: ["Grass"], generation: 5 },
  { id: 500, name: "Emboar", types: ["Fire", "Fighting"], generation: 5 },
  { id: 503, name: "Samurott", types: ["Water"], generation: 5 },
  { id: 530, name: "Excadrill", types: ["Ground", "Steel"], generation: 5 },
  { id: 553, name: "Krookodile", types: ["Ground", "Dark"], generation: 5 },
  { id: 571, name: "Zoroark", types: ["Dark"], generation: 5 },
  { id: 609, name: "Chandelure", types: ["Ghost", "Fire"], generation: 5 },
  { id: 612, name: "Haxorus", types: ["Dragon"], generation: 5 },
  { id: 625, name: "Bisharp", types: ["Dark", "Steel"], generation: 5 },
  { id: 635, name: "Hydreigon", types: ["Dark", "Dragon"], generation: 5 },
  { id: 637, name: "Volcarona", types: ["Bug", "Fire"], generation: 5 },
  { id: 643, name: "Reshiram", types: ["Dragon", "Fire"], generation: 5, isLegendary: true },
  { id: 644, name: "Zekrom", types: ["Dragon", "Electric"], generation: 5, isLegendary: true },

  // Gen 6
  { id: 658, name: "Greninja", types: ["Water", "Dark"], generation: 6 },
  { id: 663, name: "Talonflame", types: ["Fire", "Flying"], generation: 6 },
  { id: 675, name: "Pangoro", types: ["Fighting", "Dark"], generation: 6 },
  { id: 681, name: "Aegislash", types: ["Steel", "Ghost"], generation: 6 },
  { id: 700, name: "Sylveon", types: ["Fairy"], generation: 6 },
  { id: 701, name: "Hawlucha", types: ["Fighting", "Flying"], generation: 6 },
  { id: 706, name: "Goodra", types: ["Dragon"], generation: 6 },
  { id: 715, name: "Noivern", types: ["Flying", "Dragon"], generation: 6 },
  { id: 716, name: "Xerneas", types: ["Fairy"], generation: 6, isLegendary: true },
  { id: 717, name: "Yveltal", types: ["Dark", "Flying"], generation: 6, isLegendary: true },

  // Gen 7
  { id: 724, name: "Decidueye", types: ["Grass", "Ghost"], generation: 7 },
  { id: 727, name: "Incineroar", types: ["Fire", "Dark"], generation: 7 },
  { id: 730, name: "Primarina", types: ["Water", "Fairy"], generation: 7 },
  { id: 738, name: "Vikavolt", types: ["Bug", "Electric"], generation: 7 },
  { id: 745, name: "Lycanroc", types: ["Rock"], generation: 7 },
  { id: 748, name: "Toxapex", types: ["Poison", "Water"], generation: 7 },
  { id: 778, name: "Mimikyu", types: ["Ghost", "Fairy"], generation: 7 },
  { id: 784, name: "Kommo-o", types: ["Dragon", "Fighting"], generation: 7 },
  { id: 791, name: "Solgaleo", types: ["Psychic", "Steel"], generation: 7, isLegendary: true },
  { id: 792, name: "Lunala", types: ["Psychic", "Ghost"], generation: 7, isLegendary: true },

  // Gen 8
  { id: 812, name: "Rillaboom", types: ["Grass"], generation: 8 },
  { id: 815, name: "Cinderace", types: ["Fire"], generation: 8 },
  { id: 818, name: "Inteleon", types: ["Water"], generation: 8 },
  { id: 823, name: "Corviknight", types: ["Flying", "Steel"], generation: 8 },
  { id: 849, name: "Toxtricity", types: ["Electric", "Poison"], generation: 8 },
  { id: 861, name: "Grimmsnarl", types: ["Dark", "Fairy"], generation: 8 },
  { id: 865, name: "Sirfetch'd", types: ["Fighting"], generation: 8 },
  { id: 887, name: "Dragapult", types: ["Dragon", "Ghost"], generation: 8 },
  { id: 888, name: "Zacian", types: ["Fairy", "Steel"], generation: 8, isLegendary: true },
  { id: 892, name: "Urshifu", types: ["Fighting", "Dark"], generation: 8, isLegendary: true },

  // Gen 9
  { id: 908, name: "Meowscarada", types: ["Grass", "Dark"], generation: 9 },
  { id: 911, name: "Skeledirge", types: ["Fire", "Ghost"], generation: 9 },
  { id: 914, name: "Quaquaval", types: ["Water", "Fighting"], generation: 9 },
  { id: 937, name: "Ceruledge", types: ["Fire", "Ghost"], generation: 9 },
  { id: 936, name: "Armarouge", types: ["Fire", "Psychic"], generation: 9 },
  { id: 959, name: "Tinkaton", types: ["Fairy", "Steel"], generation: 9 },
  { id: 979, name: "Annihilape", types: ["Fighting", "Ghost"], generation: 9 },
  { id: 980, name: "Clodsire", types: ["Poison", "Ground"], generation: 9 },
  { id: 998, name: "Baxcalibur", types: ["Dragon", "Ice"], generation: 9 },
  { id: 1007, name: "Koraidon", types: ["Fighting", "Dragon"], generation: 9, isLegendary: true },
  { id: 1008, name: "Miraidon", types: ["Electric", "Dragon"], generation: 9, isLegendary: true }
].map((p) => ({
  ...p,
  sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
  fallbackSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
}));

// Easter Egg Team for Steven (Shiva Ram - Cosplay Registrations Volunteer)
// Handcrafted iconic Cosplay/Volunteer themed team: Mimikyu (cosplay master!), Lucario, Gengar, Aegislash, Metagross (Steven Stone homage!), Charizard
export const STEVEN_EASTER_EGG_TEAM: GeneratedPokemon[] = [
  { id: 778, name: "Mimikyu", types: ["Ghost", "Fairy"], generation: 7, level: 95, sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/778.png`, fallbackSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/778.png` },
  { id: 376, name: "Metagross", types: ["Steel", "Psychic"], generation: 3, level: 98, sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/376.png`, fallbackSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/376.png` },
  { id: 448, name: "Lucario", types: ["Fighting", "Steel"], generation: 4, level: 92, sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png`, fallbackSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png` },
  { id: 94, name: "Gengar", types: ["Ghost", "Poison"], generation: 1, level: 90, sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png`, fallbackSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png` },
  { id: 681, name: "Aegislash", types: ["Steel", "Ghost"], generation: 6, level: 88, sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/681.png`, fallbackSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/681.png` },
  { id: 6, name: "Charizard", types: ["Fire", "Flying"], generation: 1, level: 96, sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png`, fallbackSprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png` },
];

export const TYPE_COLORS: Record<string, { bg: string; text: string; border: string; glow: string; badge: string; hex: string }> = {
  Normal: { bg: 'bg-stone-500/20', text: 'text-stone-300', border: 'border-stone-500/40', glow: 'shadow-stone-500/20', badge: 'bg-stone-600', hex: '#A8A878' },
  Fire: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/50', glow: 'shadow-rose-500/30', badge: 'bg-gradient-to-r from-red-600 to-amber-600', hex: '#F08030' },
  Water: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50', glow: 'shadow-blue-500/30', badge: 'bg-gradient-to-r from-blue-600 to-cyan-600', hex: '#6890F0' },
  Grass: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/50', glow: 'shadow-emerald-500/30', badge: 'bg-gradient-to-r from-emerald-600 to-green-600', hex: '#78C850' },
  Electric: { bg: 'bg-amber-400/20', text: 'text-amber-300', border: 'border-amber-400/50', glow: 'shadow-amber-400/30', badge: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold', hex: '#F8D030' },
  Ice: { bg: 'bg-cyan-400/20', text: 'text-cyan-300', border: 'border-cyan-400/50', glow: 'shadow-cyan-400/30', badge: 'bg-gradient-to-r from-cyan-500 to-sky-400', hex: '#98D8D8' },
  Fighting: { bg: 'bg-orange-600/20', text: 'text-orange-400', border: 'border-orange-600/50', glow: 'shadow-orange-600/30', badge: 'bg-gradient-to-r from-orange-700 to-red-700', hex: '#C03028' },
  Poison: { bg: 'bg-purple-600/20', text: 'text-purple-400', border: 'border-purple-600/50', glow: 'shadow-purple-600/30', badge: 'bg-gradient-to-r from-purple-700 to-violet-700', hex: '#A040A0' },
  Ground: { bg: 'bg-amber-700/20', text: 'text-amber-400', border: 'border-amber-700/50', glow: 'shadow-amber-700/30', badge: 'bg-gradient-to-r from-amber-800 to-yellow-800', hex: '#E0C068' },
  Flying: { bg: 'bg-indigo-400/20', text: 'text-indigo-300', border: 'border-indigo-400/50', glow: 'shadow-indigo-400/30', badge: 'bg-gradient-to-r from-indigo-500 to-blue-400', hex: '#A890F0' },
  Psychic: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/50', glow: 'shadow-pink-500/30', badge: 'bg-gradient-to-r from-pink-600 to-rose-500', hex: '#F85888' },
  Bug: { bg: 'bg-lime-500/20', text: 'text-lime-400', border: 'border-lime-500/50', glow: 'shadow-lime-500/30', badge: 'bg-gradient-to-r from-lime-600 to-emerald-600', hex: '#A8B820' },
  Rock: { bg: 'bg-stone-600/20', text: 'text-stone-300', border: 'border-stone-600/50', glow: 'shadow-stone-600/30', badge: 'bg-gradient-to-r from-stone-700 to-yellow-900', hex: '#B8A038' },
  Ghost: { bg: 'bg-purple-900/30', text: 'text-purple-300', border: 'border-purple-600/50', glow: 'shadow-purple-800/40', badge: 'bg-gradient-to-r from-purple-900 to-indigo-900', hex: '#705898' },
  Dragon: { bg: 'bg-indigo-600/20', text: 'text-indigo-300', border: 'border-indigo-600/50', glow: 'shadow-indigo-600/40', badge: 'bg-gradient-to-r from-indigo-800 to-blue-700', hex: '#7038F8' },
  Dark: { bg: 'bg-neutral-800/40', text: 'text-neutral-300', border: 'border-neutral-600/50', glow: 'shadow-neutral-900/40', badge: 'bg-gradient-to-r from-neutral-800 to-stone-900', hex: '#705848' },
  Steel: { bg: 'bg-slate-400/20', text: 'text-slate-300', border: 'border-slate-400/50', glow: 'shadow-slate-400/30', badge: 'bg-gradient-to-r from-slate-600 to-zinc-500', hex: '#B8B8D0' },
  Fairy: { bg: 'bg-pink-400/20', text: 'text-pink-300', border: 'border-pink-400/50', glow: 'shadow-pink-400/30', badge: 'bg-gradient-to-r from-pink-500 to-rose-400', hex: '#EE99AC' },
};
