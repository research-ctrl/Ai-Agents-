import { notFound } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { Timeline } from '@/components/timeline';
import { getPurchaseOrders } from '@/lib/db';
import { formatCurrency, formatDate } from '@/lib/utils';

export default async function PurchaseOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const po = getPurchaseOrders().find((entry) => entry.id === id);
  if (!po) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={`PO detail · ${po.po_number}`} description="Detailed procurement, advance payment, and delivery tracking view for the selected purchase order." />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl bg-white p-6 shadow-panel">
          <dl className="grid gap-4 md:grid-cols-2">
            <div><dt className="text-xs uppercase text-industrial-500">Vendor</dt><dd className="mt-1 text-sm text-industrial-900">{po.vendor?.name ?? po.vendor_id}</dd></div>
            <div><dt className="text-xs uppercase text-industrial-500">PO date</dt><dd className="mt-1 text-sm text-industrial-900">{formatDate(po.po_date)}</dd></div>
            <div><dt className="text-xs uppercase text-industrial-500">Expected delivery</dt><dd className="mt-1 text-sm text-industrial-900">{formatDate(po.expected_delivery_date)}</dd></div>
            <div><dt className="text-xs uppercase text-industrial-500">Advance</dt><dd className="mt-1 text-sm text-industrial-900">{po.advance_percentage}%</dd></div>
          </dl>
          <div className="mt-6 rounded-2xl bg-industrial-50 p-4 text-sm text-industrial-700">
            Payment request: {po.paymentRequest ? `${formatCurrency(po.paymentRequest.amount)} · ${po.paymentRequest.status}` : 'Not logged'}
            <br />
            Payment transaction: {po.paymentTransaction ? `${formatCurrency(po.paymentTransaction.amount)} · ${po.paymentTransaction.reference_number}` : 'Pending'}
          </div>
        </div>
        <Timeline items={po.deliveryEvents.map((event) => ({ title: event.status, meta: formatDate(event.event_date), body: event.note }))} />
      </div>
      <DataTable
        headers={['Item', 'Qty', 'Unit price', 'Currency', 'Line total']}
        rows={po.lineItems.map((line) => [
          line.item_id,
          line.quantity,
          formatCurrency(line.unit_price),
          line.currency,
          formatCurrency(line.quantity * line.unit_price),
        ])}
      />
    </div>
  );
}
