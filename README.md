# React + Tailwind + Supabase Database Page

A deploy-ready database page with:
- A secure form to insert contact/employee data
- A recent-records table (latest 10)
- Environment-based Supabase connection for Vercel

## Fields included
- Name
- Address
- Designation
- Phone Number

## 1) Install and run locally
```bash
npm install
npm run dev
```

## 2) Add environment variables
Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

> Security rule: use only the public **anon key** on frontend. Never expose the Supabase service role key in client code.

## 3) Supabase table setup
Create a `contacts` table:

```sql
create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  designation text not null,
  phone_number text not null,
  created_at timestamptz not null default now()
);
```

Enable RLS and allow inserts/selects for anon users (or customize for authenticated users only):

```sql
alter table public.contacts enable row level security;

create policy "anon can insert contacts"
on public.contacts
for insert
to anon
with check (true);

create policy "anon can read contacts"
on public.contacts
for select
to anon
using (true);
```

## 4) Deploy to Vercel (GitHub-connected)
1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add environment variables in Vercel Project Settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy.

Deploy links:
- New project: `https://vercel.com/new`
- One-click clone style: `https://vercel.com/new/clone?repository-url=<YOUR_GITHUB_REPO_URL>`
