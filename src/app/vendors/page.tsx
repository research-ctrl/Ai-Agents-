import { PageHeader } from '@/components/page-header';
import { DataTable } from '@/components/data-table';
import { ReuseAICard } from '@/features/workflow/summary-sections';
import { getReferenceData, getSeedData } from '@/lib/db';

export default function VendorsPage() {
  const data = getSeedData();
  const refs = getReferenceData();
  return (
    <div className="space-y-6">
      <PageHeader title="Vendor comparison" description="Price, speed, QC rejection history, reliability, and prior performance are shown together. AI remains advisory only." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <DataTable
          headers={['Requirement', 'Vendor', 'Price', 'Delivery', 'QC reject %', 'Reliability', 'Chosen']}
          rows={data.vendor_comparisons.flatMap((comparison) =>
            comparison.comparison_snapshot.map((entry, index) => [
              index === 0 ? data.requirements.find((req) => req.id === comparison.requirement_id)?.item_name ?? comparison.requirement_id : '',
              refs.vendors.find((vendor) => vendor.id === entry.vendor_id)?.name ?? entry.vendor_id,
              entry.price_score,
              entry.delivery_score,
              entry.qc_rejection_rate,
              entry.reliability_score,
              comparison.human_selected_vendor_id === entry.vendor_id ? 'Yes' : '—',
            ]),
          )}
        />
        <ReuseAICard contextType="vendor" />
      </div>
    </div>
  );
}
