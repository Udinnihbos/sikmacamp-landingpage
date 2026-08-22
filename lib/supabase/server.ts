import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Dipakai di Server Component (misal app/store/page.tsx, app/admin/layout.tsx)
 * buat baca session login user dan query data dengan RLS yang berlaku
 * sesuai user yang sedang login.
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Dipanggil dari Server Component tanpa akses set cookie —
            // aman diabaikan karena middleware.ts yang urus refresh session.
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // sama seperti di atas
          }
        },
      },
    }
  );
}
