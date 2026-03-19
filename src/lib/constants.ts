import type { AIProvider, DeliveryStatus, PaymentStatus, RequirementStatus } from '@/types';

export const APP_NAME = 'Shipyard Material Control System';
export const PREFILLED_SHIP = 'MV Horizon Pioneer';
export const PREFILLED_YARD = 'Haldia Leased Yard';
export const STORAGE_BUCKET = 'material-control-images';

export const requirementStatuses: RequirementStatus[] = [
  'raised',
  'under_review',
  'approved',
  'rejected',
  'po_created',
  'in_delivery',
  'received',
  'in_inventory',
  'issued',
  'closed',
];

export const paymentStatuses: PaymentStatus[] = [
  'not_requested',
  'advance_requested',
  'under_finance_review',
  'advance_paid',
  'vendor_confirmed',
  'settled',
  'on_hold',
];

export const deliveryStatuses: DeliveryStatus[] = [
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
  'Closed',
];

export const aiProviders: { value: AIProvider; label: string; keyVar?: string }[] = [
  { value: 'mock', label: 'Mock fallback' },
  { value: 'groq', label: 'Groq', keyVar: 'GROQ_API_KEY' },
  { value: 'gemini', label: 'Gemini', keyVar: 'GEMINI_API_KEY' },
];

export const workflowSteps = [
  'Requirement Raise',
  'Procurement Review',
  'Approval',
  'Vendor Mapping',
  'PO Creation',
  'Advance Payment',
  'Delivery Tracking',
  'Goods Receipt',
  'QC',
  'Inventory Intake',
  'Issue to Shipbuilder',
  'Returned Balance Classification',
  'Reuse Suggestion',
  'Re-entry into Inventory',
];
