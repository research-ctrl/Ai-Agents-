import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function IssueToShipbuilderPage() {
  return (
    <ModulePage
      title="Issue to shipbuilder"
      description="Issue records capture phase, issue date, issued by, received by, and outsourced shipbuilder traceability."
      rows={generatedData.issueRecords}
      insights={[{ label: 'Issued materials', value: String(generatedData.issueRecords.length) }, { label: 'Issued by', value: 'Biplob' }, { label: 'Received by', value: 'Sawant Team' }]}
      columns={[
        { header: 'PIN', render: (row) => row.pin },
        { header: 'Phase', render: (row) => row.phase },
        { header: 'Quantity', render: (row) => row.quantity },
        { header: 'Issue date', render: (row) => row.issue_date },
        { header: 'Receiver', render: (row) => row.received_by },
      ]}
    />
  );
}
