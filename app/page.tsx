import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CopyIp from "@/components/CopyIp";
import RarityCard from "@/components/RarityCard";
import { SITE } from "@/lib/site-config";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-grain">
      <NavBar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 sm:px-10 sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Server Survival RPG
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          Bukan survival biasa.
          <br />
          <span className="text-muted">Ini dunia yang niat dibangun.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Mob custom yang beneran ngelawan, item dengan stat asli, dan skill
          system yang bikin build-mu jadi identitas. SikmaCamp dibangun buat
          yang bosan sama survival vanilla.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CopyIp ip={SITE.serverIp} />
          <a
            href={SITE.discordUrl}
            className="flex items-center justify-center rounded-lg bg-brass px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-base transition-colors hover:bg-brasshi sm:w-auto"
          >
            Gabung Discord
          </a>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Loot Table
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              Apa yang bikin beda
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RarityCard
            rarity="uncommon"
            tag="Mob System"
            title="Musuh yang beneran niat"
            description="Bukan zombie template. Setiap mob custom punya skill, phase, dan pola serang sendiri lewat MythicMobs."
            stats={["Skill unik per mob", "Boss dengan phase bertingkat", "Drop table sesuai tingkat kesulitan"]}
          />
          <RarityCard
            rarity="rare"
            tag="Skill System"
            title="Build sesuka hati"
            description="Pilih jalur combat sendiri. Skill dan stat item saling ngaruh, jadi build-mu punya identitas."
            stats={["Progression skill custom", "Sinergi antar item & skill", "Gak ada 'satu build wajib'"]}
          />
          <RarityCard
            rarity="epic"
            tag="Item System"
            title="Item bukan cuma skin"
            description="Setiap item custom punya stat asli lewat MMOItems: damage, efek, sampai kondisi trigger khusus."
            stats={["Stat & efek custom", "Tier rarity jelas", "Desain visual lewat ModelEngine"]}
          />
          <RarityCard
            rarity="legendary"
            tag="Key Shop"
            title="Buka peti, dapet cuan"
            description="Sistem key shop terintegrasi economy server. Transparan, tervalidasi, tanpa drama saldo."
            stats={["Validasi saldo sebelum key keluar", "Terintegrasi Vault economy", "Mystery box dengan odds jelas"]}
          />
        </div>
      </section>

      {/* Key Shop teaser */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="rounded-xl border border-line bg-surface p-8 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-widest text-brass">
            Key Shop
          </p>
          <h2 className="mt-3 max-w-lg font-display text-2xl font-semibold sm:text-3xl">
            Top-up jelas, key langsung masuk.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            Setiap transaksi divalidasi otomatis sebelum key dikirim ke akun
            kamu. Gak ada key nyangkut, gak ada saldo misterius.
          </p>
          <Link
            href="/store"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brass transition-colors hover:text-brasshi"
          >
            Lihat semua produk →
          </Link>
        </div>
      </section>

      {/* Komunitas */}
      <section id="komunitas" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Komunitas
        </p>
        <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold sm:text-3xl">
          Ngobrol, cari party, atau sekadar pamer build.
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={SITE.discordUrl}
            className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-brass/40"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Discord
            </p>
            <p className="mt-2 font-display text-lg font-semibold">
              Diskusi cepat & update server
            </p>
          </a>
          <a
            href={SITE.communityUrl}
            className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-brass/40"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              SikmaCamp Community
            </p>
            <p className="mt-2 font-display text-lg font-semibold">
              Chat platform khusus player
            </p>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
