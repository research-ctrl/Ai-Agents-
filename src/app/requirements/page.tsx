import { PageHeader } from '@/components/page-header';
import { getReferenceData, getRequirements } from '@/lib/db';
import { RequirementsTable } from '@/features/workflow/summary-sections';

export default function RequirementsPage() {
  const data = getRequirements();
  const refs = getReferenceData();

  return (
    <div className="space-y-6">
      <PageHeader title="Requirements list" description="Operational list of material requests with low-input defaults, image path support, and downstream workflow links." />
      <RequirementsTable
        rows={data.map((row) => ({
          id: row.id,
          item: row.item_name,
          qty: row.quantity,
          unit: refs.units.find((unit) => unit.id === row.unit_id)?.name ?? row.unit_id,
          phase: refs.phases.find((phase) => phase.id === row.phase_id)?.name ?? row.phase_id,
          status: row.status,
          urgency: row.urgency,
          date: row.required_by_date,
        }))}
      />
    </div>
  );
}
