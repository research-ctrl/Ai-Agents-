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

## 3) Supabase/PostgreSQL setup (NO RLS)
If you want one paste-ready SQL script for this form without RLS, use:

- `supabase_form_setup_no_rls.sql`

You can paste the full file directly into your PostgreSQL/Supabase SQL command line/editor.

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
