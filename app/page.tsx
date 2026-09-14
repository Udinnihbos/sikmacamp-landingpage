import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site-config";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-grain">
      <NavBar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 sm:px-10 sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          SikmaCampT Community
        </p>
        <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          Satu komunitas.
          <br />
          <span className="text-muted">Banyak alasan buat balik lagi.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          SikmaCampT dibangun buat yang main serius dan temenan beneran —
          bukan sekadar numpang lewat. Ada server survival RPG-nya, ada
          tempat ngobrolnya, ada tokonya. Semua di satu rumah yang sama.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={SITE.discordUrl}
            className="flex items-center justify-center rounded-lg bg-brass px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-base transition-colors hover:bg-brasshi"
          >
            Gabung Discord
          </a>
          <Link
            href="/server"
            className="flex items-center justify-center rounded-lg border border-line px-6 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-colors hover:border-brass/40"
          >
            Kenalan sama Server
          </Link>
        </div>
      </section>

      {/* Nav cards: Server & Store */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/server"
            className="group rounded-xl border border-line bg-surface p-8 transition-colors hover:border-brass/40"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brass">
              Sikma Server
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
              Survival RPG dengan mob, item, dan skill custom
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              IP server, fitur-fitur RPG, leaderboard, sampai key shop ada
              di sini.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brass transition-transform group-hover:translate-x-1">
              Lihat server →
            </span>
          </Link>

          <Link
            href="/store"
            className="group rounded-xl border border-line bg-surface p-8 transition-colors hover:border-brass/40"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-brass">
              Sikma Store
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
              Toko produk di luar server
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Produk apa aja yang aku jual, di luar konteks Minecraft.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brass transition-transform group-hover:translate-x-1">
              Lihat store →
            </span>
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
