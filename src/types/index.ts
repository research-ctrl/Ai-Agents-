export type IdName = { id: string; name: string };

export type RequirementStatus =
  | 'raised'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'po_created'
  | 'in_delivery'
  | 'received'
  | 'in_inventory'
  | 'issued'
  | 'closed';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type PaymentStatus =
  | 'not_requested'
  | 'advance_requested'
  | 'under_finance_review'
  | 'advance_paid'
  | 'vendor_confirmed'
  | 'settled'
  | 'on_hold';
export type DeliveryStatus =
  | 'RFQ sent'
  | 'Quote received'
  | 'Vendor selected'
  | 'PO issued'
  | 'Advance requested'
  | 'Advance paid'
  | 'Vendor confirmed'
  | 'Dispatch pending'
  | 'Dispatched'
  | 'In transit'
  | 'Reached yard'
  | 'Received'
  | 'Under QC'
  | 'QC passed'
  | 'QC partial'
  | 'QC failed'
  | 'Closed';
export type QCStatus = 'passed' | 'partial' | 'failed';
export type InventoryStatus = 'available' | 'reserved' | 'issued' | 'recovered' | 'hold' | 'scrapped';
export type RecoveryType = 'N' | 'LF' | 'S';
export type ConditionStatus = 'good' | 'repairable' | 'damaged';
export type AIProvider = 'mock' | 'groq' | 'gemini';

export interface Role extends IdName {}
export interface User extends IdName { role_id: string }
export interface Unit extends IdName {}
export interface Category extends IdName {}
export interface Phase extends IdName {}
export interface Location extends IdName {}

export interface Vendor extends IdName {
  price_score: number;
  delivery_score: number;
  qc_rejection_rate: number;
  reliability_score: number;
  previous_performance_score: number;
  lead_time_days: number;
}

export interface Item extends IdName {
  specification: string;
  unit_id: string;
  category_id: string;
  default_vendor_id: string;
}

export interface Requirement {
  id: string;
  item_id: string;
  item_name: string;
  specification: string;
  quantity: number;
  unit_id: string;
  required_by_date: string;
  phase_id: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  note: string;
  image_path?: string | null;
  ship_name: string;
  yard_name: string;
  status: RequirementStatus;
  created_at: string;
  created_by: string;
}

export interface Review {
  id: string;
  requirement_id: string;
  reviewer_id: string;
  stock_on_hand: number;
  recovered_stock: number;
  decision: string;
  review_note: string;
}

export interface Approval {
  id: string;
  requirement_id: string;
  approver_id: string;
  status: ApprovalStatus;
  remark: string;
}

export interface VendorComparison {
  id: string;
  requirement_id: string;
  recommended_vendor_id: string;
  human_selected_vendor_id: string;
  comparison_snapshot: Array<{
    vendor_id: string;
    price_score: number;
    delivery_score: number;
    qc_rejection_rate: number;
    reliability_score: number;
    previous_performance_score: number;
  }>;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  vendor_id: string;
  requirement_id: string;
  status: string;
  payment_status: PaymentStatus;
  delivery_status: DeliveryStatus;
  po_date: string;
  expected_delivery_date: string;
  advance_percentage: number;
  created_by: string;
}

export interface PurchaseOrderItem {
  id: string;
  purchase_order_id: string;
  item_id: string;
  quantity: number;
  unit_price: number;
  currency: string;
}

export interface PaymentRequest {
  id: string;
  purchase_order_id: string;
  status: PaymentStatus;
  amount: number;
  requested_on: string;
  requested_by: string;
}

export interface PaymentTransaction {
  id: string;
  purchase_order_id: string;
  status: PaymentStatus;
  amount: number;
  transaction_date: string;
  reference_number: string;
}

export interface DeliveryEvent {
  id: string;
  purchase_order_id: string;
  status: DeliveryStatus;
  event_date: string;
  note: string;
}

export interface Receipt {
  id: string;
  purchase_order_id: string;
  received_quantity: number;
  receipt_date: string;
  challan_image_path: string;
  invoice_image_path: string;
  photo_paths: string[];
}

