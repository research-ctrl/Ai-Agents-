import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function ApprovalQueuePage() {
  return (
    <ModulePage
      title="Approval queue"
      description="Single approval authority decisions with comments and strong audit visibility."
      rows={generatedData.approvals}
      insights={[{ label: 'Approvers', value: 'Lincoln / Lindsey' }, { label: 'Rejected', value: String(generatedData.approvals.filter((item) => item.status === 'rejected').length) }, { label: 'Approved', value: String(generatedData.approvals.filter((item) => item.status === 'approved').length) }]}
      columns={[
        { header: 'Requirement', render: (row) => row.requirement_id },
        { header: 'Approver', render: (row) => row.approver_id },
        { header: 'Decision', render: (row) => <Badge label={row.status} tone={row.status === 'approved' ? 'green' : 'red'} /> },
        { header: 'Comment', render: (row) => row.comment },
        { header: 'Time', render: (row) => row.created_at },
      ]}
    />
  );
}
