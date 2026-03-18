import { Badge } from '@/components/ui/badge';
import { ModulePage, procurementInsights } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function RequirementQueuePage() {
  return (
    <ModulePage
      title="Requirement queue"
      description="Procurement validates demand, checks stock, and considers reusable balances before buying."
      rows={generatedData.requirements}
      insights={procurementInsights}
      columns={[
        { header: 'Request', render: (row) => row.request_no },
        { header: 'Item', render: (row) => row.item_name },
        { header: 'Phase', render: (row) => row.phase },
        { header: 'Urgency', render: (row) => <Badge label={row.urgency} tone={row.urgency === 'Critical' ? 'red' : row.urgency === 'High' ? 'amber' : 'green'} /> },
        { header: 'Status', render: (row) => <Badge label={row.status.replace(/_/g, ' ')} tone="blue" /> },
      ]}
    />
  );
}
