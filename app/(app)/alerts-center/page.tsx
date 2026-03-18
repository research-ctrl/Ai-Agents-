import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function AlertsCenterPage() {
  return (
    <ModulePage
      title="Alerts center"
      description="Alert architecture is mocked but wired for payment, delivery, QC, inventory, and reuse signals."
      rows={generatedData.alerts}
      insights={[{ label: 'Alerts', value: String(generatedData.alerts.length) }, { label: 'High severity', value: String(generatedData.alerts.filter((item) => item.severity === 'high').length) }, { label: 'Open', value: String(generatedData.alerts.filter((item) => item.status === 'open').length) }]}
      columns={[
        { header: 'Type', render: (row) => row.type },
        { header: 'Severity', render: (row) => <Badge label={row.severity} tone={row.severity === 'high' ? 'red' : row.severity === 'medium' ? 'amber' : 'green'} /> },
        { header: 'Title', render: (row) => row.title },
        { header: 'Status', render: (row) => row.status },
        { header: 'Created', render: (row) => row.created_at },
      ]}
    />
  );
}
