export type RequirementStatus =
  | 'raised'
  | 'procurement_review'
  | 'approved'
  | 'vendor_mapping'
  | 'po_created'
  | 'advance_requested'
  | 'in_delivery'
  | 'received'
  | 'qc_completed'
  | 'issued'
  | 'closed'
  | 'rejected';

export type POStatus = 'draft' | 'issued' | 'partially_received' | 'closed' | 'cancelled';
export type PaymentStatus =
  | 'not_requested'
  | 'advance_requested'
  | 'under_finance_review'
  | 'advance_paid'
  | 'vendor_confirmed'
  | 'settled'
  | 'on_hold';
export type DeliveryStatus =
  | 'rfq_sent'
  | 'quote_received'
  | 'vendor_selected'
  | 'po_issued'
  | 'advance_requested'
  | 'advance_paid'
  | 'vendor_confirmed'
  | 'dispatch_pending'
  | 'dispatched'
  | 'in_transit'
  | 'reached_yard'
  | 'received'
  | 'under_qc'
  | 'qc_passed'
  | 'qc_partial'
  | 'qc_failed'
  | 'closed';
export type QCStatus = 'passed' | 'partial_pass' | 'failed';
export type InventoryStatus = 'available' | 'reserved' | 'issued' | 'hold';
export type RecoveryType = 'not_used' | 'leftover' | 'scrap';
export type ConditionStatus = 'good' | 'repairable' | 'damaged';
export type AIProvider = 'mock' | 'groq' | 'gemini';

export type AppModule = {
  label: string;
  href: string;
  description: string;
};
