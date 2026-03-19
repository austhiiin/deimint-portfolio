-- ============================================================
--  Artist Portfolio — Supabase Schema
-- ============================================================

-- Enable UUID extension (already enabled on most Supabase projects)
create extension if not exists "pgcrypto";

-- ── commissions ─────────────────────────────────────────────
create table if not exists public.commissions (
  id          uuid primary key default gen_random_uuid(),
  client_name text        not null,
  status      text        not null default 'queued'
                check (status in ('queued','sketching','painting','completed')),
  queue_pos   integer     not null default 0,
  preview_url text,
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at on every row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists commissions_set_updated_at on public.commissions;
create trigger commissions_set_updated_at
  before update on public.commissions
  for each row execute procedure public.set_updated_at();

-- Row-Level Security
alter table public.commissions enable row level security;

-- Allow anyone to SELECT their own commission by id (public lookup)
create policy "Public can read own commission"
  on public.commissions for select
  using (true);                         -- tighten per your auth needs

-- Only service-role can insert/update/delete
create policy "Service role manages commissions"
  on public.commissions for all
  using (auth.role() = 'service_role');

-- Realtime publication
alter publication supabase_realtime add table public.commissions;

-- ── Seed data (remove in production) ────────────────────────
insert into public.commissions (id, client_name, status, queue_pos, preview_url) values
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Alex Rivera',   'painting',  1, 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80'),
  ('a1b2c3d4-0000-0000-0000-000000000002', 'Jordan Lee',    'sketching', 2, null),
  ('a1b2c3d4-0000-0000-0000-000000000003', 'Morgan Chen',   'queued',    3, null),
  ('a1b2c3d4-0000-0000-0000-000000000004', 'Taylor Brooks', 'completed', 0, 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80');