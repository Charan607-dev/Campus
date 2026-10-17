-- CampusFind Schema Migration v2
-- Aligns database schema with the full-featured CampusFind Student & Admin portals

-- 1. Extend profiles with student details
alter table if exists public.profiles
  add column if not exists email text,
  add column if not exists college text,
  add column if not exists student_id text,
  add column if not exists updated_at timestamptz default now();

-- 2. Extend items with type, date, contact details
alter table if exists public.items
  add column if not exists type text not null default 'lost',
  add column if not exists date date default current_date,
  add column if not exists contact text,
  add column if not exists updated_at timestamptz default now();

-- Add check constraint for item type if not exists
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'items_type_check'
  ) then
    alter table public.items add constraint items_type_check check (type in ('lost', 'found'));
  end if;
end $$;

-- 3. Extend claims with reason, loss/found references
alter table if exists public.claims
  add column if not exists found_item_id uuid references public.items(id) on delete cascade,
  add column if not exists lost_item_id uuid references public.items(id) on delete cascade,
  add column if not exists reason text,
  add column if not exists updated_at timestamptz default now();

-- 4. Extend matches with score, found/lost references
alter table if exists public.matches
  add column if not exists found_item_id uuid references public.items(id) on delete cascade,
  add column if not exists lost_item_id uuid references public.items(id) on delete cascade,
  add column if not exists score integer default 0,
  add column if not exists updated_at timestamptz default now();

-- 5. Trigger for automated profile creation upon Supabase user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    college,
    student_id,
    role,
    points
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'college',
    new.raw_user_meta_data->>'studentId',
    'student', -- Always default to student, cannot escalate via metadata
    0
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, profiles.full_name),
    college = coalesce(excluded.college, profiles.college),
    student_id = coalesce(excluded.student_id, profiles.student_id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6. Helper function to check if current user is admin (checking app_metadata or profiles table)
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  ) or (
    coalesce(auth.jwt()->'app_metadata'->>'role', '') = 'admin'
  );
$$;

-- 7. Ensure RLS Policies for Profiles
alter table public.profiles enable row level security;

drop policy if exists "Profiles are readable" on public.profiles;
create policy "Profiles are readable"
  on public.profiles for select
  to authenticated
  using (true);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 8. Ensure RLS Policies for Items (allow public/authenticated to browse all items)
alter table public.items enable row level security;

drop policy if exists "Public and authenticated users read items" on public.items;
drop policy if exists "Authenticated users read items" on public.items;
create policy "Public and authenticated users read items"
  on public.items for select
  using (true);

drop policy if exists "Users create own items" on public.items;
create policy "Users create own items"
  on public.items for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users update own items" on public.items;
create policy "Users update own items"
  on public.items for update
  to authenticated
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "Users and admins delete items" on public.items;
create policy "Users and admins delete items"
  on public.items for delete
  to authenticated
  using (auth.uid() = user_id or public.is_admin());

-- 9. Ensure RLS Policies for Claims
alter table public.claims enable row level security;

drop policy if exists "Users read own claims" on public.claims;
create policy "Users and admins read claims"
  on public.claims for select
  to authenticated
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Users create own claims" on public.claims;
create policy "Users create own claims"
  on public.claims for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Admins update claims" on public.claims;
create policy "Admins update claims"
  on public.claims for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 10. Ensure RLS Policies for Matches
alter table public.matches enable row level security;

drop policy if exists "Users read own matches" on public.matches;
create policy "Users and admins read matches"
  on public.matches for select
  to authenticated
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "Authenticated insert matches" on public.matches;
create policy "Authenticated insert matches"
  on public.matches for insert
  to authenticated
  with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "Admins update matches" on public.matches;
create policy "Admins update matches"
  on public.matches for update
  to authenticated
  using (public.is_admin());

-- 11. Useful indexes
create index if not exists idx_items_type on public.items(type);
create index if not exists idx_items_category on public.items(category);
create index if not exists idx_claims_status on public.claims(status);
create index if not exists idx_matches_status on public.matches(status);
create index if not exists idx_profiles_points on public.profiles(points desc);
