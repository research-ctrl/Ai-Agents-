import { seedData } from '@/mock';
import type {
  AIRecommendation,
  Alert,
  Approval,
  DashboardMetrics,
  DeliveryEvent,
  InventoryItem,
  Item,
  PaymentRequest,
  PaymentTransaction,
  PinJourney,
  PurchaseOrder,
  QCRecord,
  RecoveryRecord,
  Requirement,
  RequirementBundle,
  ReuseReview,
  Review,
  SeedData,
  User,
  Vendor,
  VendorComparison,
  WeeklyReport,
} from '@/types';

function byId<T extends { id: string }>(rows: T[], id?: string | null): T | undefined {
  return rows.find((row) => row.id === id);
}

export function getSeedData(): SeedData {
  return seedData;
}

export function getDashboardMetrics(): DashboardMetrics {
  const data = getSeedData();
  return {
    openRequirements: data.requirements.filter((row) => !['closed', 'issued'].includes(row.status)).length,
    pendingApprovals: data.approvals.filter((row) => row.status === 'pending').length,
    activePOs: data.purchase_orders.filter((row) => row.status !== 'closed').length,
    qcAttention: data.qc_records.filter((row) => row.status !== 'passed').length,
    recoverableStock: data.recovery_records.filter((row) => row.recovery_type !== 'S').length,
    alertsOpen: data.alerts.filter((row) => !row.is_read).length,
  };
}

export function getRequirements() {
  return getSeedData().requirements;
}

export function getRequirementBundles(): RequirementBundle[] {
  const data = getSeedData();
  return data.requirements.map((requirement) => ({
    requirement,
    review: data.reviews.find((review) => review.requirement_id === requirement.id),
    approval: data.approvals.find((approval) => approval.requirement_id === requirement.id),
    vendorComparison: data.vendor_comparisons.find((comparison) => comparison.requirement_id === requirement.id),
    purchaseOrder: data.purchase_orders.find((po) => po.requirement_id === requirement.id),
  }));
}

export function getRequirementBundle(id: string): RequirementBundle | undefined {
  return getRequirementBundles().find((bundle) => bundle.requirement.id === id);
}

export function getPurchaseOrders() {
  return getSeedData().purchase_orders.map((po) => ({
    ...po,
    vendor: byId(getSeedData().vendors, po.vendor_id),
    requirement: byId(getSeedData().requirements, po.requirement_id),
    lineItems: getSeedData().purchase_order_items.filter((item) => item.purchase_order_id === po.id),
    paymentRequest: getSeedData().payment_requests.find((request) => request.purchase_order_id === po.id),
    paymentTransaction: getSeedData().payment_transactions.find((tx) => tx.purchase_order_id === po.id),
    deliveryEvents: getSeedData().delivery_events.filter((event) => event.purchase_order_id === po.id),
  }));
}

export function getInventoryList() {
  const data = getSeedData();
  return data.inventory_items.map((inventory) => ({
    ...inventory,
    item: byId(data.items, inventory.item_id),
    category: byId(data.categories, inventory.category_id),
    location: byId(data.locations, inventory.location_id),
    vendor: byId(data.vendors, inventory.vendor_id ?? undefined),
  }));
}

export function getPinJourney(pin: string): PinJourney | undefined {
  const data = getSeedData();
  const inventory = data.inventory_items.find((row) => row.pin === pin);
  if (!inventory) return undefined;

  const requirement = byId(data.requirements, inventory.linked_requirement_id);
  const review = requirement ? data.reviews.find((row) => row.requirement_id === requirement.id) : undefined;
  const approval = requirement ? data.approvals.find((row) => row.requirement_id === requirement.id) : undefined;
  const vendorComparison = requirement
    ? data.vendor_comparisons.find((row) => row.requirement_id === requirement.id)
    : undefined;
  const purchaseOrder = byId(data.purchase_orders, inventory.linked_po_id ?? undefined);
  const paymentRequest = purchaseOrder
    ? data.payment_requests.find((row) => row.purchase_order_id === purchaseOrder.id)
    : undefined;
  const paymentTransaction = purchaseOrder
    ? data.payment_transactions.find((row) => row.purchase_order_id === purchaseOrder.id)
    : undefined;
  const deliveryEvents = purchaseOrder
    ? data.delivery_events.filter((row) => row.purchase_order_id === purchaseOrder.id)
    : [];
  const receipt = byId(data.receipts, inventory.linked_receipt_id ?? undefined);
  const qcRecord = byId(data.qc_records, inventory.linked_qc_id ?? undefined);
  const issueRecords = data.issue_records.filter((row) => row.inventory_item_id === inventory.id);
  const recoveryRecords = data.recovery_records.filter((row) => row.inventory_item_id === inventory.id);
  const reuseReviews = recoveryRecords.flatMap((record) =>
    data.reuse_reviews.filter((reviewEntry) => reviewEntry.recovery_record_id === record.id),
  );
  const derivedPins = data.inventory_items.filter((row) => row.parent_pin === inventory.pin);

  return {
    inventory,
    requirement,
    review,
    approval,
    vendorComparison,
    purchaseOrder,
    paymentRequest,
    paymentTransaction,
    deliveryEvents,
    receipt,
    qcRecord,
    issueRecords,
    recoveryRecords,
    reuseReviews,
    derivedPins,
  };
}

export function getVendors(): Vendor[] {
  return getSeedData().vendors;
}

export function getItems(): Item[] {
  return getSeedData().items;
}

export function getUsers(): User[] {
  return getSeedData().users;
}

export function getApprovals(): Approval[] {
  return getSeedData().approvals;
}

export function getPaymentRequests(): PaymentRequest[] {
  return getSeedData().payment_requests;
}

export function getPaymentTransactions(): PaymentTransaction[] {
  return getSeedData().payment_transactions;
}

export function getDeliveryEvents(): DeliveryEvent[] {
  return getSeedData().delivery_events;
}

export function getReceipts() {
  const data = getSeedData();
  return data.receipts.map((receipt) => ({
    ...receipt,
    purchaseOrder: byId(data.purchase_orders, receipt.purchase_order_id),
  }));
}

export function getQCRecords(): QCRecord[] {
  return getSeedData().qc_records;
}

export function getIssueRecords() {
  const data = getSeedData();
  return data.issue_records.map((issue) => ({
    ...issue,
    inventory: byId(data.inventory_items, issue.inventory_item_id),
  }));
}

export function getRecoveryRecords(): RecoveryRecord[] {
  return getSeedData().recovery_records;
}

export function getReuseReviews(): ReuseReview[] {
  return getSeedData().reuse_reviews;
}

export function getAlerts(): Alert[] {
  return getSeedData().alerts;
}

export function getWeeklyReports(): WeeklyReport[] {
  return getSeedData().weekly_reports;
}

export function getAIRecommendations(): AIRecommendation[] {
  return getSeedData().ai_recommendations;
}

export function getReferenceData() {
  const data = getSeedData();
  return {
    items: data.items,
    vendors: data.vendors,
    phases: data.phases,
    categories: data.categories,
    units: data.units,
    locations: data.locations,
    roles: data.roles,
    users: data.users,
  };
}
