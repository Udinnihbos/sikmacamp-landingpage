import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CopyIp from "@/components/CopyIp";
import RarityCard from "@/components/RarityCard";
import { SITE } from "@/lib/site-config";
import { PLAYERS } from "@/data/leaderboard";
import { RARITY_TEXT, RARITY_DOT } from "@/lib/rarity";

export const metadata = {
  title: "Sikma Server — SikmaCamp",
  description:
    "Server survival RPG SikmaCamp: custom mob, item, skill system, dan leaderboard player.",
};

export default function ServerPage() {
  return (
    <main className="relative overflow-hidden bg-grain">
      <NavBar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 sm:px-10 sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Sikma Server
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          Bukan survival biasa.
          <br />
          <span className="text-muted">Ini dunia yang niat dibangun.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Mob custom yang beneran ngelawan, item dengan stat asli, dan skill
          system yang bikin build-mu jadi identitas.
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
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Loot Table
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            Apa yang bikin beda
          </h2>
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

      {/* Server Shop teaser */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="rounded-xl border border-line bg-surface p-8 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-widest text-brass">
            Sikma Server Shop
          </p>
          <h2 className="mt-3 max-w-lg font-display text-2xl font-semibold sm:text-3xl">
            Key, mystery box, rank — top-up jelas.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            Semua item yang berhubungan sama gameplay server, harga & odds
            ditampilin transparan.
          </p>
          <Link
            href="/server/shop"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brass transition-colors hover:text-brasshi"
          >
            Lihat semua produk →
          </Link>
        </div>
      </section>

      {/* Leaderboard */}
      <section id="leaderboard" className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Ranking
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
              Leaderboard
            </h2>
          </div>
          <span className="font-mono text-xs text-muted">
            Data contoh — belum disambungin ke server asli
          </span>
        </div>

        <div className="overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
                <th className="px-5 py-3 font-medium">Rank</th>
                <th className="px-5 py-3 font-medium">Player</th>
                <th className="px-5 py-3 text-right font-medium">
                  Power Score
                </th>
              </tr>
            </thead>
            <tbody>
              {PLAYERS.map((player) => (
                <tr
                  key={player.rank}
                  className="border-b border-line last:border-none odd:bg-surface even:bg-surfacehi"
                >
                  <td className="px-5 py-4 font-mono text-sm text-muted">
                    #{player.rank}
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${RARITY_DOT[player.tier]}`}
                      />
                      {player.name}
                    </span>
                  </td>
                  <td
                    className={`px-5 py-4 text-right font-mono text-sm ${RARITY_TEXT[player.tier]}`}
                  >
                    {player.powerScore.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </main>
  );
}
