import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function StatCard({ label, value, helper }: { label: string; value: string | number; helper: string }) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{label}</p>
        <ArrowUpRight className="h-4 w-4 text-sky-300" />
      </div>
      <div>
        <div className="text-3xl font-semibold text-white">{value}</div>
        <p className="mt-1 text-sm text-slate-400">{helper}</p>
      </div>
    </Card>
  );
}
