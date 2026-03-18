import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn('rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-panel', className)}>{children}</section>;
}

export function CardHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="space-y-1">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.24em] text-sky-300">{eyebrow}</p> : null}
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {description ? <p className="text-sm text-slate-400">{description}</p> : null}
    </div>
  );
}
