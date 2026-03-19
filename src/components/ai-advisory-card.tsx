import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function AIAdvisoryCard({ title, summary, href, mocked }: { title: string; summary: string; href?: string; mocked?: boolean }) {
  return (
    <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
            <Sparkles className="h-4 w-4" />
            AI advisory
          </div>
          <h3 className="mt-2 text-lg font-semibold text-industrial-900">{title}</h3>
        </div>
        {mocked ? <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">Mock fallback</span> : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-industrial-600">{summary}</p>
      {href ? (
        <Link href={href} className="mt-4 inline-flex rounded-full bg-industrial-900 px-4 py-2 text-xs font-semibold text-white">
          Open provider settings
        </Link>
      ) : null}
    </div>
  );
}