export interface QCRecord {
  id: string;
  receipt_id: string;
  status: QCStatus;
  inspector_id: string;
  accepted_quantity: number;
  rejected_quantity: number;
  remarks: string;
}

export interface InventoryItem {
  id: string;
  pin: string;
  item_id: string;
  category_id: string;
  location_id: string;
  status: InventoryStatus;
  quantity: number;
  linked_requirement_id?: string | null;
  linked_po_id?: string | null;
  linked_receipt_id?: string | null;
  linked_qc_id?: string | null;
  linked_phase_id?: string | null;
  vendor_id?: string | null;
  parent_pin?: string | null;
  derived_pin_type?: RecoveryType | null;
  created_at: string;
}

export interface InventoryMovement {
  id: string;
  inventory_item_id: string;
  movement_type: string;
  from_location_id?: string | null;
  to_location_id?: string | null;
  quantity: number;
  movement_date: string;
  note: string;
}

export interface IssueRecord {
  id: string;
  inventory_item_id: string;
  phase_id: string;
  quantity: number;
  issue_date: string;
  issued_by: string;
  received_by: string;
  remarks: string;
}

export interface RecoveryRecord {
  id: string;
  issue_record_id: string;
  inventory_item_id: string;
  recovery_type: RecoveryType;
  quantity: number;
  reason: string;
  condition_status: ConditionStatus;
  image_path: string;
}

export interface ReuseReview {
  id: string;
  recovery_record_id: string;
  suggestion: string;
  reviewer_id: string;
  decision: string;
  note: string;
  derived_pin: string;
}

export interface AIRecommendation {
  id: string;
  context_type: string;
  context_id: string;
  provider: AIProvider;
  summary: string;
  raw_payload: Record<string, unknown>;
}

export interface Alert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  module: string;
  linked_id: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface WeeklyReport {
  id: string;
  week_start: string;
  week_end: string;
  requirements_raised: number;
  pos_issued: number;
  receipts_logged: number;
  qc_failures: number;
  recovery_entries: number;
  narrative: string;
}

export interface AuditLog {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  payload: Record<string, unknown>;
  created_at: string;
  created_by: string;
}

export interface SeedData {
  meta: { generated_at: string; ship: string; yard: string; warehouse: string };
  roles: Role[];
  users: User[];
  units: Unit[];
  categories: Category[];
  locations: Location[];
  phases: Phase[];
  vendors: Vendor[];
  items: Item[];
  requirements: Requirement[];
  reviews: Review[];
  approvals: Approval[];
  vendor_comparisons: VendorComparison[];
  purchase_orders: PurchaseOrder[];
  purchase_order_items: PurchaseOrderItem[];
  payment_requests: PaymentRequest[];
  payment_transactions: PaymentTransaction[];
  delivery_events: DeliveryEvent[];
  receipts: Receipt[];
  qc_records: QCRecord[];
  inventory_items: InventoryItem[];
  inventory_movements: InventoryMovement[];
  issue_records: IssueRecord[];
  recovery_records: RecoveryRecord[];
  reuse_reviews: ReuseReview[];
  ai_recommendations: AIRecommendation[];
  alerts: Alert[];
  weekly_reports: WeeklyReport[];
  audit_logs: AuditLog[];
}

export interface DashboardMetrics {
  openRequirements: number;
  pendingApprovals: number;
  activePOs: number;
  qcAttention: number;
  recoverableStock: number;
  alertsOpen: number;
}

export interface RequirementBundle {
  requirement: Requirement;
  review?: Review;
  approval?: Approval;
  vendorComparison?: VendorComparison;
  purchaseOrder?: PurchaseOrder;
}

export interface PinJourney {
  inventory: InventoryItem;
  requirement?: Requirement;
  review?: Review;
  approval?: Approval;
  vendorComparison?: VendorComparison;
  purchaseOrder?: PurchaseOrder;
  paymentRequest?: PaymentRequest;
  paymentTransaction?: PaymentTransaction;
  deliveryEvents: DeliveryEvent[];
  receipt?: Receipt;
  qcRecord?: QCRecord;
  issueRecords: IssueRecord[];
  recoveryRecords: RecoveryRecord[];
  reuseReviews: ReuseReview[];
  derivedPins: InventoryItem[];
}
