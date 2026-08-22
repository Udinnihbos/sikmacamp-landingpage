import { Rarity } from "@/lib/rarity";

/**
 * CARA NAMBAH PRODUK BARU
 * -----------------------
 * 1. Copy salah satu blok object di bawah (di dalam array PRODUCTS)
 * 2. Ganti id (harus unik), name, price, description, perks
 * 3. rarity cuma menentukan warna badge: "common" | "uncommon" | "rare" | "epic" | "legendary"
 * 4. category harus salah satu id yang ada di CATEGORIES di bawah
 *    (atau tambah kategori baru sendiri di array CATEGORIES)
 * 5. Save, git add . && git commit -m "..." && git push — Vercel auto redeploy
 *
 * Belum ada sistem pembayaran otomatis di sini (masih showcase/statis).
 * Tombol "Beli" akan ngarah ke Discord dulu sampai payment gateway disambungin.
 */

export type CategoryId = "key" | "mystery-box" | "rank" | "cosmetic";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export interface Product {
  id: string;
  category: CategoryId;
  name: string;
  rarity: Rarity;
  price: string;
  description: string;
  perks: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "key",
    label: "Key",
    description: "Kunci buat buka crate di server.",
  },
  {
    id: "mystery-box",
    label: "Mystery Box",
    description: "Odds jelas, gak ada yang disembunyiin.",
  },
  {
    id: "rank",
    label: "Rank / Donator",
    description: "Perk permanen buat akun kamu.",
  },
  {
    id: "cosmetic",
    label: "Cosmetic",
    description: "Gaya doang, gak ngaruh ke gameplay.",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "key-common",
    category: "key",
    name: "Common Key",
    rarity: "common",
    price: "Rp 5.000",
    description: "Buka Common Crate. Cocok buat pemula ngumpulin modal awal.",
    perks: ["Isi item level awal", "Bisa numpuk di inventory"],
  },
  {
    id: "key-rare",
    category: "key",
    name: "Rare Key",
    rarity: "rare",
    price: "Rp 15.000",
    description: "Buka Rare Crate dengan chance item enchant lebih tinggi.",
    perks: ["Chance item enchant naik", "Termasuk material custom"],
  },
  {
    id: "key-epic",
    category: "key",
    name: "Epic Key",
    rarity: "epic",
    price: "Rp 35.000",
    description: "Buka Epic Crate, isinya item MMOItems tier menengah ke atas.",
    perks: ["Guaranteed 1 item custom", "Chance skill token"],
  },
  {
    id: "key-legendary",
    category: "key",
    name: "Legendary Key",
    rarity: "legendary",
    price: "Rp 75.000",
    description: "Buka Legendary Crate. Tier tertinggi di key shop.",
    perks: ["Guaranteed item legendary", "Chance cosmetic eksklusif"],
  },
  {
    id: "mystery-starter",
    category: "mystery-box",
    name: "Starter Mystery Box",
    rarity: "uncommon",
    price: "Rp 10.000",
    description: "Isi campuran item common-rare, odds ditampilin transparan.",
    perks: ["70% common", "25% rare", "5% epic"],
  },
  {
    id: "mystery-premium",
    category: "mystery-box",
    name: "Premium Mystery Box",
    rarity: "epic",
    price: "Rp 50.000",
    description: "Odds condong ke item high-tier, minim isi common.",
    perks: ["10% rare", "60% epic", "30% legendary"],
  },
  {
    id: "rank-vip",
    category: "rank",
    name: "Rank VIP",
    rarity: "rare",
    price: "Rp 25.000 / bulan",
    description: "Akses fitur extra: /kit vip, home slot tambahan, prefix chat.",
    perks: ["+3 home slot", "Kit harian", "Prefix chat khusus"],
  },
  {
    id: "rank-legend",
    category: "rank",
    name: "Rank Legend",
    rarity: "legendary",
    price: "Rp 60.000 / bulan",
    description: "Rank tertinggi dengan akses penuh fitur donator.",
    perks: ["Semua benefit VIP", "Fly di area tertentu", "Slot party tambahan"],
  },
  {
    id: "cosmetic-title",
    category: "cosmetic",
    name: "Custom Title",
    rarity: "uncommon",
    price: "Rp 8.000",
    description: "Title custom di atas nama kamu, tampil ke semua player.",
    perks: ["Warna bebas (sesuai format)", "Ganti sewaktu-waktu"],
  },
];
