import type { ReactNode } from 'react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

const nav = [
  ['Dashboard', '/'],
  ['Requirements', '/requirements'],
  ['New Requirement', '/requirements/new'],
  ['Approvals', '/approvals'],
  ['Vendor Comparison', '/vendors'],
  ['Purchase Orders', '/purchase-orders'],
  ['Payments', '/payments'],
  ['Delivery', '/delivery'],
  ['Goods Receipt', '/goods-receipt'],
  ['QC', '/qc'],
  ['Inventory', '/inventory'],
  ['Issues', '/issues'],
  ['Recovery', '/recovery'],
  ['Reuse Review', '/reuse'],
  ['Reports', '/reports'],
  ['Alerts', '/alerts'],
  ['Settings', '/settings'],
  ['AI Provider', '/ai-provider'],
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-industrial-50">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 p-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="rounded-3xl bg-industrial-900 p-5 text-white shadow-panel">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-industrial-300">Shipyard ops</p>
            <h2 className="mt-3 text-xl font-bold">{APP_NAME}</h2>
            <p className="mt-3 text-sm text-industrial-300">One ship, one yard, one warehouse, two store rooms, full PIN traceability.</p>
          </div>
          <nav className="mt-8 space-y-1">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="block rounded-2xl px-3 py-2 text-sm text-industrial-100 transition hover:bg-white/10">
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="space-y-6 py-1">{children}</main>
      </div>
    </div>
  );
}
