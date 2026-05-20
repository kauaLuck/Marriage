create extension if not exists "pgcrypto";

create type public.gift_status as enum ('available', 'completed');
create type public.payment_status as enum ('pending', 'approved', 'rejected', 'cancelled');
create type public.payment_type as enum ('pix');
create type public.contribution_status as enum ('pending', 'paid', 'failed');
create type public.rsvp_status as enum ('confirmed', 'declined');
create type public.quota_status as enum ('available', 'reserved', 'paid');

create table if not exists public.guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.guest_sessions (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests(id) on delete cascade,
  session_token text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  role text not null default 'owner',
  created_at timestamptz not null default now()
);

create table if not exists public.gifts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  image_url text,
  price_cents integer not null check (price_cents > 0),
  allow_shared boolean not null default false,
  constraint gifts_sharing_rule check ((price_cents < 300000 and allow_shared = false) or price_cents >= 300000),
  collected_amount_cents integer not null default 0,
  status public.gift_status not null default 'available',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key,
  provider text not null default 'mercado_pago',
  provider_payment_id text,
  payment_type public.payment_type not null default 'pix',
  status public.payment_status not null default 'pending',
  amount_cents integer not null check (amount_cents > 0),
  guest_id uuid not null references public.guests(id) on delete cascade,
  gift_id uuid references public.gifts(id) on delete set null,
  qr_code text,
  qr_code_base64 text,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.gift_contributions (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references public.gifts(id) on delete cascade,
  guest_id uuid not null references public.guests(id) on delete cascade,
  payment_id uuid references public.payments(id) on delete set null,
  amount_cents integer not null check (amount_cents > 0),
  status public.contribution_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.honeymoon_quotas (
  id uuid primary key default gen_random_uuid(),
  quota_number integer not null unique,
  price_cents integer not null default 10000,
  status public.quota_status not null default 'available',
  guest_id uuid references public.guests(id) on delete set null,
  payment_id uuid references public.payments(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null unique references public.guests(id) on delete cascade,
  attendance_status public.rsvp_status not null,
  guests_count integer not null default 1,
  dietary_restrictions text,
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_rsvps_updated_at
before update on public.rsvps
for each row
execute function public.touch_updated_at();

alter table public.guests enable row level security;
alter table public.guest_sessions enable row level security;
alter table public.admins enable row level security;
alter table public.gifts enable row level security;
alter table public.payments enable row level security;
alter table public.gift_contributions enable row level security;
alter table public.honeymoon_quotas enable row level security;
alter table public.rsvps enable row level security;

create policy "public can view gifts"
on public.gifts for select
using (true);

create policy "public can view paid gift contributions"
on public.gift_contributions for select
using (status = 'paid');

create policy "public can view honeymoon quotas"
on public.honeymoon_quotas for select
using (true);

create policy "service role manages guests"
on public.guests for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "service role manages sessions"
on public.guest_sessions for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "service role manages payments"
on public.payments for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "service role manages contributions"
on public.gift_contributions for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "service role manages quotas"
on public.honeymoon_quotas for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

create policy "service role manages rsvps"
on public.rsvps for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

insert into storage.buckets (id, name, public)
values ('wedding-media', 'wedding-media', true)
on conflict (id) do nothing;

create policy "public can read wedding media"
on storage.objects for select
using (bucket_id = 'wedding-media');

create policy "service role manages wedding media"
on storage.objects for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

insert into public.gifts (slug, title, description, image_url, price_cents, allow_shared, featured, sort_order)
values
  ('geladeira-french-door', 'Geladeira French Door', 'Espaço, praticidade e acabamento premium para o nosso novo lar.', 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=1200&q=80', 689000, true, true, 1),
  ('fogao-cooktop', 'Fogão Cooktop', 'Nosso convite para jantares especiais e receitas em dupla.', 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80', 269900, false, true, 2),
  ('sofa-linho-organico', 'Sofá em Linho Orgânico', 'Conforto elegante para os nossos domingos de filme.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', 459000, true, true, 3),
  ('air-fryer-premium', 'Air Fryer Premium', 'Praticidade bonita até nos pequenos momentos.', 'https://images.unsplash.com/photo-1585515656973-597dd5c90834?auto=format&fit=crop&w=1200&q=80', 89900, false, false, 4),
  ('jogo-de-cama-egipcio', 'Jogo de Cama Egípcio', 'Toque suave e atmosfera de hotel boutique.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', 139900, false, false, 5),
  ('tv-oled-65', 'TV OLED 65”', 'Para assistir filmes, séries e rever nossos vídeos favoritos.', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80', 399900, true, false, 6),
  ('cafeteira-italiana', 'Cafeteira Italiana', 'Para começar a vida juntos com aroma de café fresco.', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80', 129900, false, false, 7),
  ('maquina-de-lavar', 'Máquina de Lavar', 'Eficiência e cuidado para a rotina da nossa casa.', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80', 349900, true, false, 8),
  ('kit-pratos-ceramica', 'Kit Pratos em Cerâmica', 'Detalhes que deixam cada mesa mais especial.', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80', 119900, false, false, 9),
  ('batedeira-artisan', 'Batedeira Artisan', 'Receitas afetivas, aniversários e celebrações futuras.', 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=1200&q=80', 249900, false, false, 10)
on conflict (slug) do nothing;

insert into public.honeymoon_quotas (quota_number)
select generate_series(1, 100)
on conflict (quota_number) do nothing;
