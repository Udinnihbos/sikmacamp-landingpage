# SikmaCamp — Website

Dibangun dengan Next.js 14 (App Router) + Tailwind CSS + Supabase (database, auth, storage gambar).

## Struktur halaman

- **`/`** — Home, landing page tentang SikmaCamp Community
- **`/server`** — Sikma Server: fitur RPG, IP, leaderboard
- **`/server/shop`** — Key, Mystery Box, Rank, Cosmetic (item yang berhubungan sama gameplay server, statis, diedit lewat kode)
- **`/store`** — Toko umum di luar Minecraft. Kategori & produknya **dinamis**, dikelola lewat halaman admin, disimpan di database Supabase
- **`/sign-in`, `/sign-up`** — login/daftar akun
- **`/admin`** — dashboard buat nambah kategori & produk di `/store` (perlu login)

---

## Setup Supabase (database)

Ini bagian yang perlu kamu beresin sendiri di luar kode ini. Supabase itu
Postgres database + Auth + penyimpanan file, gratis buat skala kecil.

**1. Buat project**

1. Buka [supabase.com](https://supabase.com) → Sign up / login → **New project**
2. Isi nama project, password database (simpan baik-baik), pilih region terdekat (Singapore paling deket ke Indonesia)
3. Tunggu ±2 menit sampai project selesai dibuat

**2. Jalankan schema database**

1. Di dashboard project, buka menu **SQL Editor** (sidebar kiri)
2. Klik **New query**
3. Copy semua isi file `supabase/schema.sql` dari project ini, paste, lalu klik **Run**
4. Ini bakal bikin tabel `categories` dan `products`, plus aturan keamanan (Row Level Security) — publik boleh baca, cuma yang login boleh nambah/hapus

**3. Buat storage bucket buat gambar produk**

1. Buka menu **Storage** (sidebar kiri) → **New bucket**
2. Nama bucket: `product-images`
3. Centang **Public bucket** (biar gambar bisa ditampilin di halaman store tanpa login)
4. Klik **Create bucket**

**4. Ambil API key**

1. Buka menu **Project Settings** (ikon gear) → **API**
2. Copy **Project URL** dan **anon public** key
3. Di project ini, copy file `.env.local.example` jadi `.env.local`, isi dua value itu:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=isi-anon-key-di-sini
```

**5. Matikan email confirmation (opsional, biar testing lebih cepat)**

Secara default, Supabase ngirim email konfirmasi tiap ada yang sign up
(termasuk kamu sendiri pas nyoba). Kalau mau langsung bisa login tanpa
klik link email dulu:

1. Buka **Authentication** → **Providers** → **Email**
2. Matiin toggle **Confirm email**

Bisa dinyalain lagi kapan aja kalau nanti mau lebih aman.

**6. Daftar akun admin**

Buka `/sign-up` di website kamu (lokal atau yang udah di-deploy), daftar
pakai email kamu sendiri. Setelah itu langsung bisa masuk ke `/admin`.

> **Catatan soal siapa yang jadi "admin":** setup sekarang paling simpel —
> SIAPA PUN yang berhasil login dianggap admin dan boleh nambah/hapus
> produk. Ini oke buat sekarang karena cuma kamu yang bakal daftar. Kalau
> nanti mau buka pendaftaran ke customer biasa juga, kasih tau aku, nanti
> dibikinin sistem role (misal kolom `is_admin` di tabel terpisah) biar
> cuma akun kamu yang bisa akses `/admin`.

---

## Deploy ke Vercel

Environment variable di atas (`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`) juga harus diisi di Vercel, bukan cuma
di `.env.local` lokal kamu:

1. Buka project di Vercel → **Settings** → **Environment Variables**
2. Tambahin dua variable yang sama, valuenya sama kayak di `.env.local`
3. Redeploy (atau `git push` sekali lagi) biar variable-nya kepakai

Tanpa langkah ini, situs yang udah di-deploy gak bisa konek ke database
(halaman `/store` bakal kosong, sign in/up gagal).

## Sebelum deploy

Ganti nilai ini di `lib/site-config.ts` (dipakai di semua halaman):

```ts
export const SITE = {
  serverIp: "play.sikmacamp.net",       // ganti ke IP server asli
  discordUrl: "https://discord.gg/...",  // ganti ke invite link Discord
  communityUrl: "https://....lovable.app", // ganti ke URL SikmaCamp Community
};
```

## Nambah produk di /store (dinamis)

Gak perlu edit kode. Login ke `/admin`, tambah kategori dulu di
**Kategori**, baru tambah produk di **Produk** (nama, harga, deskripsi,
kategori, gambar). Langsung muncul di `/store`, gak perlu `git push`.

Belum ada payment gateway — kalau nanti mau transaksi otomatis, itu perlu
integrasi payment provider terpisah (misal Midtrans/Xendit).

## Nambah produk di /server/shop (statis)

Ini beda dari Store — item di sini masih diedit lewat kode karena
sifatnya tetap (key, rank, dll). Edit `data/server-shop.ts`, tiap produk
satu object di array `PRODUCTS`. Ada komentar di paling atas file yang
jelasin field-fieldnya. Save, `git push`, Vercel auto-deploy.

## Ganti data Leaderboard

Edit `data/leaderboard.ts` — array `PLAYERS`. Ini masih data manual;
kalau nanti mau ambil dari data server asli, tinggal ganti isi array itu
jadi hasil `fetch()` di `app/server/page.tsx`.

## Coba di lokal

Butuh Node.js 18+ dan `.env.local` yang udah diisi (lihat bagian Setup
Supabase di atas).

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Deploy ke GitHub + Vercel

**1. Push ke GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
```

Buat repo baru di [github.com/new](https://github.com/new) (jangan
centang "Add README"), lalu:

```bash
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git branch -M main
git push -u origin main
```

**2. Connect ke Vercel**

1. Buka [vercel.com/new](https://vercel.com/new)
2. Login pakai akun GitHub kamu
3. Pilih repo yang barusan di-push
4. **Sebelum klik Deploy**, buka **Environment Variables**, isi
   `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Klik **Deploy**, tunggu ~1 menit

Setiap `git push` ke branch `main` bikin Vercel auto redeploy.

## Struktur proyek

```
app/
  layout.tsx               # font & metadata
  page.tsx                 # Home
  server/page.tsx            # Sikma Server (fitur RPG, IP, leaderboard)
  server/shop/page.tsx        # Sikma Server Shop (key, rank, dll — statis)
  store/page.tsx              # Store umum (dinamis, dari Supabase)
  sign-in/page.tsx
  sign-up/page.tsx
  auth/callback/route.ts     # handle link konfirmasi email
  admin/layout.tsx            # proteksi: redirect ke /sign-in kalau belum login
  admin/page.tsx               # dashboard admin
  admin/categories/page.tsx     # tambah/hapus kategori store
  admin/products/page.tsx        # tambah/hapus produk store (+ upload gambar)
  globals.css
components/
  NavBar.tsx                 # navigasi + hamburger mobile + status login
  Footer.tsx
  SignOutButton.tsx
  CopyIp.tsx                 # halaman Server
  RarityCard.tsx              # halaman Server
  ServerShopProductCard.tsx    # halaman Server Shop
  StoreProductCard.tsx          # halaman Store (generic, ada gambar)
data/
  server-shop.ts             # <- edit buat nambah produk Server Shop
  leaderboard.ts               # <- edit buat ubah data leaderboard
lib/
  site-config.ts              # IP server, link Discord & Community
  rarity.ts                    # mapping warna badge rarity
  supabase/client.ts            # Supabase client (Client Component)
  supabase/server.ts             # Supabase client (Server Component)
supabase/
  schema.sql                  # jalankan ini di SQL Editor Supabase
middleware.ts                  # refresh session login otomatis
```

## Nambah halaman baru

Bikin folder baru di dalam `app/`, isi file `page.tsx`. Next.js otomatis
bikin route dari struktur foldernya — gak perlu setting routing manual.
