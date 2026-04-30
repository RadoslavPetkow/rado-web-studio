-- Rado Web Studio client portal MVP schema
-- Run this in the Supabase SQL editor after creating a project.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text default 'client' check (role in ('client', 'admin')),
  company_name text,
  phone text,
  created_at timestamptz default now()
);

create table if not exists public.project_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  business_name text,
  business_type text,
  service_needed text,
  budget_range text,
  timeline text,
  message text,
  status text default 'new' check (status in ('new', 'reviewed', 'converted', 'rejected')),
  created_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references auth.users(id) on delete cascade,
  title text not null,
  service_type text,
  description text,
  budget_range text,
  status text default 'new' check (status in ('new', 'in_progress', 'waiting_for_client', 'completed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete cascade,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists public.future_payments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  amount numeric,
  currency text default 'EUR',
  status text default 'planned',
  provider text,
  created_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create or replace function public.is_admin(user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = user_id
      and role = 'admin'
  );
$$;

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.role is distinct from new.role and not public.is_admin() then
    raise exception 'Only admins can change profile roles.';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_profile_role_escalation on public.profiles;
create trigger prevent_profile_role_escalation
before update on public.profiles
for each row
execute function public.prevent_profile_role_escalation();

alter table public.profiles enable row level security;
alter table public.project_requests enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;
alter table public.future_payments enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Admin can read all profiles" on public.profiles;
create policy "Admin can read all profiles"
on public.profiles for select
to authenticated
using (public.is_admin());

drop policy if exists "Public users can insert project requests" on public.project_requests;
create policy "Public users can insert project requests"
on public.project_requests for insert
to anon, authenticated
with check (true);

drop policy if exists "Logged-in users can read own project requests" on public.project_requests;
create policy "Logged-in users can read own project requests"
on public.project_requests for select
to authenticated
using (user_id = auth.uid() or email = auth.jwt() ->> 'email');

drop policy if exists "Admin can read all project requests" on public.project_requests;
create policy "Admin can read all project requests"
on public.project_requests for select
to authenticated
using (public.is_admin());

drop policy if exists "Admin can update all project requests" on public.project_requests;
create policy "Admin can update all project requests"
on public.project_requests for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Users can read own projects" on public.projects;
create policy "Users can read own projects"
on public.projects for select
to authenticated
using (client_id = auth.uid());

drop policy if exists "Admin can read all projects" on public.projects;
create policy "Admin can read all projects"
on public.projects for select
to authenticated
using (public.is_admin());

drop policy if exists "Admin can insert projects" on public.projects;
create policy "Admin can insert projects"
on public.projects for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admin can update all projects" on public.projects;
create policy "Admin can update all projects"
on public.projects for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Users can read messages for own projects" on public.messages;
create policy "Users can read messages for own projects"
on public.messages for select
to authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = messages.project_id
      and projects.client_id = auth.uid()
  )
);

drop policy if exists "Admin can read all messages" on public.messages;
create policy "Admin can read all messages"
on public.messages for select
to authenticated
using (public.is_admin());

drop policy if exists "Users can insert messages into own projects" on public.messages;
create policy "Users can insert messages into own projects"
on public.messages for insert
to authenticated
with check (
  sender_id = auth.uid()
  and exists (
    select 1
    from public.projects
    where projects.id = messages.project_id
      and projects.client_id = auth.uid()
  )
);

drop policy if exists "Admin can insert messages into any project" on public.messages;
create policy "Admin can insert messages into any project"
on public.messages for insert
to authenticated
with check (public.is_admin() and sender_id = auth.uid());

drop policy if exists "Users can read future payments for own projects" on public.future_payments;
create policy "Users can read future payments for own projects"
on public.future_payments for select
to authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = future_payments.project_id
      and projects.client_id = auth.uid()
  )
);

drop policy if exists "Admin can manage future payments" on public.future_payments;
create policy "Admin can manage future payments"
on public.future_payments for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
