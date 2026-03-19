# Shipyard Material Control System Prototype

A Next.js App Router prototype for a shipyard material control workflow with:
- operational workflow pages from requirement raise to recovery and PIN traceability
- Supabase-ready PostgreSQL schema and storage path support
- optional AI advisory integration with Groq or Gemini
- deterministic mock fallback when AI or Supabase env vars are missing
- Python seed tooling that generates realistic demo data

## Stack
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Supabase PostgreSQL + Storage (optional at runtime for this prototype)
- Groq / Gemini AI adapters with mock fallback
- Python seed scripts

## Current architecture
- `src/app/` routes, layouts, and API routes
- `src/components/` reusable UI primitives
- `src/features/` higher-level feature views
- `src/lib/` shared constants, utilities, validation, Supabase, DB, and AI helpers
- `src/types/` shared TypeScript types
- `src/mock/` generated dummy data used as the demo fallback source of truth
- `scripts/seed/` Python data generation and REST seeding scripts
- `supabase/migrations/` schema SQL

## What is real vs mocked
### Real
- working Next.js routes for dashboard, requirements, approvals, vendor comparison, POs, payment tracking, delivery, receipts, QC, inventory, PIN journey, issues, recovery, reuse, reports, alerts, settings, and AI provider selection
- schema SQL for the requested workflow entities
- Python data generation and Supabase REST seeding scripts
- API route for advisory AI summaries

### Mocked / optional
- runtime data reads currently use seeded JSON fallback for demo reliability
- create/update flows are rendered as prototype-ready forms and patterns, but not all write actions are persisted yet
- file/image upload is storage-path-ready and includes an optional Supabase upload helper, but the form submission flow is not fully wired end-to-end yet
- AI summaries fall back to deterministic mock output if provider keys are missing or provider calls fail

## Setup
### 1) Install dependencies
```bash
npm install
```

### 2) Create environment variables
Create `.env.local` in the project root.

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GROQ_API_KEY=your-groq-key
GEMINI_API_KEY=your-gemini-key
```

Notes:
- `NEXT_PUBLIC_*` vars are only needed if you want the browser-side Supabase helper available.
- `SUPABASE_SERVICE_ROLE_KEY` is only for the Python seed script.
- AI keys are optional; without them, the app uses mock advisory summaries.

## Supabase setup
### 1) Create the database schema
Run the SQL in:
```bash
supabase/migrations/202603180001_shipyard_material_control.sql
```

This creates the requested prototype tables including:
- master data (`roles`, `users`, `items`, `vendors`, `phases`, `categories`, `units`, `locations`)
- workflow data (`requirements`, `reviews`, `approvals`, `vendor_comparisons`, `purchase_orders`, `payment_requests`, `delivery_events`, `receipts`, `qc_records`, `inventory_items`, `issue_records`, `recovery_records`, `reuse_reviews`)
- support data (`ai_recommendations`, `alerts`, `weekly_reports`, `audit_logs`)

### 2) Create a storage bucket
Create a bucket named:
```bash
material-control-images
```

Prototype image references use storage-style paths such as:
- `requirement-images/req-1.jpg`
- `receipt-images/receipt-1-invoice.jpg`
- `recovery-images/recovery-1.jpg`

## Seed data
### Generate local dummy data JSON
```bash
npm run seed:generate
```

This writes:
```bash
src/mock/generated-data.json
```

### Seed Supabase via REST
```bash
npm run seed:db
```

Expected seeded volume includes at least:
- 30 items
- 8 vendors
- 20 requirements
- 15 purchase orders
- 10 receipts
- 10 QC records
- 20+ inventory records including derived recovery PINs
- 8 issue records
- 6 recovery records
- AI suggestions, alerts, weekly reports, and audit log samples

## Run locally
```bash
npm run dev
```

Then open:
```bash
http://localhost:3000
```

## AI API usage
POST to:
```bash
/api/ai/summary
```

Example body:
```json
{
  "provider": "groq",
  "useCase": "vendor",
  "contextId": "req-1",
  "rawData": {
    "requirementId": "req-1",
    "candidateVendors": ["vendor-1", "vendor-2"]
  }
}
```

Response shape:
```json
{
  "providerUsed": "mock",
  "summary": "...",
  "mocked": true
}
```

## Prototype notes
- no auth
- no RLS
- one ship / one yard / one warehouse / two store rooms assumed in the UI defaults
- AI is advisory only; raw backend-shaped data remains visible in the app
- the implementation is intentionally modular but kept lightweight for further iteration

## Suggested next steps
- wire create/update actions to Supabase tables and storage uploads
- add filtered search across requirements, POs, alerts, and inventory
- add detail drill-down pages for receipts, QC, payments, and alerts
- add charting and export options for reports
