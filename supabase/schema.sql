-- Jalankan file ini di: Supabase Dashboard -> SQL Editor -> New query -> Run
-- Aman dijalankan ulang (pakai "if not exists" / "or replace").

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  description text,
  price text not null,
  image_url text,
  created_at timestamptz not null default now()
);

-- Row Level Security: wajib dinyalain di Supabase, kalau enggak semua
-- akses ke tabel ini bakal ditolak secara default.
alter table categories enable row level security;
alter table products enable row level security;

-- Siapa aja (termasuk pengunjung yang belum login) boleh BACA data,
-- soalnya halaman /store perlu nampilin produk ke semua orang.
drop policy if exists "public_read_categories" on categories;
create policy "public_read_categories" on categories
  for select using (true);

drop policy if exists "public_read_products" on products;
create policy "public_read_products" on products
  for select using (true);

-- Cuma user yang UDAH LOGIN yang boleh nambah/ubah/hapus.
-- Ini setup paling simpel: siapa pun yang berhasil login dianggap admin.
-- Kalau nanti mau buka sign up buat customer biasa (bukan cuma kamu),
-- baca catatan "Batasi admin ke akun tertentu" di README.
drop policy if exists "authenticated_manage_categories" on categories;
create policy "authenticated_manage_categories" on categories
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "authenticated_manage_products" on products;
create policy "authenticated_manage_products" on products
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
