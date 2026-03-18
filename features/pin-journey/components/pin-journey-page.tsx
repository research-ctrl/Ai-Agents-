import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { Timeline } from '@/components/ui/timeline';
import { getPinJourney } from '@/lib/data/app-data';

export function PinJourneyPage({ pin }: { pin: string }) {
  const journey = getPinJourney(pin);
  if (!journey) notFound();
  const resolvedJourney = journey;

  const timeline = [
    resolvedJourney.requirement && { title: `Requirement ${resolvedJourney.requirement.request_no}`, meta: `${resolvedJourney.requirement.created_at} · Raised by ${resolvedJourney.requirement.created_by}` },
    resolvedJourney.review && { title: 'Procurement review', meta: `${resolvedJourney.review.created_at} · ${resolvedJourney.review.decision}`, note: resolvedJourney.review.comment },
    resolvedJourney.approval && { title: 'Approval', meta: `${resolvedJourney.approval.created_at} · ${resolvedJourney.approval.status}`, note: resolvedJourney.approval.comment },
    resolvedJourney.po && { title: `PO ${resolvedJourney.po.po_no}`, meta: `${resolvedJourney.po.created_at} · ${resolvedJourney.po.status}` },
    resolvedJourney.payment && { title: 'Advance payment', meta: `${resolvedJourney.payment.created_at} · ${resolvedJourney.payment.status}` },
    resolvedJourney.receipt && { title: `Receipt ${resolvedJourney.receipt.receipt_no}`, meta: `${resolvedJourney.receipt.received_at} · ${resolvedJourney.receipt.received_by}` },
    resolvedJourney.qc && { title: 'QC record', meta: `${resolvedJourney.qc.created_at} · ${resolvedJourney.qc.status}`, note: resolvedJourney.qc.remarks },
    resolvedJourney.issue && { title: 'Issue to shipbuilder', meta: `${resolvedJourney.issue.issue_date} · ${resolvedJourney.issue.received_by}` },
    ...resolvedJourney.recovery.map((item) => ({ title: `Recovery ${item.recovery_pin}`, meta: `${item.created_at} · ${item.recovery_type}`, note: item.reason })),
  ].filter(Boolean) as { title: string; meta: string; note?: string }[];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          eyebrow="Part 1 · Workflow analysis"
          title={`PIN journey · ${resolvedJourney.inventory.pin}`}
          description="Complete traceability from requirement raise to potential derived PINs."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Info label="Item" value={resolvedJourney.inventory.item_name} />
          <Info label="Location" value={resolvedJourney.inventory.location} />
          <Info label="Status" value={resolvedJourney.inventory.status} />
          <Info label="Phase" value={resolvedJourney.inventory.phase} />
        </div>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Timeline title="PIN lifecycle" items={timeline} />
        <Card>
          <CardHeader title="Connected records" description="Every major workflow entity is linked with IDs for audit and future multi-ship scaling." />
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <Row label="Requirement" value={resolvedJourney.requirement?.request_no ?? '—'} />
            <Row label="Review decision" value={resolvedJourney.review?.decision ?? '—'} />
            <Row label="Approver" value={resolvedJourney.approval?.approver_id ?? '—'} />
            <Row label="PO" value={resolvedJourney.po?.po_no ?? '—'} />
            <Row label="Payment status" value={resolvedJourney.payment?.status ?? '—'} />
            <Row label="Receipt" value={resolvedJourney.receipt?.receipt_no ?? '—'} />
            <Row label="QC" value={resolvedJourney.qc?.status ?? '—'} />
            <div>
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Derived PINs</div>
              <div className="flex flex-wrap gap-2">
                {resolvedJourney.derivedPins.length ? resolvedJourney.derivedPins.map((item) => <Badge key={item.pin} label={item.pin} tone="green" />) : <span className="text-slate-500">No derived PINs</span>}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-medium text-white">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  );
}
