import { Rarity } from "@/lib/rarity";

/**
 * DATA CONTOH (PLACEHOLDER)
 * -------------------------
 * List di bawah masih data manual. Kalau nanti mau nyambungin ke data asli
 * (misal dari plugin/Pterodactyl API yang nyimpen skor player), tinggal
 * ganti PLAYERS ini jadi hasil fetch di app/leaderboard/page.tsx — struktur
 * Player-nya tetap sama jadi komponen di bawah gak perlu diubah.
 *
 * tier menentukan warna badge di tabel:
 * "common" | "uncommon" | "rare" | "epic" | "legendary"
 */

export interface Player {
  rank: number;
  name: string;
  powerScore: number;
  tier: Rarity;
}

export const PLAYERS: Player[] = [
  { rank: 1, name: "Kaelvyn", powerScore: 98420, tier: "legendary" },
  { rank: 2, name: "ArcaneNoct", powerScore: 91230, tier: "legendary" },
  { rank: 3, name: "ShadowRhea", powerScore: 87650, tier: "legendary" },
  { rank: 4, name: "Vaelith", powerScore: 76210, tier: "epic" },
  { rank: 5, name: "Dhesta_", powerScore: 71800, tier: "epic" },
  { rank: 6, name: "MoonTitan", powerScore: 68990, tier: "epic" },
  { rank: 7, name: "Nyxara", powerScore: 60120, tier: "epic" },
  { rank: 8, name: "Bram_Wrath", powerScore: 52340, tier: "rare" },
  { rank: 9, name: "Selenya", powerScore: 47600, tier: "rare" },
  { rank: 10, name: "Torvyn", powerScore: 41250, tier: "rare" },
];
