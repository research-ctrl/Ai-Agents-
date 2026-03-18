-- Shipyard Material Control prototype schema
create extension if not exists pgcrypto;

create type requirement_status as enum (
  'raised',
  'procurement_review',
  'approved',
  'vendor_mapping',
  'po_created',
  'advance_requested',
  'in_delivery',
  'received',
  'qc_completed',
  'issued',
  'closed',
  'rejected'
);

create type po_status as enum ('draft', 'issued', 'partially_received', 'closed', 'cancelled');
create type payment_status as enum ('not_requested', 'advance_requested', 'under_finance_review', 'advance_paid', 'vendor_confirmed', 'settled', 'on_hold');
create type delivery_status as enum ('rfq_sent', 'quote_received', 'vendor_selected', 'po_issued', 'advance_requested', 'advance_paid', 'vendor_confirmed', 'dispatch_pending', 'dispatched', 'in_transit', 'reached_yard', 'received', 'under_qc', 'qc_passed', 'qc_partial', 'qc_failed', 'closed');
create type qc_status as enum ('passed', 'partial_pass', 'failed');
create type inventory_status as enum ('available', 'reserved', 'issued', 'hold');
create type recovery_type as enum ('not_used', 'leftover', 'scrap');
create type condition_status as enum ('good', 'repairable', 'damaged');
create type alert_status as enum ('open', 'acknowledged', 'closed');
create type ai_provider as enum ('mock', 'groq', 'gemini');

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  role_id uuid references roles(id),
  full_name text not null,
  email text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists phases (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  ship_name text not null,
  yard_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists locations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  location_type text not null,
  ship_name text,
  yard_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  unit_id uuid references units(id),
  item_name text not null,
  specification text not null,
  item_code text unique,
  reorder_level numeric(12,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  vendor_name text not null unique,
  contact_person text,
  price_score numeric(5,2),
  avg_delivery_days integer,
  qc_rejection_rate numeric(5,2),
  reliability_score numeric(5,2),
  picture_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists requirements (
  id uuid primary key default gen_random_uuid(),
  request_no text not null unique,
  ship_name text not null,
  yard_name text not null,
  item_id uuid not null references items(id),
  linked_phase_id uuid references phases(id),
  quantity numeric(12,2) not null,
  unit_snapshot text not null,
  required_by_date date not null,
  urgency text not null,
  note text,
  status requirement_status not null default 'raised',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists requirement_attachments (
  id uuid primary key default gen_random_uuid(),
  requirement_id uuid not null references requirements(id) on delete cascade,
  storage_path text not null,
  caption text,
  created_at timestamptz not null default now(),
  created_by uuid references users(id)
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  requirement_id uuid not null references requirements(id) on delete cascade,
  reviewer_id uuid not null references users(id),
  stock_check_result text not null,
  reusable_check_result text not null,
  decision text not null,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists approvals (
  id uuid primary key default gen_random_uuid(),
  requirement_id uuid not null references requirements(id) on delete cascade,
  approver_id uuid not null references users(id),
  status text not null check (status in ('approved', 'rejected')),
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists vendor_comparisons (
  id uuid primary key default gen_random_uuid(),
  requirement_id uuid not null references requirements(id) on delete cascade,
  vendor_id uuid not null references vendors(id),
  price_score numeric(5,2) not null,
  delivery_days integer not null,
  qc_rejection_rate numeric(5,2) not null,
  reliability_score numeric(5,2) not null,
  is_ai_recommended boolean not null default false,
  selected_by_human boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid references users(id)
);

create table if not exists purchase_orders (
  id uuid primary key default gen_random_uuid(),
  po_no text not null unique,
  linked_requirement_id uuid references requirements(id),
  vendor_id uuid not null references vendors(id),
  status po_status not null default 'draft',
  advance_percentage numeric(5,2) not null default 0,
  total_amount numeric(14,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists purchase_order_items (
  id uuid primary key default gen_random_uuid(),
  linked_po_id uuid not null references purchase_orders(id) on delete cascade,
  item_id uuid not null references items(id),
  linked_phase_id uuid references phases(id),
  quantity numeric(12,2) not null,
  unit_price numeric(14,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists payment_requests (
  id uuid primary key default gen_random_uuid(),
  linked_po_id uuid not null references purchase_orders(id) on delete cascade,
  status payment_status not null default 'not_requested',
  requested_amount numeric(14,2) not null,
  requested_by uuid references users(id),
  finance_owner_id uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists payment_transactions (
  id uuid primary key default gen_random_uuid(),
  payment_request_id uuid not null references payment_requests(id) on delete cascade,
  status payment_status not null,
  transaction_ref text,
  amount numeric(14,2) not null,
  created_at timestamptz not null default now(),
  created_by uuid references users(id)
);

create table if not exists delivery_events (
  id uuid primary key default gen_random_uuid(),
  linked_po_id uuid not null references purchase_orders(id) on delete cascade,
  status delivery_status not null,
  event_at timestamptz not null,
  owner_id uuid references users(id),
  note text,
  created_at timestamptz not null default now(),
  created_by uuid references users(id)
);

create table if not exists receipts (
  id uuid primary key default gen_random_uuid(),
  receipt_no text not null unique,
  linked_po_id uuid not null references purchase_orders(id),
  received_quantity numeric(12,2) not null,
  challan_image_path text,
  invoice_image_path text,
  received_at timestamptz not null,
  received_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists qc_records (
  id uuid primary key default gen_random_uuid(),
  linked_receipt_id uuid not null references receipts(id) on delete cascade,
  status qc_status not null,
  inspector_id uuid references users(id),
  accepted_quantity numeric(12,2) not null,
  rejected_quantity numeric(12,2) not null default 0,
  remarks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  pin text not null unique,
  item_id uuid not null references items(id),
  linked_requirement_id uuid references requirements(id),
  linked_po_id uuid references purchase_orders(id),
  linked_receipt_id uuid references receipts(id),
  linked_qc_id uuid references qc_records(id),
  linked_phase_id uuid references phases(id),
  location_id uuid references locations(id),
  quantity_on_hand numeric(12,2) not null,
  status inventory_status not null default 'available',
  parent_pin text,
  derived_pin_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists inventory_movements (
  id uuid primary key default gen_random_uuid(),
  inventory_item_id uuid not null references inventory_items(id) on delete cascade,
  movement_type text not null,
  from_location text,
  to_location text,
  quantity numeric(12,2) not null,
  created_at timestamptz not null default now(),
  created_by uuid references users(id)
);

create table if not exists issue_records (
  id uuid primary key default gen_random_uuid(),
  inventory_item_id uuid not null references inventory_items(id),
  linked_phase_id uuid references phases(id),
  issue_date date not null,
  quantity numeric(12,2) not null,
  issued_by uuid references users(id),
  received_by text not null,
  shipbuilder_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists recovery_records (
  id uuid primary key default gen_random_uuid(),
  issue_record_id uuid not null references issue_records(id) on delete cascade,
  recovery_pin text not null unique,
  recovery_type recovery_type not null,
  quantity numeric(12,2) not null,
  reason text,
  condition_status condition_status not null,
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists reuse_reviews (
  id uuid primary key default gen_random_uuid(),
  recovery_record_id uuid not null references recovery_records(id) on delete cascade,
  ai_recommendation text not null,
  human_decision text not null,
  reviewed_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references users(id),
  updated_by uuid references users(id)
);

create table if not exists ai_recommendations (
  id uuid primary key default gen_random_uuid(),
  provider ai_provider not null,
  context_type text not null,
  reference_id text not null,
  summary text not null,
  confidence_score numeric(5,2),
  created_at timestamptz not null default now(),
  created_by uuid references users(id)
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  alert_type text not null,
  severity text not null,
  title text not null,
  message text not null,
  status alert_status not null default 'open',
  created_at timestamptz not null default now(),
  created_by uuid references users(id)
);

create table if not exists weekly_reports (
  id uuid primary key default gen_random_uuid(),
  week_start date not null,
  week_end date not null,
  requirements_raised integer not null,
  pos_created integer not null,
  receipts_completed integer not null,
  recoveries_logged integer not null,
  narrative text,
  created_at timestamptz not null default now(),
  created_by uuid references users(id)
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id text not null,
  action text not null,
  details text,
  created_at timestamptz not null default now(),
  created_by uuid references users(id)
);

-- No authentication or RLS is enabled in this prototype on purpose.
