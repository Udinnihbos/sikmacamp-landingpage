import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { PLAYERS } from "@/data/leaderboard";
import { RARITY_TEXT, RARITY_DOT } from "@/lib/rarity";

export const metadata = {
  title: "Leaderboard — SikmaCamp",
  description: "Ranking player dengan power score tertinggi di SikmaCamp.",
};

export default function LeaderboardPage() {
  return (
    <main className="relative overflow-hidden bg-grain">
      <NavBar />

      <section className="mx-auto max-w-4xl px-6 pb-10 pt-10 sm:px-10 sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Leaderboard
        </p>
        <h1 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
          Siapa yang paling niat.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          Diurutin berdasarkan power score. Data di bawah masih placeholder —
          nanti disambungin ke data server asli.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 sm:px-10">
        <div className="overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line bg-surface font-mono text-[11px] uppercase tracking-widest text-muted">
                <th className="px-5 py-3 font-medium">Rank</th>
                <th className="px-5 py-3 font-medium">Player</th>
                <th className="px-5 py-3 font-medium text-right">
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
