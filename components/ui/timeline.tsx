import { Card, CardHeader } from '@/components/ui/card';

export function Timeline({ title, items }: { title: string; items: { title: string; meta: string; note?: string }[] }) {
  return (
    <Card>
      <CardHeader title={title} description="Chronological workflow visibility for operational traceability." />
      <ol className="mt-6 space-y-4 border-l border-slate-700 pl-4">
        {items.map((item) => (
          <li key={`${item.title}-${item.meta}`} className="relative pl-4">
            <span className="absolute -left-[1.15rem] top-1.5 h-2.5 w-2.5 rounded-full bg-sky-400" />
            <div className="text-sm font-medium text-white">{item.title}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.meta}</div>
            {item.note ? <p className="mt-1 text-sm text-slate-400">{item.note}</p> : null}
          </li>
        ))}
      </ol>
    </Card>
  );
}
