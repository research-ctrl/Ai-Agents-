import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { getReceipts } from '@/lib/db';
import { formatDate, formatNumber } from '@/lib/utils';

export default function GoodsReceiptPage() {
  const receipts = getReceipts();
  return (
    <div className="space-y-6">
      <PageHeader title="Goods receipt" description="Receipt logging with challan, invoice, receipt photos, and linked PO context for yard intake." />
      <DataTable
        headers={['Receipt', 'PO', 'Quantity', 'Date', 'Document refs', 'Photos']}
        rows={receipts.map((receipt) => [
          receipt.id,
          receipt.purchaseOrder?.po_number ?? receipt.purchase_order_id,
          formatNumber(receipt.received_quantity),
          formatDate(receipt.receipt_date),
          `${receipt.challan_image_path} / ${receipt.invoice_image_path}`,
          receipt.photo_paths.join(', '),
        ])}
      />
    </div>
  );
}
