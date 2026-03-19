import { PageHeader } from '@/components/page-header';
import { getPurchaseOrders } from '@/lib/db';
import { DeliveryTimeline } from '@/features/workflow/summary-sections';

export default function DeliveryPage() {
  const po = getPurchaseOrders()[0];
  return (
    <div className="space-y-6">
      <PageHeader title="Delivery tracker" description="Track RFQ through dispatch, in-transit progress, yard arrival, receipt, QC, and closure." />
      {po ? <DeliveryTimeline rows={po.deliveryEvents.map((event) => ({ title: `${po.po_number} · ${event.status}`, date: event.event_date, note: event.note }))} /> : null}
    </div>
  );
}
