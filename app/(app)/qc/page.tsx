import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function QCPage() {
  return (
    <ModulePage
      title="QC"
      description="Pass, fail, and partial pass routing with accepted and rejected quantities for hold, return, or replacement decisions."
      rows={generatedData.qcRecords}
      insights={[{ label: 'QC records', value: String(generatedData.qcRecords.length) }, { label: 'Failed', value: String(generatedData.qcRecords.filter((item) => item.status === 'failed').length) }, { label: 'Partial pass', value: String(generatedData.qcRecords.filter((item) => item.status === 'partial_pass').length) }]}
      columns={[
        { header: 'Receipt', render: (row) => row.receipt_id },
        { header: 'Status', render: (row) => <Badge label={row.status.replace(/_/g, ' ')} tone={row.status === 'passed' ? 'green' : row.status === 'failed' ? 'red' : 'amber'} /> },
        { header: 'Accepted qty', render: (row) => row.accepted_quantity },
        { header: 'Rejected qty', render: (row) => row.rejected_quantity },
        { header: 'Remarks', render: (row) => row.remarks },
      ]}
    />
  );
}
