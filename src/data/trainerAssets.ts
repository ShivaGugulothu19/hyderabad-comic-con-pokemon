// Trainer artwork assets with primary image URLs and guaranteed SVG fallbacks

export interface TrainerAsset {
  name: string;
  title: string;
  imageUrl: string;
  fallbackSvg: string;
}

// Neutral Silhouette SVG
const NEUTRAL_SILHOUETTE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="20" fill="%230f172a"/><circle cx="100" cy="75" r="35" fill="%2338bdf8" opacity="0.3"/><circle cx="100" cy="70" r="30" fill="%2394a3b8"/><path d="M40 180 C40 135 70 120 100 120 C130 120 160 135 160 180 Z" fill="%2364748b"/><circle cx="100" cy="120" r="12" fill="%23ef4444" stroke="%23ffffff" stroke-width="2"/><circle cx="100" cy="120" r="4" fill="%23ffffff"/></svg>`;

// Red SVG representation
const RED_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="20" fill="%231e1b4b"/><path d="M50 75 Q100 35 150 75 L165 95 L35 95 Z" fill="%23dc2626"/><ellipse cx="100" cy="95" rx="65" ry="15" fill="%23ffffff"/><circle cx="100" cy="80" r="10" fill="%23ffffff"/><circle cx="100" cy="115" r="32" fill="%23fcd34d"/><ellipse cx="88" cy="115" rx="4" ry="7" fill="%231e293b"/><ellipse cx="112" cy="115" rx="4" ry="7" fill="%231e293b"/><path d="M92 135 Q100 142 108 135" stroke="%231e293b" stroke-width="3" stroke-linecap="round"/><path d="M45 190 C45 145 70 135 100 135 C130 135 155 145 155 190 Z" fill="%23dc2626"/><rect x="85" y="140" width="30" height="60" fill="%23000000" opacity="0.25"/></svg>`;

// Dawn SVG representation
const DAWN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="20" fill="%231e1b4b"/><circle cx="100" cy="100" r="45" fill="%231e3a8a"/><circle cx="100" cy="105" r="30" fill="%23fed7aa"/><path d="M60 70 Q100 40 140 70 L145 90 L55 90 Z" fill="%23ffffff"/><circle cx="100" cy="75" r="10" fill="%23f43f5e"/><ellipse cx="88" cy="105" rx="4" ry="6" fill="%230284c7"/><ellipse cx="112" cy="105" rx="4" ry="6" fill="%230284c7"/><path d="M50 190 C50 150 70 140 100 140 C130 140 150 150 150 190 Z" fill="%23000000"/><circle cx="100" cy="145" r="12" fill="%23f43f5e"/></svg>`;

// Serena SVG representation
const SERENA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="20" fill="%231e1b4b"/><circle cx="100" cy="100" r="45" fill="%23b45309"/><circle cx="100" cy="105" r="30" fill="%23fed7aa"/><path d="M55 70 Q100 40 145 70 L155 90 L45 90 Z" fill="%23e11d48"/><rect x="55" y="85" width="90" height="10" fill="%231e293b"/><ellipse cx="88" cy="105" rx="4" ry="6" fill="%23059669"/><ellipse cx="112" cy="105" rx="4" ry="6" fill="%23059669"/><path d="M50 190 C50 150 70 140 100 140 C130 140 150 150 150 190 Z" fill="%23be123c"/><circle cx="100" cy="148" r="8" fill="%2338bdf8"/></svg>`;

// Steven / Shiva Ram SVG representation
const STEVEN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" rx="20" fill="%230f172a"/><circle cx="100" cy="70" r="32" fill="%2394a3b8"/><path d="M60 45 L100 25 L140 45 L130 70 L70 70 Z" fill="%23e2e8f0"/><ellipse cx="88" cy="75" rx="4" ry="5" fill="%2338bdf8"/><ellipse cx="112" cy="75" rx="4" ry="5" fill="%2338bdf8"/><path d="M40 190 C40 140 65 125 100 125 C135 125 160 140 160 190 Z" fill="%231e293b"/><path d="M85 125 L100 150 L115 125 Z" fill="%23dc2626"/><circle cx="100" cy="165" r="10" fill="%2338bdf8" stroke="%23ffffff" stroke-width="2"/></svg>`;

export const TRAINER_CHARACTERS: Record<string, TrainerAsset> = {
  Red: {
    name: "Red",
    title: "Legendary Trainer",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/red.png",
    fallbackSvg: RED_SVG
  },
  Dawn: {
    name: "Dawn",
    title: "Sinnoh Champion",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/dawn.png",
    fallbackSvg: DAWN_SVG
  },
  Serena: {
    name: "Serena",
    title: "Kalos Champion",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/serena.png",
    fallbackSvg: SERENA_SVG
  },
  Neutral: {
    name: "Ace Trainer",
    title: "Mystery Challenger",
    imageUrl: "",
    fallbackSvg: NEUTRAL_SILHOUETTE_SVG
  },
  Steven: {
    name: "Shiva Ram (Steven)",
    title: "Volunteer • Cosplay Registrations",
    imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/steven.png",
    fallbackSvg: STEVEN_SVG
  }
};
