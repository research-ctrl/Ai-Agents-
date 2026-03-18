import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { generatedData } from '@/lib/mock/generated-data';

type ModulePageProps<T> = {
  title: string;
  description: string;
  eyebrow?: string;
  rows: T[];
  columns: Parameters<typeof DataTable<T>>[0]['columns'];
  insights?: { label: string; value: string }[];
};

export function ModulePage<T>({ title, description, eyebrow = 'Operational module', rows, columns, insights = [] }: ModulePageProps<T>) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {insights.map((insight) => (
            <div key={insight.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-400">{insight.label}</div>
              <div className="mt-1 text-xl font-semibold text-white">{insight.value}</div>
            </div>
          ))}
          <div className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4 md:col-span-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-sm font-semibold text-white">AI advisory posture</div>
                <p className="mt-1 text-sm text-slate-300">Recommendations remain optional. Supervisors can always inspect raw data, seeded records, and linked workflow entities.</p>
              </div>
              <Badge label="Advisory only" tone="blue" />
            </div>
          </div>
        </div>
      </Card>
      <DataTable title={title} description={description} rows={rows} columns={columns} />
    </div>
  );
}

export const procurementInsights = [
  { label: 'Seeded requirements', value: String(generatedData.requirements.length) },
  { label: 'Seeded POs', value: String(generatedData.purchaseOrders.length) },
  { label: 'Seeded recoveries', value: String(generatedData.recoveryRecords.length) },
];
