import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { StatCard } from '@/components/ui/stat-card';
import { Timeline } from '@/components/ui/timeline';
import { getAppData, getDashboardMetrics } from '@/lib/data/app-data';

export function DashboardPage() {
  const data = getAppData();
  const metrics = getDashboardMetrics();
  const commentary = data.aiRecommendations.filter((item) => item.context_type === 'vendor_mapping').slice(0, 3);
  const upcoming = data.requirements.slice(0, 5);
  const timelineItems = data.deliveryEvents.slice(-8).map((event) => ({
    title: event.status.replace(/_/g, ' '),
    meta: `${event.event_at} · ${event.owner}`,
    note: event.note,
  }));

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Open requirements" value={metrics.requirementsOpen} helper="Requests still moving through review, PO, receipt, or issue." />
        <StatCard label="Active purchase orders" value={metrics.activePOs} helper="Advance-driven procurement commitments currently in flow." />
        <StatCard label="Inventory PIN records" value={metrics.inventoryPins} helper="Original and derived PINs with parent-child traceability." />
        <StatCard label="Open alerts" value={metrics.alertsOpen} helper="Mock alert architecture ready for automation rules." />
        <StatCard label="Reuse-ready recoveries" value={metrics.recoveriesQueued} helper="Recovered items pending or approved for reuse decisions." />
        <StatCard label="Pending approvals" value={metrics.pendingApprovals} helper="Single-authority approval decisions recorded in the dataset." />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader
            eyebrow="Workflow analysis"
            title="Prototype workflow summary"
            description="Requirement raise → procurement review → approval → vendor mapping → PO → advance payment → delivery → receipt → QC → inventory intake → issue → recovery → AI reuse suggestion → re-entry."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">Primary entities</h3>
              <p className="mt-2 text-sm text-slate-400">Requirements, vendor comparisons, purchase orders, payments, delivery events, receipts, QC, inventory PINs, issue records, recoveries, reuse reviews, alerts, and weekly reports.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">State transitions</h3>
              <p className="mt-2 text-sm text-slate-400">Requirement and PO states move linearly, but QC and recovery branch the process into hold, replacement, or reusable inventory routes.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">AI advisory touchpoints</h3>
              <p className="mt-2 text-sm text-slate-400">Vendor mapping, recovery reuse, dashboard commentary, and PIN narrative summaries use provider-abstracted advisory responses.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">Architecture recommendation</h3>
              <p className="mt-2 text-sm text-slate-400">Next.js App Router provides route-based modules, server-safe data access boundaries, and an easy path to Supabase-backed APIs later.</p>
            </div>
          </div>
        </Card>
        <Timeline title="Latest delivery milestones" items={timelineItems} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DataTable
          title="Upcoming requirements"
          description="Operational queue with prefilled ship, yard, and owner defaults."
          rows={upcoming}
          columns={[
            {
              header: 'Request',
              render: (row) => (
                <div>
                  <div className="font-medium text-white">{row.request_no}</div>
                  <div className="text-slate-400">{row.item_name}</div>
                </div>
              ),
            },
            { header: 'Phase', render: (row) => row.phase },
            { header: 'Req. By', render: (row) => row.required_by_date },
            {
              header: 'Status',
              render: (row) => <Badge label={row.status.replace(/_/g, ' ')} tone="blue" />,
            },
          ]}
        />
        <Card>
          <CardHeader
            eyebrow="AI-ready foundation"
            title="Advisory cards"
            description="All AI output is explicitly labeled as advisory and never acts as the final decision maker."
          />
          <div className="mt-6 space-y-4">
            {commentary.map((item) => (
              <div key={item.id} className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
                <div className="flex items-center justify-between">
                  <Badge label={item.provider} tone="blue" />
                  <span className="text-xs text-slate-400">Confidence {item.confidence_score}</span>
                </div>
                <p className="mt-3 text-sm text-slate-100">{item.summary}</p>
              </div>
            ))}
            <Link href="/inventory/pin/PIN-26-5001" className="inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5">
              Open PIN journey example
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
