# Shipyard Material Control Prototype

A prototype web app for end-to-end shipyard material control built with **Next.js App Router**, **React**, **TypeScript**, **Tailwind CSS**, and a **Supabase-ready** backend foundation. The prototype is seeded with realistic dummy data and an AI provider abstraction for **Groq**, **Gemini**, or **mock fallback**.

---

## Part 1 · Workflow analysis

### End-to-end lifecycle
1. **Requirement Raise** → capture material request with ship, yard, item, spec, quantity, phase, urgency, note, and optional image.
2. **Procurement Review** → check stock, recovered materials, and decide full issue / partial procurement / full procurement.
3. **Approval** → single approval authority approves or rejects.
4. **Vendor Mapping** → compare vendors using historic price, speed, QC rejection, and reliability signals.
5. **PO + Advance Payment** → issue purchase order and track advance payment lifecycle before delivery.
6. **Delivery Tracking** → monitor RFQ to dispatch to yard arrival and QC outcome.
7. **Goods Receipt + QC** → receive quantity, store challan/invoice image paths, and branch for pass / partial / fail.
8. **Inventory Intake** → create a PIN and store linkages to requirement, PO, receipt, QC, and phase.
9. **Issue to Shipbuilder** → track the issued quantity, phase, issuer, receiver, and outsourced shipbuilder handoff.
10. **Recovery Capture** → classify returned material as Not Used, Leftover, or Scrap with prefix-based derived PINs.
11. **AI Reuse Suggestion** → advisory-only reuse recommendation.
12. **Re-entry into Inventory** → recovered material becomes a child PIN linked to its parent.
13. **PIN Journey** → one-click traceability across the whole lifecycle.

### Core entities and transitions
- **Requirements** move from raised → review → approval → procurement execution.
- **Vendor comparisons** are linked to requirements and inform a human vendor selection.
- **Purchase orders** and **payments** track the commercial side.
- **Delivery events**, **receipts**, and **QC records** cover inbound logistics.
- **Inventory items** hold the operational stock truth with **PIN traceability**.
- **Issue records**, **recovery records**, and **reuse reviews** capture the outbound and reverse flow.
- **AI recommendations** are advisory overlays only.

### Main state changes
- Requirement status tracks demand maturity.
- Payment status tracks advance payment gates before delivery.
- Delivery status tracks logistics milestones.
- QC status determines whether stock enters inventory or a hold/return path.
- Inventory status tracks available/reserved/issued/hold.
- Recovery type + condition determine whether material can re-enter inventory.

---

## Part 2 · Recommended architecture

### Why this stack works well
- **Next.js App Router** gives route-native module separation, scalable layouts, and clean server/client boundaries.
- **TypeScript** keeps workflow objects and statuses consistent.
- **Tailwind CSS** makes it easy to deliver a modern operations dashboard quickly.
- **Supabase PostgreSQL** is a strong fit for relational traceability and future file uploads via Storage.
- **Python seed scripts** are fast to iterate for realistic prototype datasets.

### Better alternatives, briefly
For a production-heavy workflow platform, a combination of **Next.js + Supabase Edge Functions** or **Next.js + a dedicated workflow engine** could improve orchestration, notifications, and approval automation. Still, this prototype intentionally stays with the requested stack and keeps extension points ready.

### Implementation approach used here
- **UI layer**: `app/`, `components/`, `features/`
- **Domain/data layer**: `lib/data`, `lib/types`, `lib/validation`
- **Supabase config layer**: `lib/supabase`
- **AI provider layer**: `lib/ai`
- **Seed system**: `scripts/generate_seed_data.py`, `lib/mock/generated-data.*`, `supabase/seed.sql`
- **Database schema**: `supabase/schema.sql`

---

## Part 3 · File structure

