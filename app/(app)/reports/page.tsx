import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function ReportsPage() {
  return (
    <ModulePage
      title="Reports"
      description="Architecture supports weekly reporting now, with seeded summaries demonstrating trend-ready rollups."
      rows={generatedData.weeklyReports}
      insights={[{ label: 'Weekly report rows', value: String(generatedData.weeklyReports.length) }, { label: 'Seeded alerts', value: String(generatedData.alerts.length) }, { label: 'Reporting basis', value: 'Requirement → PO → Receipt → Recovery' }]}
      columns={[
        { header: 'Week start', render: (row) => row.week_start },
        { header: 'Week end', render: (row) => row.week_end },
        { header: 'Requirements', render: (row) => row.requirements_raised },
        { header: 'POs', render: (row) => row.pos_created },
        { header: 'Receipts', render: (row) => row.receipts_completed },
        { header: 'Narrative', render: (row) => row.narrative },
      ]}
    />
  );
}
