import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { getQCRecords, getReceipts } from '@/lib/db';

export default function QCPage() {
  const qcs = getQCRecords();
  const receipts = getReceipts();
  return (
    <div className="space-y-6">
      <PageHeader title="QC" description="Pass, partial, and fail handling remains linked to receipt records for hold, replacement, or return flow." />
      <DataTable
        headers={['QC', 'Receipt / PO', 'Inspector', 'Accepted', 'Rejected', 'Status', 'Remarks']}
        rows={qcs.map((qc) => {
          const receipt = receipts.find((entry) => entry.id === qc.receipt_id);
          return [
            qc.id,
            `${receipt?.id ?? qc.receipt_id} / ${receipt?.purchaseOrder?.po_number ?? '—'}`,
            qc.inspector_id,
            qc.accepted_quantity,
            qc.rejected_quantity,
            <StatusBadge key={qc.id} value={qc.status} />,
            qc.remarks,
          ];
        })}
      />
    </div>
  );
}
