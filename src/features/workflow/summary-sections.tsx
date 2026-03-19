import type { ReactNode } from 'react';
import Link from 'next/link';
import { AIAdvisoryCard } from '@/components/ai-advisory-card';
import { DataTable } from '@/components/data-table';
import { StatusBadge } from '@/components/status-badge';
import { Timeline } from '@/components/timeline';
import { getAIRecommendations } from '@/lib/db';
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils';

export function RequirementsTable({ rows }: { rows: Array<{ id: string; item: string; qty: number; unit: string; phase: string; status: string; urgency: string; date: string }> }) {
  return (
    <DataTable
      headers={['Item', 'Qty', 'Phase', 'Urgency', 'Required by', 'Status']}
      rows={rows.map((row) => [
        <Link key={row.id} href={`/requirements/${row.id}`} className="font-semibold text-industrial-900 underline-offset-4 hover:underline">
          {row.item}
        </Link>,
        <span key="qty">{formatNumber(row.qty)} {row.unit}</span>,
        <span key="phase">{row.phase}</span>,
        <StatusBadge key="urgency" value={row.urgency} />,
        <span key="date">{formatDate(row.date)}</span>,
        <StatusBadge key="status" value={row.status} />,
      ])}
    />
  );
}

export function PurchaseOrderTable({ rows }: { rows: Array<{ number: ReactNode; vendor: string; amount: number; payment: string; delivery: string; date: string }> }) {
  return (
    <DataTable
      headers={['PO', 'Vendor', 'Value', 'Payment', 'Delivery', 'Expected']}
      rows={rows.map((row) => [
        row.number,
        row.vendor,
        formatCurrency(row.amount),
        <StatusBadge key="payment" value={row.payment} />,
        <StatusBadge key="delivery" value={row.delivery} />,
        formatDate(row.date),
      ])}
    />
  );
}

export function DeliveryTimeline({ rows }: { rows: Array<{ title: string; date: string; note: string }> }) {
  return <Timeline items={rows.map((row) => ({ title: row.title, meta: formatDate(row.date), body: row.note }))} />;
}

export function ReuseAICard({ contextType }: { contextType: string }) {
  const summary = getAIRecommendations().find((row) => row.context_type === contextType);
  return (
    <AIAdvisoryCard
      title="AI recommendation"
      summary={summary?.summary ?? 'Mock advisory summary available via API route; raw backend data remains visible below.'}
      href="/ai-provider"
      mocked={!summary || summary.provider === 'mock'}
    />
  );
}
