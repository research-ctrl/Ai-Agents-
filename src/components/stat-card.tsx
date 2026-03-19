import { ReactNode } from 'react';

export function StatCard({ label, value, hint, icon }: { label: string; value: string | number; hint: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-panel">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-industrial-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-industrial-900">{value}</p>
        </div>
        <div className="rounded-2xl bg-industrial-100 p-3 text-industrial-700">{icon}</div>
      </div>
      <p className="mt-4 text-sm text-industrial-600">{hint}</p>
    </div>
  );
}
