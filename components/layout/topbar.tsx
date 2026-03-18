import { Bell, Database, Sparkles } from 'lucide-react';
import { getDefaultProvider } from '@/lib/ai/providers';

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-dock/90 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Shipyard Material Control</p>
        <h1 className="text-lg font-semibold text-white">MV Horizon One · East Dock Yard</h1>
      </div>
      <div className="flex items-center gap-3 text-sm text-slate-300">
        <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
          <Sparkles className="h-4 w-4 text-sky-300" />
          AI: {getDefaultProvider()}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
          <Database className="h-4 w-4 text-slate-400" />
          Supabase-ready
        </div>
        <div className="rounded-full border border-white/10 p-2">
          <Bell className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
