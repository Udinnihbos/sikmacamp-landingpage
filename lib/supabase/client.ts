import { createBrowserClient } from "@supabase/ssr";

/**
 * Dipakai di komponen dengan "use client" (form sign in/up, form tambah
 * produk, dsb). Kredensialnya diambil dari environment variable yang
 * NEXT_PUBLIC_ jadi aman untuk dipakai di browser (anon key memang publik,
 * keamanan datanya diatur lewat Row Level Security di Supabase).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