```text
.
├── app/
│   ├── api/ai/route.ts                    # AI provider abstraction endpoint
│   ├── globals.css                        # Global visual language
│   ├── layout.tsx                         # Root layout
│   └── (app)/                             # Main shell routes
│       ├── layout.tsx                     # Sidebar + topbar shell
│       ├── page.tsx                       # Dashboard
│       ├── requirements/
│       │   ├── raise/page.tsx             # Requirement Raise
│       │   └── queue/page.tsx             # Requirement Queue
│       ├── approval-queue/page.tsx
│       ├── vendor-comparison/page.tsx
│       ├── purchase-orders/page.tsx
│       ├── payment-tracker/page.tsx
│       ├── delivery-tracker/page.tsx
│       ├── goods-receipt/page.tsx
│       ├── qc/page.tsx
│       ├── inventory/
│       │   ├── page.tsx                   # Inventory List
│       │   └── pin/[pin]/page.tsx         # PIN Journey Detail
│       ├── issue-to-shipbuilder/page.tsx
│       ├── recovery-entry/page.tsx
│       ├── reuse-review/page.tsx
│       ├── reports/page.tsx
│       ├── alerts-center/page.tsx
│       ├── settings/page.tsx
│       └── ai-provider/page.tsx
├── components/
│   ├── layout/                            # Sidebar, topbar, shell
│   └── ui/                                # Cards, badges, tables, stats, timelines
├── features/
│   ├── dashboard/components/              # Workflow overview and KPI composition
│   ├── requirements/components/           # Low-input requirement form
│   ├── procurement/components/            # Shared module page template
│   ├── pin-journey/components/            # PIN traceability view
│   └── settings/components/               # AI provider selector client component
├── lib/
│   ├── ai/providers.ts                    # Provider interface + mock fallback
│   ├── data/                              # Module config and data aggregators
│   ├── mock/                              # Generated seed dataset for UI
│   ├── supabase/                          # Browser/server clients + env config
│   ├── types/                             # Shared domain types
│   ├── utils/                             # Classname helper
│   └── validation/                        # Zod schemas
├── scripts/generate_seed_data.py          # Python dummy-data generator
├── supabase/
│   ├── schema.sql                         # Relational PostgreSQL schema
│   └── seed.sql                           # Prototype seed payloads generated by Python
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

### Why each major folder exists
- `app/`: route-driven user journeys and API endpoints.
- `components/`: reusable visual primitives and layout building blocks.
- `features/`: module-specific UI composition without coupling everything to routes.
- `lib/data/`: aggregation helpers and future repository boundaries.
- `lib/supabase/`: all Supabase client creation lives here.
- `lib/ai/`: provider abstraction and advisory generation logic.
- `lib/mock/`: generated dummy data consumed by the prototype UI.
- `scripts/`: Python seed generation and future maintenance scripts.
- `supabase/`: schema and seed artifacts that map directly to a Supabase project.

### How the workflow connects across layers
- **Frontend pages** render one route per workflow module.
- **Feature components** transform raw rows into forms, tables, cards, and timelines.
- **Data helpers** expose pre-joined views such as dashboard metrics and PIN journeys.
- **Supabase layer** is ready to swap mock data for live database queries.
- **AI layer** accepts provider + use case and returns clearly labeled advisory responses.
- **Seed system** keeps the UI, JSON, and SQL payloads aligned.

---

## Part 4 · Database design

The prototype schema lives in `supabase/schema.sql`.

### Included tables
- `roles`
- `users`
- `categories`
- `units`
- `phases`
- `locations`
- `items`
- `vendors`
- `requirements`
- `requirement_attachments`
- `reviews`
- `approvals`
- `vendor_comparisons`
- `purchase_orders`
- `purchase_order_items`
- `payment_requests`
- `payment_transactions`
- `delivery_events`
- `receipts`
- `qc_records`
- `inventory_items`
- `inventory_movements`
- `issue_records`
- `recovery_records`
- `reuse_reviews`
- `ai_recommendations`
- `alerts`
- `weekly_reports`
- `audit_logs`

### Design notes
- Strong traceability fields such as `linked_requirement_id`, `linked_po_id`, `linked_receipt_id`, `linked_qc_id`, `parent_pin`, and `derived_pin_type` are included.
- Enum types cover requirement, PO, payment, delivery, QC, inventory, and recovery lifecycle states.
- No RLS is enabled in this prototype by design.

---

## Part 5 · Seed system

### What the Python script does
`scripts/generate_seed_data.py` generates:
- `lib/mock/generated-data.json`
- `lib/mock/generated-data.ts`
- `supabase/seed.sql`

### Seeded record coverage
- 30 items
- 8 vendors
- 20 requirements
- 15 purchase orders
- 10 receipts
- 10 QC entries
- 26 inventory rows including derived PINs
- 8 issue records
- 6 recovery records
- 26 AI recommendations across use cases
- 8 alerts
- 4 weekly reports

### Storage/image references
Seeded rows include example storage paths such as:
- `requirements/req_004/item.jpg`
- `receipts/rcpt_001/challan.jpg`
- `recovery/recov_001/photo.jpg`

### Regenerate seed data
```bash
npm run seed
```

---

## Part 6 · Frontend scaffolding

Implemented screens:
- Dashboard
- Requirement Raise
- Requirement Queue
- Approval Queue
- Vendor Comparison
- Purchase Orders
- Payment Tracker
- Delivery Tracker
- Goods Receipt
- QC
- Inventory List
- PIN Detail / Journey
- Issue to Shipbuilder
- Recovery Entry
- Reuse Review
- Reports
- Alerts Center
- Settings
- AI Provider Selector

UI principles used:
- low-input forms
- dropdown-first interactions
- modern industrial dashboard styling
- strong status badges and cards
- tables for raw data transparency
- timelines for lifecycle visibility

---

## Part 7 · AI integration scaffold

### Supported providers
- `mock`
- `groq`
- `gemini`

### How it works
- Provider selection is handled in the frontend via a selector component.
- AI access is abstracted in `lib/ai/providers.ts`.
- `app/api/ai/route.ts` exposes a single advisory endpoint.
- If no live key is available, the system automatically falls back to mock content.
- Every AI response is labeled **advisory only**.

---

## Part 8 · Example screens

The UI demonstrates:
- dashboard KPIs and workflow explanation
- requirement autofill flow
- vendor comparison and advisory flags
- payment and delivery status tracking
- receipt + QC routing
- inventory with clickable PIN detail
- recovery and reuse review
- weekly reports and alerts architecture

---

## Part 9 · Documentation / setup

### Install
```bash
npm install
```

### Run locally
```bash
npm run dev
```

### Environment variables
Copy `.env.example` to `.env.local` and fill values as needed.

### Supabase usage
- Use `supabase/schema.sql` to create the schema.
- Use `supabase/seed.sql` or the generated JSON payloads for prototype seeding.
- Store uploaded images in a bucket structure matching the seeded paths.

### Notes for future developers
- Replace `lib/mock/generated-data.ts` reads with repository functions in `lib/data/`.
- Keep server writes behind route handlers or server actions.
- Extend `lib/ai/providers.ts` with real Groq / Gemini request code when ready.
- Add multi-ship and multi-yard master tables without changing the UI contracts.
