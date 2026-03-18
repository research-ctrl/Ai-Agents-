import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function PaymentTrackerPage() {
  return (
    <ModulePage
      title="Payment tracker"
      description="Advance payment always happens before delivery. Finance lifecycle is modeled with explicit statuses."
      rows={generatedData.paymentRequests}
      insights={[{ label: 'Requests', value: String(generatedData.paymentRequests.length) }, { label: 'Under finance review', value: String(generatedData.paymentRequests.filter((item) => item.status === 'under_finance_review').length) }, { label: 'Advance paid', value: String(generatedData.paymentRequests.filter((item) => item.status === 'advance_paid').length) }]}
      columns={[
        { header: 'PO', render: (row) => row.po_id },
        { header: 'Requested amount', render: (row) => `$${row.requested_amount.toLocaleString()}` },
        { header: 'Requester', render: (row) => row.requested_by },
        { header: 'Finance owner', render: (row) => row.finance_owner },
        { header: 'Status', render: (row) => <Badge label={row.status.replace(/_/g, ' ')} tone="amber" /> },
      ]}
    />
  );
}
