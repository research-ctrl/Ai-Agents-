-- Paste this whole script into your PostgreSQL / Supabase SQL editor.
-- This version intentionally does NOT enable RLS.

create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  address text not null check (char_length(trim(address)) > 0),
  designation text not null check (char_length(trim(designation)) > 0),
  phone_number text not null check (phone_number ~ '^[0-9+() -]{7,20}$'),
  created_at timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);

-- Optional: keep updates fresh timestamp if you add updates later.
-- alter table public.contacts add column if not exists updated_at timestamptz not null default now();
-- create or replace function public.set_updated_at()
-- returns trigger as $$
-- begin
--   new.updated_at = now();
--   return new;
-- end;
-- $$ language plpgsql;
-- drop trigger if exists contacts_set_updated_at on public.contacts;
-- create trigger contacts_set_updated_at
-- before update on public.contacts
-- for each row execute procedure public.set_updated_at();


-- If your table already exists with an older phone regex constraint, run this too:
alter table public.contacts
  drop constraint if exists contacts_phone_number_check;

alter table public.contacts
  add constraint contacts_phone_number_check
  check (phone_number ~ '^[0-9+() -]{7,20}$');
