import { ReactNode } from 'react';

export function Timeline({ items }: { items: Array<{ title: string; meta?: string; body?: ReactNode }> }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-panel">
      <div className="space-y-5">
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-industrial-700" />
              {index < items.length - 1 ? <div className="mt-1 h-full w-px bg-industrial-200" /> : null}
            </div>
            <div className="pb-5">
              <p className="font-semibold text-industrial-900">{item.title}</p>
              {item.meta ? <p className="text-xs uppercase tracking-[0.18em] text-industrial-500">{item.meta}</p> : null}
              {item.body ? <div className="mt-2 text-sm text-industrial-600">{item.body}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
