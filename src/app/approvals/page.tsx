import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { getApprovals, getRequirements } from '@/lib/db';

export default function ApprovalsPage() {
  const approvals = getApprovals();
  const requirements = getRequirements();
  return (
    <div className="space-y-6">
      <PageHeader title="Approvals queue" description="Single-authority approval board with linked requirement context and status visibility." />
      <DataTable
        headers={['Requirement', 'Approver', 'Decision', 'Remark']}
        rows={approvals.map((approval) => [
          requirements.find((req) => req.id === approval.requirement_id)?.item_name ?? approval.requirement_id,
          approval.approver_id,
          <StatusBadge key={approval.id} value={approval.status} />,
          approval.remark,
        ])}
      />
    </div>
  );
}
