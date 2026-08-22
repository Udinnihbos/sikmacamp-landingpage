import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import StoreProductCard from "@/components/StoreProductCard";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Store — SikmaCamp",
  description: "Produk-produk yang dijual di luar server Minecraft.",
};

// Halaman ini di-render server-side tiap request biar produk baru dari
// admin langsung muncul tanpa perlu build ulang / redeploy.
export const dynamic = "force-dynamic";

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface Product {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
}

export default async function StorePage() {
  const supabase = createClient();

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, description")
      .order("created_at", { ascending: false }),
    supabase
      .from("products")
      .select("id, category_id, name, description, price, image_url")
      .order("created_at", { ascending: false }),
  ]);

  const safeCategories = (categories ?? []) as Category[];
  const safeProducts = (products ?? []) as Product[];
  const uncategorized = safeProducts.filter((p) => !p.category_id);

  return (
    <main className="relative overflow-hidden bg-grain">
      <NavBar />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-10 sm:px-10 sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Store
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
          Produk di luar server.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          Ini toko pribadi, di luar konteks Minecraft. Buat item server
          (key, rank, dll), mampir ke{" "}
          <a href="/server/shop" className="text-brass hover:text-brasshi">
            Sikma Server Shop
          </a>
          .
        </p>
      </section>

      {safeCategories.length === 0 && safeProducts.length === 0 ? (
        <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-10">
          <p className="rounded-lg border border-line bg-surface p-8 text-sm text-muted">
            Belum ada produk yang ditambahin.
          </p>
        </section>
      ) : (
        <>
          {safeCategories.map((category) => {
            const items = safeProducts.filter(
              (p) => p.category_id === category.id
            );
            if (items.length === 0) return null;

            return (
              <section
                key={category.id}
                className="mx-auto max-w-6xl px-6 py-10 sm:px-10"
              >
                <div className="mb-6 flex items-baseline justify-between border-b border-line pb-4">
                  <h2 className="font-display text-xl font-semibold sm:text-2xl">
                    {category.name}
                  </h2>
                  {category.description && (
                    <span className="font-mono text-xs text-muted">
                      {category.description}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {items.map((product) => (
                    <StoreProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}

          {uncategorized.length > 0 && (
            <section className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
              <div className="mb-6 border-b border-line pb-4">
                <h2 className="font-display text-xl font-semibold sm:text-2xl">
                  Lainnya
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {uncategorized.map((product) => (
                  <StoreProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
    </main>
  );
}
