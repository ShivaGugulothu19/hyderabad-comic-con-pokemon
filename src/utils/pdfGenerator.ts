import { jsPDF } from 'jspdf';
import { GeneratedPokemon, TrainerProfile, TYPE_COLORS } from '../data/pokemonData';
import { TRAINER_CHARACTERS } from '../data/trainerAssets';

// Helper to load image as HTMLImageElement with fallback handling
function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      // If primary failed, resolve null so fallback vector drawing can take over
      resolve(null);
    };
    img.src = src;
  });
}

export async function generateTrainerCardPdf(
  trainer: TrainerProfile,
  team: GeneratedPokemon[]
): Promise<boolean> {
  try {
    // Canvas dimensions (high resolution landscape card: 1600 x 1000)
    const width = 1600;
    const height = 1000;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    // Determine trainer asset
    let trainerAsset = TRAINER_CHARACTERS.Neutral;
    if (trainer.isEasterEggSteven) {
      trainerAsset = TRAINER_CHARACTERS.Steven;
    } else if (trainer.gender === 'Male') {
      trainerAsset = TRAINER_CHARACTERS.Red;
    } else if (trainer.gender === 'Female') {
      trainerAsset = trainer.femaleCharacter === 'Dawn' ? TRAINER_CHARACTERS.Dawn : TRAINER_CHARACTERS.Serena;
    }

    // Preload trainer and pokemon images
    const trainerImgPromise = loadImage(trainerAsset.imageUrl || trainerAsset.fallbackSvg);
    const pokemonImgPromises = team.map(p =>
      loadImage(p.sprite).then(async (img) => {
        if (!img) return await loadImage(p.fallbackSprite);
        return img;
      })
    );

    const [trainerImg, ...pokemonImgs] = await Promise.all([trainerImgPromise, ...pokemonImgPromises]);

    // 1. Background gradient (Midnight Blue to Deep Void)
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#060a17');
    bgGrad.addColorStop(0.5, '#0c142b');
    bgGrad.addColorStop(1, '#050811');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative background cyber-grid lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Outer cyber glowing border
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(26, 26, width - 52, height - 52);

    // 2. Header Bar: HYDERABAD COMIC CON & POKÉMON TRAINER PASSPORT
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(30, 30, width - 60, 110);

    // Header accent strip
    const accentGrad = ctx.createLinearGradient(30, 136, width - 30, 136);
    accentGrad.addColorStop(0, '#ef4444');
    accentGrad.addColorStop(0.5, '#f59e0b');
    accentGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = accentGrad;
    ctx.fillRect(30, 136, width - 60, 4);

    // Title text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Rajdhani", "Arial Black", sans-serif';
    ctx.fillText('HYDERABAD COMIC CON', 60, 80);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 20px "Arial", sans-serif';
    ctx.fillText('OFFICIAL FAN POKÉMON TRAINER PASSPORT', 60, 112);

    // Header Right: Trainer ID badge
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(width - 400, 50, 340, 65, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px "Arial", sans-serif';
    ctx.fillText('TRAINER ID CODE', width - 380, 75);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 26px "Courier New", monospace';
    ctx.fillText(trainer.trainerId, width - 380, 104);

    // 3. Left Column: Trainer Profile Card (x: 50, y: 170, w: 420, h: 770)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(50, 170, 420, 770, 16);
    ctx.fill();
    ctx.stroke();

    // Trainer avatar container
    const avatarX = 85;
    const avatarY = 205;
    const avatarSize = 350;

    ctx.fillStyle = '#0b1120';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(avatarX, avatarY, avatarSize, avatarSize, 12);
    ctx.fill();
    ctx.stroke();

    // Draw trainer image or fallback
    if (trainerImg) {
      ctx.drawImage(trainerImg, avatarX + 25, avatarY + 25, avatarSize - 50, avatarSize - 50);
    } else {
      // Fallback silhouette
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(avatarX + avatarSize / 2, avatarY + 120, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(avatarX + avatarSize / 2, avatarY + 240, 90, 60, 0, 0, Math.PI);
      ctx.fill();
    }

    // Trainer Info Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px "Arial", sans-serif';
    ctx.fillText('TRAINER NAME', 85, 600);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Rajdhani", "Arial", sans-serif';
    ctx.fillText(trainer.name.toUpperCase(), 85, 640);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px "Arial", sans-serif';
    ctx.fillText('COMIC CON SQUAD / TEAM', 85, 690);

    // Comic con team pill
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(85, 705, 350, 44, 8);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(trainer.comicConTeam, 85 + 175, 733);
    ctx.textAlign = 'left';

    // Character identity
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px "Arial", sans-serif';
    ctx.fillText('AVATAR CLASSIFICATION', 85, 780);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 20px "Rajdhani", sans-serif';
    ctx.fillText(trainerAsset.name + ` (${trainerAsset.title})`, 85, 810);

    // Comic Con Authenticity Stamp
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(85, 845, 350, 65, 8);
    ctx.stroke();

    ctx.fillStyle = '#f87171';
    ctx.font = 'bold 13px "Arial", sans-serif';
    ctx.fillText('OFFICIAL FAN EXPERIENCE • HITEX HYDERABAD', 105, 872);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px "Arial", sans-serif';
    ctx.fillText('GENERATED ON COMIC CON ARENA SYSTEM', 105, 892);

    // 4. Right Area: Six Pokémon Grid (2 rows x 3 columns)
    const gridStartX = 500;
    const gridStartY = 170;
    const cardW = 330;
    const cardH = 370;
    const gapX = 25;
    const gapY = 30;

    for (let i = 0; i < 6; i++) {
      const p = team[i];
      if (!p) continue;
      const col = i % 3;
      const row = Math.floor(i / 3);
      const cx = gridStartX + col * (cardW + gapX);
      const cy = gridStartY + row * (cardH + gapY);

      // Card Background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardW, cardH, 14);
      ctx.fill();
      ctx.stroke();

      // Top bar with level and pokedex number
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardW, 40, [14, 14, 0, 0]);
      ctx.fill();

      // Pokedex #
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 15px "Courier New", monospace';
      ctx.fillText(`#${p.id.toString().padStart(3, '0')}`, cx + 16, cy + 26);

      // Level Badge
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(cx + cardW - 85, cy + 8, 70, 24, 6);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 14px "Arial", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`LV. ${p.level}`, cx + cardW - 50, cy + 25);
      ctx.textAlign = 'left';

      // Pokemon artwork circle area
      ctx.fillStyle = '#090d19';
      ctx.beginPath();
      ctx.arc(cx + cardW / 2, cy + 145, 78, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Pokemon Sprite
      const pImg = pokemonImgs[i];
      if (pImg) {
        ctx.drawImage(pImg, cx + cardW / 2 - 70, cy + 145 - 70, 140, 140);
      } else {
        // Fallback text
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 18px "Arial", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, cx + cardW / 2, cy + 150);
        ctx.textAlign = 'left';
      }

      // Pokemon Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Rajdhani", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(p.name, cx + cardW / 2, cy + 260);

      // Gen label
      ctx.fillStyle = '#64748b';
      ctx.font = '12px "Arial", sans-serif';
      ctx.fillText(`GEN ${p.generation}${p.isLegendary ? ' • LEGENDARY' : ''}`, cx + cardW / 2, cy + 282);

      // Type badges
      const typesTotal = p.types.length;
      const badgeW = 90;
      const badgeH = 26;
      const totalTypeW = typesTotal * badgeW + (typesTotal - 1) * 10;
      let startTypeX = cx + (cardW - totalTypeW) / 2;

      for (const t of p.types) {
        const typeStyle = TYPE_COLORS[t] || { hex: '#64748b' };
        ctx.fillStyle = typeStyle.hex;
        ctx.beginPath();
        ctx.roundRect(startTypeX, cy + 305, badgeW, badgeH, 6);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px "Arial", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t.toUpperCase(), startTypeX + badgeW / 2, cy + 322);

        startTypeX += badgeW + 10;
      }
      ctx.textAlign = 'left';
    }

    // 5. Footer disclaimer & credit
    ctx.fillStyle = '#64748b';
    ctx.font = '12px "Arial", sans-serif';
    ctx.fillText('HYDERABAD COMIC CON • UNOFFICIAL FAN EXPERIENCE • CRAFTED WITH POKÉMON MAGIC BY STEVEN (SHIVA RAM)', 500, 960);

    // Convert Canvas to PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [width, height],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);

    // Clean safe filename
    const safeName = trainer.name.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || 'Trainer';
    pdf.save(`Hyderabad_ComicCon_Pokemon_TrainerCard_${safeName}.pdf`);

    return true;
  } catch (err) {
    console.error('Failed to generate PDF:', err);
    return false;
  }
}
