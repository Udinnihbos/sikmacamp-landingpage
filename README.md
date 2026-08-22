# SikmaCamp — Landing Page

Landing page server Minecraft survival RPG SikmaCamp. Dibangun dengan Next.js 14 (App Router) + Tailwind CSS.

## Sebelum deploy

Ganti nilai ini di `lib/site-config.ts` (dipakai di semua halaman):

```ts
export const SITE = {
  serverIp: "play.sikmacamp.net",       // ganti ke IP server asli
  discordUrl: "https://discord.gg/...",  // ganti ke invite link Discord
  communityUrl: "https://....lovable.app", // ganti ke URL SikmaCamp Community
};
```

## Nambah produk di Store

Edit `data/products.ts`. Tiap produk itu satu object di array `PRODUCTS`,
tinggal copy-paste blok yang ada, ganti isinya, save, lalu push. Ada
komentar di paling atas file yang jelasin field-fieldnya. Kalau mau nambah
kategori baru (selain Key / Mystery Box / Rank / Cosmetic), tambahin juga
di array `CATEGORIES`.

Belum ada payment gateway — tombol "Beli" masih ngarah ke Discord. Kalau
nanti mau transaksi otomatis, itu perlu backend + payment provider (misal
Midtrans/Xendit) yang terpisah dari project static ini.

## Ganti data Leaderboard

Edit `data/leaderboard.ts` — array `PLAYERS`. Ini masih data manual;
kalau nanti mau ambil dari data server asli, tinggal ganti isi array itu
jadi hasil `fetch()` di `app/leaderboard/page.tsx` (strukturnya udah
disiapin biar gampang disambungin).

## Coba di lokal (opsional)

Butuh Node.js 18+ sudah terinstall.

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
git commit -m "Initial commit: SikmaCamp landing page"
```

Buat repo baru di [github.com/new](https://github.com/new) (jangan centang "Add README", biar gak konflik), lalu:

```bash
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git branch -M main
git push -u origin main
```

**2. Connect ke Vercel**

1. Buka [vercel.com/new](https://vercel.com/new)
2. Login pakai akun GitHub kamu
3. Pilih repo yang barusan di-push
4. Framework preset otomatis kedeteksi **Next.js** — biarin default, langsung klik **Deploy**
5. Tunggu ~1 menit, nanti dapet URL seperti `nama-repo.vercel.app`

**3. Custom domain (opsional)**

Kalau punya domain sendiri: buka project di Vercel → tab **Settings** → **Domains** → masukin domain kamu → ikuti instruksi DNS (biasanya tinggal tambah record `A`/`CNAME` di domain provider).

Setiap kali kamu `git push` ke branch `main`, Vercel otomatis build & deploy ulang.

## Struktur proyek

```
app/
  layout.tsx           # font & metadata
  page.tsx             # halaman utama (Home)
  store/page.tsx        # halaman Store
  leaderboard/page.tsx   # halaman Leaderboard
  globals.css
components/
  NavBar.tsx           # navigasi, dipakai semua halaman
  Footer.tsx           # footer, dipakai semua halaman
  CopyIp.tsx           # tombol salin IP server
  RarityCard.tsx       # kartu fitur gaya tooltip item (halaman Home)
  ProductCard.tsx      # kartu produk (halaman Store)
data/
  products.ts          # <- edit di sini buat nambah/ubah produk store
  leaderboard.ts        # <- edit di sini buat ubah data leaderboard
lib/
  site-config.ts        # IP server, link Discord & Community
  rarity.ts             # mapping warna badge rarity (dipakai di semua kartu)
```

## Nambah halaman baru

Cara paling gampang: bikin folder baru di dalam `app/`, isi dengan file
`page.tsx`. Contoh, biar ada halaman `/rules`:

```
app/rules/page.tsx
```

Next.js otomatis bikin route `sikmacamp.com/rules` dari struktur folder
itu — gak perlu setting routing manual.
