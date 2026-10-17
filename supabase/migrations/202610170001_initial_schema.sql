
-- CampusFind initial database schema

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'student'
    check (role in ('student', 'admin')),
  points integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  title text not null,
  description text,
  category text,
  location text,
  image_url text,
  status text not null default 'available'
    check (status in ('available', 'claimed', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'verified')),
  created_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  points_required integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_items_created_at
  on public.items(created_at desc);

create index if not exists idx_items_status
  on public.items(status);

create index if not exists idx_claims_user_id
  on public.claims(user_id);

create index if not exists idx_matches_user_id
  on public.matches(user_id);

alter table public.profiles enable row level security;
alter table public.items enable row level security;
alter table public.claims enable row level security;
alter table public.matches enable row level security;
alter table public.rewards enable row level security;

-- Profiles: users can read the leaderboard and update their own profile.
create policy "Profiles are readable"
on public.profiles for select
to authenticated
using (true);

create policy "Users update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Items: authenticated users can read available items and manage their own.
create policy "Authenticated users read items"
on public.items for select
to authenticated
using (true);

create policy "Users create own items"
on public.items for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users update own items"
on public.items for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Claims: users can see and create their own claims.
create policy "Users read own claims"
on public.claims for select
to authenticated
using (auth.uid() = user_id);

create policy "Users create own claims"
on public.claims for insert
to authenticated
with check (auth.uid() = user_id);

-- Matches: users can read their own matches.
create policy "Users read own matches"
on public.matches for select
to authenticated
using (auth.uid() = user_id);

-- Rewards are readable to authenticated users.
create policy "Authenticated users read rewards"
on public.rewards for select
to authenticated
using (true);
