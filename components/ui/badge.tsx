import { cn } from '@/lib/utils/cn';

const toneClasses: Record<string, string> = {
  blue: 'bg-sky-500/15 text-sky-200 ring-sky-400/20',
  green: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/20',
  amber: 'bg-amber-500/15 text-amber-100 ring-amber-300/20',
  red: 'bg-rose-500/15 text-rose-100 ring-rose-300/20',
  slate: 'bg-slate-500/15 text-slate-200 ring-slate-400/20',
};

export function Badge({ label, tone = 'slate' }: { label: string; tone?: keyof typeof toneClasses }) {
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset', toneClasses[tone])}>
      {label}
    </span>
  );
}
