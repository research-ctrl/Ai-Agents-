import { generatedData } from '@/lib/mock/generated-data';

export function getAppData() {
  return generatedData;
}

export function getDashboardMetrics() {
  const data = getAppData();
  return {
    requirementsOpen: data.requirements.filter((item) => item.status !== 'closed').length,
    pendingApprovals: data.approvals.filter((item) => item.status === 'approved').length,
    activePOs: data.purchaseOrders.filter((item) => item.status !== 'closed').length,
    inventoryPins: data.inventoryItems.length,
    alertsOpen: data.alerts.filter((item) => item.status !== 'closed').length,
    recoveriesQueued: data.reuseReviews.filter((item) => item.human_decision === 'reuse').length,
  };
}

export function getPinJourney(pin: string) {
  const data = getAppData();
  const inventory = data.inventoryItems.find((item) => item.pin === pin);
  if (!inventory) return null;

  const requirement = data.requirements.find((item) => item.id === inventory.linked_requirement_id);
  const review = data.reviews.find((item) => item.requirement_id === inventory.linked_requirement_id);
  const approval = data.approvals.find((item) => item.requirement_id === inventory.linked_requirement_id);
  const po = data.purchaseOrders.find((item) => item.id === inventory.linked_po_id);
  const payment = data.paymentRequests.find((item) => item.po_id === po?.id);
  const receipt = data.receipts.find((item) => item.id === inventory.linked_receipt_id);
  const qc = data.qcRecords.find((item) => item.id === inventory.linked_qc_id);
  const issue = data.issueRecords.find((item) => item.pin === pin);
  const recovery = data.recoveryRecords.filter((item) => item.issue_record_id === issue?.id);
  const derivedPins = data.inventoryItems.filter((item) => item.parent_pin === pin);
  const reuse = recovery.map((item) => data.reuseReviews.find((reviewItem) => reviewItem.recovery_record_id === item.id)).filter(Boolean);

  return {
    inventory,
    requirement,
    review,
    approval,
    po,
    payment,
    receipt,
    qc,
    issue,
    recovery,
    reuse,
    derivedPins,
  };
}
