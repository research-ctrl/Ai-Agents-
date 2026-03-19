import { ReactNode } from 'react';

export function PageHeader({ title, description, actions }: { title: string; description: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-panel md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-industrial-500">Prototype workspace</p>
        <h1 className="mt-2 text-2xl font-bold text-industrial-900">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm text-industrial-600">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
