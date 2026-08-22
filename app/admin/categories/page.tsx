"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminCategoriesPage() {
  const supabase = createClient();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadCategories() {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setCategories(data as Category[]);
    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from("categories").insert({
      name,
      slug: slugify(name),
      description: description || null,
    });

    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    setName("");
    setDescription("");
    loadCategories();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus kategori ini? Produk di dalamnya jadi tanpa kategori.")) {
      return;
    }
    await supabase.from("categories").delete().eq("id", id);
    loadCategories();
  }

  return (
    <section className="pt-8">
      <p className="font-mono text-xs uppercase tracking-widest text-brass">
        Admin
      </p>
      <h1 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
        Kategori
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-md space-y-4 rounded-lg border border-line bg-surface p-5"
      >
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Nama kategori
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Merchandise"
            className="mt-2 w-full rounded-md border border-line bg-base px-3 py-2.5 text-sm text-ink outline-none focus:border-brass/50"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Deskripsi (opsional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="mt-2 w-full rounded-md border border-line bg-base px-3 py-2.5 text-sm text-ink outline-none focus:border-brass/50"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-brass px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-base transition-colors hover:bg-brasshi disabled:opacity-50"
        >
          {submitting ? "Menyimpan..." : "Tambah Kategori"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Semua kategori
        </h2>

        {loading ? (
          <p className="mt-4 text-sm text-muted">Memuat...</p>
        ) : categories.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Belum ada kategori.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center justify-between rounded-md border border-line bg-surface px-4 py-3"
              >
                <div>
                  <p className="font-display text-sm font-semibold">
                    {cat.name}
                  </p>
                  {cat.description && (
                    <p className="mt-1 text-xs text-muted">
                      {cat.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-red-400"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
