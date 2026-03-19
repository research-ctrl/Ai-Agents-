import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { getIssueRecords, getReferenceData } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export default function IssuesPage() {
  const issues = getIssueRecords();
  const refs = getReferenceData();
  return (
    <div className="space-y-6">
      <PageHeader title="Issue to shipbuilder" description="Track issue phase, quantity, issue date, issued by, received by, and remarks for operational consumption." />
      <DataTable
        headers={['Issue', 'PIN', 'Phase', 'Qty', 'Issued', 'Received by', 'Remarks']}
        rows={issues.map((issue) => [
          issue.id,
          issue.inventory?.pin ?? issue.inventory_item_id,
          refs.phases.find((phase) => phase.id === issue.phase_id)?.name ?? issue.phase_id,
          issue.quantity,
          `${formatDate(issue.issue_date)} · ${issue.issued_by}`,
          issue.received_by,
          issue.remarks,
        ])}
      />
    </div>
  );
}
