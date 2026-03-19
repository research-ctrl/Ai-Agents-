import { cn } from '@/lib/utils';

const tones: Record<string, string> = {
  raised: 'bg-sky-100 text-sky-800',
  under_review: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-rose-100 text-rose-800',
  po_created: 'bg-indigo-100 text-indigo-800',
  in_delivery: 'bg-violet-100 text-violet-800',
  received: 'bg-cyan-100 text-cyan-800',
  in_inventory: 'bg-lime-100 text-lime-800',
  issued: 'bg-orange-100 text-orange-800',
  closed: 'bg-slate-200 text-slate-700',
  pending: 'bg-amber-100 text-amber-800',
  partial: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-rose-100 text-rose-800',
  passed: 'bg-emerald-100 text-emerald-800',
  low: 'bg-slate-100 text-slate-700',
  medium: 'bg-sky-100 text-sky-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-rose-100 text-rose-800',
  available: 'bg-emerald-100 text-emerald-800',
  reserved: 'bg-indigo-100 text-indigo-800',
  recovered: 'bg-cyan-100 text-cyan-800',
  hold: 'bg-amber-100 text-amber-800',
  scrapped: 'bg-slate-200 text-slate-700',
};

export function StatusBadge({ value }: { value: string }) {
  const key = value.toLowerCase().replace(/\s+/g, '_');
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-semibold', tones[key] ?? 'bg-slate-100 text-slate-700')}>
      {value}
    </span>
  );
}
