import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function DeliveryTrackerPage() {
  return (
    <ModulePage
      title="Delivery tracker"
      description="RFQ through closed delivery events modeled as a traceable timeline-ready event table."
      rows={generatedData.deliveryEvents}
      insights={[{ label: 'Events', value: String(generatedData.deliveryEvents.length) }, { label: 'Reached yard', value: String(generatedData.deliveryEvents.filter((item) => item.status === 'reached_yard').length) }, { label: 'Under QC', value: String(generatedData.deliveryEvents.filter((item) => item.status === 'under_qc').length) }]}
      columns={[
        { header: 'PO', render: (row) => row.po_id },
        { header: 'Status', render: (row) => <Badge label={row.status.replace(/_/g, ' ')} tone="blue" /> },
        { header: 'Event time', render: (row) => row.event_at },
        { header: 'Owner', render: (row) => row.owner },
        { header: 'Note', render: (row) => row.note },
      ]}
    />
  );
}
