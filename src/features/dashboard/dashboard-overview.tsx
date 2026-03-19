import Link from 'next/link';
import { AlertTriangle, Boxes, ClipboardList, FileClock, PackageCheck, ShieldAlert } from 'lucide-react';
import { AIAdvisoryCard } from '@/components/ai-advisory-card';
import { DataTable } from '@/components/data-table';
import { StatCard } from '@/components/stat-card';
import { StatusBadge } from '@/components/status-badge';
import { Timeline } from '@/components/timeline';
import { getAIRecommendations, getAlerts, getDashboardMetrics, getRequirementBundles, getWeeklyReports } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export function DashboardOverview() {
  const metrics = getDashboardMetrics();
  const requirements = getRequirementBundles().slice(0, 6);
  const alerts = getAlerts().slice(0, 5);
  const weekly = getWeeklyReports()[0];
  const aiSummary = getAIRecommendations().find((row) => row.context_type === 'dashboard');

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Open requirements" value={metrics.openRequirements} hint="Still moving through review, approval, delivery, or stock intake." icon={<ClipboardList className="h-6 w-6" />} />
        <StatCard label="Pending approvals" value={metrics.pendingApprovals} hint="Single approval authority queue needing action." icon={<FileClock className="h-6 w-6" />} />
        <StatCard label="Active POs" value={metrics.activePOs} hint="Issued orders not yet operationally closed." icon={<PackageCheck className="h-6 w-6" />} />
        <StatCard label="QC attention" value={metrics.qcAttention} hint="Partial or failed QC records requiring follow-up." icon={<ShieldAlert className="h-6 w-6" />} />
        <StatCard label="Recoverable stock" value={metrics.recoverableStock} hint="Returned balances marked not-used or leftover." icon={<Boxes className="h-6 w-6" />} />
        <StatCard label="Open alerts" value={metrics.alertsOpen} hint="Unread operational alerts across the workflow." icon={<AlertTriangle className="h-6 w-6" />} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <DataTable
          headers={['Requirement', 'Phase', 'Review', 'Approval', 'PO / Status']}
          rows={requirements.map((bundle) => [
            <div key={bundle.requirement.id}>
              <Link href={`/requirements/${bundle.requirement.id}`} className="font-semibold text-industrial-900 underline-offset-4 hover:underline">
                {bundle.requirement.item_name}
              </Link>
              <p className="text-xs text-industrial-500">Required by {formatDate(bundle.requirement.required_by_date)}</p>
            </div>,
            <span key="phase">{bundle.requirement.phase_id}</span>,
            <span key="review">{bundle.review?.decision ?? 'Pending review'}</span>,
            <StatusBadge key="approval" value={bundle.approval?.status ?? 'pending'} />,
            <div key="po" className="space-y-1">
              <span>{bundle.purchaseOrder?.po_number ?? 'Not created'}</span>
              <div>
                <StatusBadge value={bundle.requirement.status} />
              </div>
            </div>,
          ])}
        />

        <div className="space-y-6">
          <AIAdvisoryCard
            title="Material flow summary"
            summary={aiSummary?.summary ?? 'Mock advisory ready once AI route is used; the dashboard remains fully functional without AI keys.'}
            href="/ai-provider"
            mocked={!aiSummary || aiSummary.provider === 'mock'}
          />
          <Timeline
            items={alerts.map((alert) => ({
              title: alert.title,
              meta: `${alert.module} · ${formatDate(alert.created_at)}`,
              body: (
                <div className="space-y-2">
                  <StatusBadge value={alert.severity} />
                  <p>{alert.message}</p>
                </div>
              ),
            }))}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-panel">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-industrial-900">Weekly operations pulse</h3>
            <p className="text-sm text-industrial-600">Architecture exists for weekly reporting with seeded summaries and metrics.</p>
          </div>
          <Link href="/reports" className="rounded-full bg-industrial-900 px-4 py-2 text-sm font-semibold text-white">
            Open reports
          </Link>
        </div>
        {weekly ? (
          <div className="mt-5 grid gap-4 md:grid-cols-5">
            <StatCard label="Requirements" value={weekly.requirements_raised} hint={`${weekly.week_start} to ${weekly.week_end}`} />
            <StatCard label="POs issued" value={weekly.pos_issued} hint="Weekly PO output" />
            <StatCard label="Receipts" value={weekly.receipts_logged} hint="Goods received entries" />
            <StatCard label="QC failures" value={weekly.qc_failures} hint="Escalations / holds" />
            <StatCard label="Recoveries" value={weekly.recovery_entries} hint={weekly.narrative} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
