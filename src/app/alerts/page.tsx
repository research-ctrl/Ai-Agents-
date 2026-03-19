import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { getAlerts } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export default function AlertsPage() {
  const alerts = getAlerts();
  return (
    <div className="space-y-6">
      <PageHeader title="Alerts center" description="Alert architecture exists for overdue requirements, finance bottlenecks, QC holds, and recovery follow-ups." />
      <DataTable
        headers={['Alert', 'Module', 'Severity', 'Created', 'Read', 'Message']}
        rows={alerts.map((alert) => [
          alert.title,
          alert.module,
          <StatusBadge key={alert.id} value={alert.severity} />,
          formatDate(alert.created_at),
          alert.is_read ? 'Yes' : 'No',
          alert.message,
        ])}
      />
    </div>
  );
}
