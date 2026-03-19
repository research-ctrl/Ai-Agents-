import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Timeline } from '@/components/timeline';
import { getPinJourney, getRequirementBundle, getSeedData } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { ReuseAICard } from '@/features/workflow/summary-sections';

export default async function RequirementDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bundle = getRequirementBundle(id);
  if (!bundle) notFound();
  const data = getSeedData();
  const linkedInventory = data.inventory_items.find((item) => item.linked_requirement_id === id);
  const journey = linkedInventory ? getPinJourney(linkedInventory.pin) : undefined;

  return (
    <div className="space-y-6">
      <PageHeader title={`Requirement ${bundle.requirement.id}`} description="Full detail view across review, approval, sourcing, fulfillment, and linked PIN journey." />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl bg-white p-6 shadow-panel">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold text-industrial-900">{bundle.requirement.item_name}</h2>
            <StatusBadge value={bundle.requirement.status} />
            <StatusBadge value={bundle.requirement.urgency} />
          </div>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            <div><dt className="text-xs uppercase text-industrial-500">Specification</dt><dd className="mt-1 text-sm text-industrial-800">{bundle.requirement.specification}</dd></div>
            <div><dt className="text-xs uppercase text-industrial-500">Required by</dt><dd className="mt-1 text-sm text-industrial-800">{formatDate(bundle.requirement.required_by_date)}</dd></div>
            <div><dt className="text-xs uppercase text-industrial-500">Ship / Yard</dt><dd className="mt-1 text-sm text-industrial-800">{bundle.requirement.ship_name} · {bundle.requirement.yard_name}</dd></div>
            <div><dt className="text-xs uppercase text-industrial-500">Image path</dt><dd className="mt-1 text-sm text-industrial-800">{bundle.requirement.image_path ?? 'No attachment'}</dd></div>
          </dl>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-industrial-50 p-4">
              <p className="text-xs uppercase text-industrial-500">Procurement review</p>
              <p className="mt-2 text-sm text-industrial-800">{bundle.review?.review_note}</p>
              <p className="mt-2 text-sm font-semibold text-industrial-900">Decision: {bundle.review?.decision ?? 'Pending'}</p>
            </div>
            <div className="rounded-2xl bg-industrial-50 p-4">
              <p className="text-xs uppercase text-industrial-500">Approval</p>
              <div className="mt-2"><StatusBadge value={bundle.approval?.status ?? 'pending'} /></div>
              <p className="mt-2 text-sm text-industrial-800">{bundle.approval?.remark ?? 'Awaiting approval remark.'}</p>
            </div>
          </div>
        </div>
        <ReuseAICard contextType="vendor" />
      </div>
      <Timeline
        items={[
          { title: 'Requirement raised', meta: formatDate(bundle.requirement.created_at), body: bundle.requirement.note },
          { title: 'Procurement review', body: bundle.review?.decision ?? 'Pending' },
          { title: 'Approval', body: bundle.approval?.status ?? 'Pending' },
          { title: 'Vendor mapping', body: bundle.vendorComparison?.human_selected_vendor_id ?? 'Awaiting vendor comparison' },
          { title: 'PO creation', body: bundle.purchaseOrder?.po_number ?? 'Not yet created' },
          { title: 'PIN journey', body: journey ? `Linked inventory PIN ${journey.inventory.pin} with ${journey.derivedPins.length} derived PIN(s).` : 'No inventory intake yet.' },
        ]}
      />
    </div>
  );
}
