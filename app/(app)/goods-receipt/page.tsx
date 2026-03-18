import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function GoodsReceiptPage() {
  return (
    <ModulePage
      title="Goods receipt"
      description="Receipt capture supports challan, invoice, quantity, and storage image references in Supabase Storage."
      rows={generatedData.receipts}
      insights={[{ label: 'Receipts', value: String(generatedData.receipts.length) }, { label: 'Image-backed', value: String(generatedData.receipts.filter((item) => item.challan_image_path).length) }, { label: 'Receiving owner', value: 'Biplob' }]}
      columns={[
        { header: 'Receipt', render: (row) => row.receipt_no },
        { header: 'PO', render: (row) => row.po_id },
        { header: 'Quantity', render: (row) => row.received_quantity },
        { header: 'Challan image', render: (row) => row.challan_image_path },
        { header: 'Invoice image', render: (row) => row.invoice_image_path },
      ]}
    />
  );
}
