-- BlockBuilder initial schema
-- Run this in Supabase SQL Editor.

create extension if not exists "pgcrypto";

-- ACCOUNTS (tenants)
create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

-- PROFILES (Supabase auth users mapped to account)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  account_id uuid references accounts(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'editor' check (role in ('super_admin','admin','editor')),
  created_at timestamptz not null default now()
);

-- SITES
create table if not exists sites (
  id uuid primary key default gen_random_uuid(),
  account_id uuid references accounts(id) on delete cascade,
  slug text unique not null,
  name text not null,
  domain text,
  created_at timestamptz not null default now()
);

-- PAGES
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references sites(id) on delete cascade,
  slug text not null,
  title text not null,
  draft_blocks jsonb not null default '[]'::jsonb,
  published_version_id uuid,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(site_id, slug)
);

-- PAGE VERSIONS (published snapshots)
create table if not exists page_versions (
  id uuid primary key default gen_random_uuid(),
  page_id uuid references pages(id) on delete cascade,
  blocks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table pages
  add constraint pages_published_version_fk
  foreign key (published_version_id)
  references page_versions(id) on delete set null;

-- MEDIA ASSETS
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references sites(id) on delete cascade,
  name text not null,
  url text not null,
  storage_path text,
  kind text not null check (kind in ('image','video')),
  alt text,
  created_at timestamptz not null default now()
);

-- THEME & SEO SETTINGS
create table if not exists theme_settings (
  id uuid primary key default gen_random_uuid(),
  site_id uuid unique references sites(id) on delete cascade,
  tokens jsonb not null default '{}'::jsonb,
  logo_url text,
  updated_at timestamptz not null default now()
);

create table if not exists seo_settings (
  id uuid primary key default gen_random_uuid(),
  site_id uuid unique references sites(id) on delete cascade,
  title text,
  description text,
  og_image_url text,
  updated_at timestamptz not null default now()
);

-- BOOKING ENQUIRIES
create table if not exists booking_enquiries (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references sites(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  event_date date not null,
  event_type text not null,
  guests int not null,
  location text not null,
  budget_range text,
  service_style text,
  setting text,
  dietary text,
  needs_staff boolean default false,
  message text,
  status text not null default 'new'
    check (status in ('new','contacted','quoted','booked','archived')),
  priority boolean default false,
  created_at timestamptz not null default now()
);

create table if not exists booking_notes (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid references booking_enquiries(id) on delete cascade,
  author_id uuid references profiles(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

-- SITE USERS (membership)
create table if not exists site_users (
  site_id uuid references sites(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  role text not null default 'editor'
    check (role in ('super_admin','admin','editor')),
  primary key (site_id, profile_id)
);

-- RLS
alter table accounts enable row level security;
alter table profiles enable row level security;
alter table sites enable row level security;
alter table pages enable row level security;
alter table page_versions enable row level security;
alter table media_assets enable row level security;
alter table theme_settings enable row level security;
alter table seo_settings enable row level security;
alter table booking_enquiries enable row level security;
alter table booking_notes enable row level security;
alter table site_users enable row level security;

-- Public can read sites + published page_versions (to serve the site anonymously).
create policy "public read sites"
  on sites for select using (true);

create policy "public read pages"
  on pages for select using (true);

create policy "public read page_versions"
  on page_versions for select using (true);

create policy "public read theme"
  on theme_settings for select using (true);

create policy "public read seo"
  on seo_settings for select using (true);

create policy "public read media"
  on media_assets for select using (true);

-- Public can insert booking enquiries (anon submission).
create policy "anyone can submit enquiry"
  on booking_enquiries for insert with check (true);

-- Only authenticated users can read / update enquiries.
create policy "auth read enquiries"
  on booking_enquiries for select using (auth.uid() is not null);

create policy "auth update enquiries"
  on booking_enquiries for update using (auth.uid() is not null);

-- Authenticated users can manage pages/media/settings (simple rule; tighten later per site_users).
create policy "auth write pages"
  on pages for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "auth write page_versions"
  on page_versions for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "auth write media"
  on media_assets for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "auth write theme"
  on theme_settings for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "auth write seo"
  on seo_settings for all using (auth.uid() is not null) with check (auth.uid() is not null);

create policy "auth read profiles"
  on profiles for select using (auth.uid() = id);

-- Profile auto-creation trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Storage bucket for media (public)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media bucket"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "auth upload media bucket"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.uid() is not null);

create policy "auth update media bucket"
  on storage.objects for update
  using (bucket_id = 'media' and auth.uid() is not null);

create policy "auth delete media bucket"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.uid() is not null);
