import { redirect } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Halaman admin cuma bisa diakses kalau udah login. Setup sekarang:
  // SIAPA PUN yang berhasil sign in dianggap admin (lihat catatan di README
  // soal cara membatasi ke akun tertentu aja).
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-grain">
      <NavBar />

      <div className="mx-auto max-w-6xl px-6 pb-6 sm:px-10">
        <nav className="flex gap-6 border-b border-line pb-4 font-mono text-xs uppercase tracking-widest text-muted">
          <Link href="/admin" className="transition-colors hover:text-ink">
            Dashboard
          </Link>
          <Link
            href="/admin/categories"
            className="transition-colors hover:text-ink"
          >
            Kategori
          </Link>
          <Link
            href="/admin/products"
            className="transition-colors hover:text-ink"
          >
            Produk
          </Link>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">{children}</div>

      <Footer />
    </main>
  );
}
