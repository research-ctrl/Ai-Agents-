import Link from 'next/link';
import { appModules } from '@/lib/data/module-config';

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/70 xl:block">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.26em] text-slate-400">Workflow Modules</h2>
      </div>
      <nav className="space-y-1 px-4 py-4">
        {appModules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="block rounded-2xl px-4 py-3 transition hover:bg-white/5"
          >
            <div className="text-sm font-medium text-white">{module.label}</div>
            <div className="mt-1 text-xs text-slate-500">{module.description}</div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
