import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { ReuseAICard } from '@/features/workflow/summary-sections';
import { getReuseReviews } from '@/lib/db';

export default function ReusePage() {
  const rows = getReuseReviews();
  return (
    <div className="space-y-6">
      <PageHeader title="Reuse review" description="Advisory reuse suggestions remain human-decided and support re-entry into inventory with derived PIN linkage." />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <DataTable
          headers={['Review', 'Recovery', 'Suggestion', 'Decision', 'Derived PIN', 'Note']}
          rows={rows.map((row) => [row.id, row.recovery_record_id, row.suggestion, row.decision, row.derived_pin, row.note])}
        />
        <ReuseAICard contextType="reuse" />
      </div>
    </div>
  );
}
