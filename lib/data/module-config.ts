import type { AppModule } from '@/lib/types/domain';

export const appModules: AppModule[] = [
  { label: 'Dashboard', href: '/', description: 'Operational KPIs, AI commentary, and exceptions.' },
  { label: 'Requirement Raise', href: '/requirements/raise', description: 'Low-input material demand capture.' },
  { label: 'Requirement Queue', href: '/requirements/queue', description: 'Review requirements before procurement.' },
  { label: 'Approval Queue', href: '/approval-queue', description: 'Single approval authority decisions.' },
  { label: 'Vendor Comparison', href: '/vendor-comparison', description: 'AI-assisted vendor mapping with human final choice.' },
  { label: 'Purchase Orders', href: '/purchase-orders', description: 'PO generation and status visibility.' },
  { label: 'Payment Tracker', href: '/payment-tracker', description: 'Advance payment lifecycle tracking.' },
  { label: 'Delivery Tracker', href: '/delivery-tracker', description: 'RFQ-to-closed delivery progress timeline.' },
  { label: 'Goods Receipt', href: '/goods-receipt', description: 'Receipt capture with challan and invoice references.' },
  { label: 'QC', href: '/qc', description: 'Pass, partial, and failed QC branches.' },
  { label: 'Inventory List', href: '/inventory', description: 'PIN-tagged inventory and locations.' },
  { label: 'Issue to Shipbuilder', href: '/issue-to-shipbuilder', description: 'Controlled issue flow to outsourced builder.' },
  { label: 'Recovery Entry', href: '/recovery-entry', description: 'Not used, leftover, and scrap capture.' },
  { label: 'Reuse Review', href: '/reuse-review', description: 'AI advisory reuse suggestions with human confirmation.' },
  { label: 'Reports', href: '/reports', description: 'Weekly metrics and executive summaries.' },
  { label: 'Alerts Center', href: '/alerts-center', description: 'Mock alert architecture for future automations.' },
  { label: 'Settings', href: '/settings', description: 'Operational defaults and architecture notes.' },
  { label: 'AI Provider', href: '/ai-provider', description: 'Choose Groq, Gemini, or mock mode.' },
];
