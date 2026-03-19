import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { getRecoveryRecords } from '@/lib/db';

export default function RecoveryPage() {
  const rows = getRecoveryRecords();
  return (
    <div className="space-y-6">
      <PageHeader title="Recovery entry" description="Returned balances are classified as N, LF, or S with quantity, reason, condition, image reference, and parent issue linkage." />
      <DataTable
        headers={['Recovery', 'Issue', 'Type', 'Qty', 'Condition', 'Image', 'Reason']}
        rows={rows.map((row) => [
          row.id,
          row.issue_record_id,
          <StatusBadge key={row.id} value={row.recovery_type} />,
          row.quantity,
          row.condition_status,
          row.image_path,
          row.reason,
        ])}
      />
    </div>
  );
}
