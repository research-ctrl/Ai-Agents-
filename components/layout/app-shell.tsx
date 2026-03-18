import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-dock text-slate-100">
      <Topbar />
      <div className="flex min-h-[calc(100vh-73px)]">
        <Sidebar />
        <main className="flex-1 px-4 py-6 md:px-6 xl:px-8">{children}</main>
      </div>
    </div>
  );
}
