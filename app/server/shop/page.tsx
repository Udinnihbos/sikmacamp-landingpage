import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ServerShopProductCard from "@/components/ServerShopProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/server-shop";

export const metadata = {
  title: "Sikma Server Shop — SikmaCamp",
  description: "Key, mystery box, rank, dan cosmetic server SikmaCamp.",
};

export default function ServerShopPage() {
  return (
    <main className="relative overflow-hidden bg-grain">
      <NavBar />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-10 sm:px-10 sm:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Sikma Server Shop
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
          Key, mystery box, sampai rank.
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          Semua harga & odds ditampilin transparan. Transaksi masih manual
          lewat Discord sampai payment gateway kelar disambungin.
        </p>
      </section>

      {CATEGORIES.map((category) => {
        const items = PRODUCTS.filter((p) => p.category === category.id);
        if (items.length === 0) return null;

        return (
          <section
            key={category.id}
            className="mx-auto max-w-6xl px-6 py-10 sm:px-10"
          >
            <div className="mb-6 flex items-baseline justify-between border-b border-line pb-4">
              <h2 className="font-display text-xl font-semibold sm:text-2xl">
                {category.label}
              </h2>
              <span className="font-mono text-xs text-muted">
                {category.description}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((product) => (
                <ServerShopProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      <Footer />
    </main>
  );
}
