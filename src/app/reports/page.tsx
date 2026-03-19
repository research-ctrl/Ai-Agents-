import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { getWeeklyReports } from '@/lib/db';

export default function ReportsPage() {
  const reports = getWeeklyReports();
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Weekly reporting architecture is present with seeded operational summaries and metrics for management review." />
      <DataTable
        headers={['Week', 'Requirements', 'POs', 'Receipts', 'QC failures', 'Recoveries', 'Narrative']}
        rows={reports.map((report) => [
          `${report.week_start} → ${report.week_end}`,
          report.requirements_raised,
          report.pos_issued,
          report.receipts_logged,
          report.qc_failures,
          report.recovery_entries,
          report.narrative,
        ])}
      />
    </div>
  );
}
