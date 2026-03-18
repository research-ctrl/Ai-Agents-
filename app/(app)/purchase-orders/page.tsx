import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function PurchaseOrdersPage() {
  return (
    <ModulePage
      title="Purchase orders"
      description="PO creation aligns requirement, vendor, phase, and advance payment readiness."
      rows={generatedData.purchaseOrders}
      insights={[{ label: 'POs created', value: String(generatedData.purchaseOrders.length) }, { label: 'Issued', value: String(generatedData.purchaseOrders.filter((item) => item.status === 'issued').length) }, { label: 'Closed', value: String(generatedData.purchaseOrders.filter((item) => item.status === 'closed').length) }]}
      columns={[
        { header: 'PO', render: (row) => row.po_no },
        { header: 'Requirement', render: (row) => row.requirement_id },
        { header: 'Vendor', render: (row) => row.vendor_id },
        { header: 'Advance %', render: (row) => `${row.advance_percentage}%` },
        { header: 'Total', render: (row) => `$${row.total_amount.toLocaleString()}` },
        { header: 'Status', render: (row) => <Badge label={row.status.replace(/_/g, ' ')} tone="green" /> },
      ]}
    />
  );
}
