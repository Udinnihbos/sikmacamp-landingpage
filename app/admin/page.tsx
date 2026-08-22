import Link from "next/link";

export default function AdminDashboard() {
  return (
    <section className="pt-8">
      <p className="font-mono text-xs uppercase tracking-widest text-brass">
        Admin
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
        Kelola Store
      </h1>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
        Tambah kategori dulu sebelum nambah produk, biar produknya bisa
        dikelompokkin.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/admin/categories"
          className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-brass/40"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Kategori
          </p>
          <p className="mt-2 font-display text-lg font-semibold">
            Tambah / lihat kategori
          </p>
        </Link>
        <Link
          href="/admin/products"
          className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-brass/40"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Produk
          </p>
          <p className="mt-2 font-display text-lg font-semibold">
            Tambah / lihat produk
          </p>
        </Link>
      </div>
    </section>
  );
}
