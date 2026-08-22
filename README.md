# SikmaCamp — Landing Page

Landing page server Minecraft survival RPG SikmaCamp. Dibangun dengan Next.js 14 (App Router) + Tailwind CSS.

## Sebelum deploy

Ganti dulu 3 nilai ini di `app/page.tsx` (baris paling atas):

```ts
const SERVER_IP = "play.sikmacamp.net";       // ganti ke IP server asli
const DISCORD_URL = "https://discord.gg/...";  // ganti ke invite link Discord
const COMMUNITY_URL = "https://....lovable.app"; // ganti ke URL SikmaCamp Community
```

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
  layout.tsx      # font & metadata
  page.tsx        # isi landing page (ganti copy di sini)
  globals.css
components/
  CopyIp.tsx      # tombol salin IP server
  RarityCard.tsx  # kartu fitur gaya tooltip item
```
