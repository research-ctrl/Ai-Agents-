import { PageHeader } from '@/components/page-header';
import { DashboardOverview } from '@/features/dashboard/dashboard-overview';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Operational dashboard"
        description="Live prototype view across requirement raise, procurement, approval, delivery, receipt, QC, inventory, issue, recovery, alerts, weekly reporting, and PIN traceability."
      />
      <DashboardOverview />
    </div>
  );
}
