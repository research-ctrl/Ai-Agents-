create extension if not exists pgcrypto;

create type requirement_status as enum (
  'raised',
  'under_review',
  'approved',
  'rejected',
  'po_created',
  'in_delivery',
  'received',
  'in_inventory',
  'issued',
  'closed'
);

create type approval_status as enum ('pending', 'approved', 'rejected');
create type payment_status as enum (
  'not_requested',
  'advance_requested',
  'under_finance_review',
  'advance_paid',
  'vendor_confirmed',
  'settled',
  'on_hold'
);
create type delivery_status as enum (
  'RFQ sent',
  'Quote received',
  'Vendor selected',
  'PO issued',
  'Advance requested',
  'Advance paid',
  'Vendor confirmed',
  'Dispatch pending',
  'Dispatched',
  'In transit',
  'Reached yard',
  'Received',
  'Under QC',
  'QC passed',
  'QC partial',
  'QC failed',
  'Closed'
);
create type qc_status as enum ('passed', 'partial', 'failed');
create type inventory_status as enum ('available', 'reserved', 'issued', 'recovered', 'hold', 'scrapped');
create type recovery_type as enum ('N', 'LF', 'S');
create type condition_status as enum ('good', 'repairable', 'damaged');

create table if not exists roles (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists users (
  id text primary key,
  name text not null,
  role_id text references roles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id text primary key,
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists units (
  id text primary key,
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists phases (
  id text primary key,
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists locations (
  id text primary key,
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists vendors (
  id text primary key,
  name text not null,
  price_score integer,
  delivery_score integer,
  qc_rejection_rate numeric(5,2),
  reliability_score integer,
  previous_performance_score integer,
  lead_time_days integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists items (
  id text primary key,
  name text not null,
  specification text not null,
  unit_id text references units(id),
  category_id text references categories(id),
  default_vendor_id text references vendors(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists requirements (
  id text primary key,
  item_id text references items(id),
  item_name text not null,
  specification text not null,
  quantity numeric(12,2) not null,
  unit_id text references units(id),
  required_by_date date,
  phase_id text references phases(id),
  urgency text not null,
  note text,
  image_path text,
  ship_name text not null,
  yard_name text not null,
  status requirement_status not null default 'raised',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);

create table if not exists requirement_attachments (
  id text primary key,
  requirement_id text not null references requirements(id) on delete cascade,
  storage_path text not null,
  file_kind text not null,
  created_at timestamptz not null default now(),
  created_by text
);

create table if not exists reviews (
  id text primary key,
  requirement_id text not null references requirements(id) on delete cascade,
  reviewer_id text references users(id),
  stock_on_hand numeric(12,2),
  recovered_stock numeric(12,2),
  decision text not null,
  review_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);

create table if not exists approvals (
  id text primary key,
  requirement_id text not null references requirements(id) on delete cascade,
  approver_id text references users(id),
  status approval_status not null default 'pending',
  remark text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);

create table if not exists vendor_comparisons (
  id text primary key,
  requirement_id text not null references requirements(id) on delete cascade,
  recommended_vendor_id text references vendors(id),
  human_selected_vendor_id text references vendors(id),
  comparison_snapshot jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);

create table if not exists purchase_orders (
  id text primary key,
  po_number text not null unique,
  vendor_id text references vendors(id),
  requirement_id text references requirements(id),
  status text not null,
  payment_status payment_status not null default 'not_requested',
  delivery_status delivery_status,
  po_date date,
  expected_delivery_date date,
  advance_percentage numeric(5,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);

create table if not exists purchase_order_items (
  id text primary key,
  purchase_order_id text not null references purchase_orders(id) on delete cascade,
  item_id text references items(id),
  quantity numeric(12,2) not null,
  unit_price numeric(12,2) not null,
  currency text not null default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payment_requests (
  id text primary key,
  purchase_order_id text not null references purchase_orders(id) on delete cascade,
  status payment_status not null,
  amount numeric(12,2) not null,
  requested_on date,
  requested_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payment_transactions (
  id text primary key,
  purchase_order_id text not null references purchase_orders(id) on delete cascade,
  status payment_status not null,
  amount numeric(12,2) not null,
  transaction_date date,
  reference_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists delivery_events (
  id text primary key,
  purchase_order_id text not null references purchase_orders(id) on delete cascade,
  status delivery_status not null,
  event_date date,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists receipts (
  id text primary key,
  purchase_order_id text not null references purchase_orders(id) on delete cascade,
  received_quantity numeric(12,2) not null,
  receipt_date date,
  challan_image_path text,
  invoice_image_path text,
  photo_paths jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);

create table if not exists qc_records (
  id text primary key,
  receipt_id text not null references receipts(id) on delete cascade,
  status qc_status not null,
  inspector_id text references users(id),
  accepted_quantity numeric(12,2),
  rejected_quantity numeric(12,2),
  remarks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);

create table if not exists inventory_items (
  id text primary key,
  pin text not null unique,
  item_id text references items(id),
  category_id text references categories(id),
  location_id text references locations(id),
  status inventory_status not null default 'available',
  quantity numeric(12,2) not null,
  linked_requirement_id text references requirements(id),
  linked_po_id text references purchase_orders(id),
  linked_receipt_id text references receipts(id),
  linked_qc_id text references qc_records(id),
  linked_phase_id text references phases(id),
  vendor_id text references vendors(id),
  parent_pin text,
  derived_pin_type recovery_type,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);

create table if not exists inventory_movements (
  id text primary key,
  inventory_item_id text not null references inventory_items(id) on delete cascade,
  movement_type text not null,
  from_location_id text references locations(id),
  to_location_id text references locations(id),
  quantity numeric(12,2) not null,
  movement_date date,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists issue_records (
  id text primary key,
  inventory_item_id text not null references inventory_items(id) on delete cascade,
  phase_id text references phases(id),
  quantity numeric(12,2) not null,
  issue_date date,
  issued_by text,
  received_by text,
  remarks text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists recovery_records (
  id text primary key,
  issue_record_id text not null references issue_records(id) on delete cascade,
  inventory_item_id text not null references inventory_items(id),
  recovery_type recovery_type not null,
  quantity numeric(12,2) not null,
  reason text,
  condition_status condition_status,
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reuse_reviews (
  id text primary key,
  recovery_record_id text not null references recovery_records(id) on delete cascade,
  suggestion text not null,
  reviewer_id text references users(id),
  decision text,
  note text,
  derived_pin text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists ai_recommendations (
  id text primary key,
  context_type text not null,
  context_id text not null,
  provider text not null,
  summary text not null,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists alerts (
  id text primary key,
  title text not null,
  severity text not null,
  module text not null,
  linked_id text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists weekly_reports (
  id text primary key,
  week_start date not null,
  week_end date not null,
  requirements_raised integer not null,
  pos_issued integer not null,
  receipts_logged integer not null,
  qc_failures integer not null,
  recovery_entries integer not null,
  narrative text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id text primary key,
  entity_type text not null,
  entity_id text not null,
  action text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by text,
  updated_by text
);
