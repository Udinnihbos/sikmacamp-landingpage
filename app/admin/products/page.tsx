"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  created_at: string;
}

export default function AdminProductsPage() {
  const supabase = createClient();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    const [{ data: cats }, { data: prods }] = await Promise.all([
      supabase.from("categories").select("id, name").order("name"),
      supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);
    if (cats) setCategories(cats as Category[]);
    if (prods) setProducts(prods as Product[]);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    let imageUrl: string | null = null;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(path, imageFile);

      if (uploadError) {
        setSubmitting(false);
        setError(`Upload gambar gagal: ${uploadError.message}`);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(path);

      imageUrl = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("products").insert({
      name,
      description: description || null,
      price,
      category_id: categoryId || null,
      image_url: imageUrl,
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setName("");
    setDescription("");
    setPrice("");
    setCategoryId("");
    setImageFile(null);
    loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus produk ini?")) return;
    await supabase.from("products").delete().eq("id", id);
    loadData();
  }

  return (
    <section className="pt-8">
      <p className="font-mono text-xs uppercase tracking-widest text-brass">
        Admin
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
        Produk
      </h1>

      {categories.length === 0 && !loading && (
        <p className="mt-4 rounded-md border border-brass/30 bg-brass/5 px-4 py-3 text-sm text-brass">
          Belum ada kategori. Tambah kategori dulu di halaman Kategori
          sebelum nambah produk.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-md space-y-4 rounded-lg border border-line bg-surface p-5"
      >
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Nama produk
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-base px-3 py-2.5 text-sm text-ink outline-none focus:border-brass/50"
          />
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Harga
          </label>
          <input
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Contoh: Rp 50.000"
            className="mt-2 w-full rounded-md border border-line bg-base px-3 py-2.5 text-sm text-ink outline-none focus:border-brass/50"
          />
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Kategori
          </label>
          <select
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-2 w-full rounded-md border border-line bg-base px-3 py-2.5 text-sm text-ink outline-none focus:border-brass/50"
          >
            <option value="">Pilih kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Deskripsi
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-md border border-line bg-base px-3 py-2.5 text-sm text-ink outline-none focus:border-brass/50"
          />
        </div>

        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Gambar produk
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="mt-2 w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-brass file:px-3 file:py-1.5 file:font-mono file:text-xs file:uppercase file:tracking-widest file:text-base"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting || categories.length === 0}
          className="rounded-md bg-brass px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-base transition-colors hover:bg-brasshi disabled:opacity-50"
        >
          {submitting ? "Menyimpan..." : "Tambah Produk"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Semua produk
        </h2>

        {loading ? (
          <p className="mt-4 text-sm text-muted">Memuat...</p>
        ) : products.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Belum ada produk.</p>
        ) : (
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex gap-3 rounded-md border border-line bg-surface p-3"
              >
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-base">
                  {p.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="font-display text-sm font-semibold">
                    {p.name}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-brass">
                    {p.price}
                  </p>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="mt-auto self-start font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-red-400"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
