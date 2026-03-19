import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Timeline } from '@/components/timeline';
import { getPinJourney } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { ReuseAICard } from '@/features/workflow/summary-sections';

export default async function InventoryDetailPage({ params }: { params: Promise<{ pin: string }> }) {
  const { pin } = await params;
  const journey = getPinJourney(decodeURIComponent(pin));
  if (!journey) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={`PIN Journey · ${journey.inventory.pin}`} description="End-to-end traceability from request, sourcing, payment, receipt, QC, inventory intake, issue, recovery, reuse, and derived PIN lineage." />
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Timeline
          items={[
            { title: 'Requirement', meta: journey.requirement?.id, body: journey.requirement?.item_name },
            { title: 'Procurement review', body: journey.review?.decision ?? 'No review linked' },
            { title: 'Approval', body: <StatusBadge value={journey.approval?.status ?? 'pending'} /> },
            { title: 'Vendor mapping', body: journey.vendorComparison?.human_selected_vendor_id ?? 'No vendor mapping linked' },
            { title: 'PO', body: journey.purchaseOrder?.po_number ?? 'No PO linked' },
            { title: 'Payment', body: journey.paymentTransaction?.status ?? journey.paymentRequest?.status ?? 'No payment record' },
            { title: 'Delivery events', body: `${journey.deliveryEvents.length} events recorded` },
            { title: 'Receipt', body: journey.receipt ? `${journey.receipt.id} on ${formatDate(journey.receipt.receipt_date)}` : 'No receipt linked' },
            { title: 'QC', body: journey.qcRecord ? <StatusBadge value={journey.qcRecord.status} /> : 'No QC linked' },
            { title: 'Issue to shipbuilder', body: `${journey.issueRecords.length} issue record(s)` },
            { title: 'Recovery', body: `${journey.recoveryRecords.length} recovery record(s)` },
            { title: 'Derived PINs', body: journey.derivedPins.length ? journey.derivedPins.map((pinRow) => pinRow.pin).join(', ') : 'No derived PINs' },
          ]}
        />
        <ReuseAICard contextType="pin_journey" />
      </div>
    </div>
  );
}
