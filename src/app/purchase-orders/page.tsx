import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { getPurchaseOrders } from '@/lib/db';
import { PurchaseOrderTable } from '@/features/workflow/summary-sections';

export default function PurchaseOrdersPage() {
  const rows = getPurchaseOrders().map((po) => ({
    number: <Link href={`/purchase-orders/${po.id}`} className="font-semibold text-industrial-900 underline-offset-4 hover:underline">{po.po_number}</Link>,
    vendor: po.vendor?.name ?? po.vendor_id,
    amount: po.lineItems.reduce((total, line) => total + line.quantity * line.unit_price, 0),
    payment: po.payment_status,
    delivery: po.delivery_status,
    date: po.expected_delivery_date,
  }));

  return (
    <div className="space-y-6">
      <PageHeader title="Purchase orders" description="PO list and detail-ready data including items, payment lifecycle, and delivery progression." />
      <PurchaseOrderTable rows={rows} />
    </div>
  );
}
