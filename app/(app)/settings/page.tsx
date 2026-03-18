import { Card, CardHeader } from '@/components/ui/card';
import { generatedData } from '@/lib/mock/generated-data';
import { getDefaultProvider } from '@/lib/ai/providers';
import { ProviderSelector } from '@/features/settings/components/provider-selector';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          eyebrow="Part 2 · App architecture"
          title="Prototype architecture notes"
          description="Implemented with Next.js App Router, TypeScript, Tailwind CSS, Supabase-ready service boundaries, and optional AI providers."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Tile title="Frontend shell" value="Next.js routes" note="Each workflow module is its own route for clean extension." />
          <Tile title="Backend boundary" value="app/api + lib/data" note="Server-friendly data access keeps direct DB writes out of client components." />
          <Tile title="Database design" value="Supabase PostgreSQL" note="Relational schema with enums, traceability IDs, and storage paths." />
          <Tile title="Seed system" value="Python generator" note="Creates JSON, TypeScript, and SQL payloads for prototype realism." />
        </div>
      </Card>

      <Card>
        <CardHeader title="Operational defaults" description="Current assumptions are prefilled, but entity models are future-ready for more ships, yards, and warehouses." />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Tile title="Ship" value={generatedData.meta.ship} note="Currently one ship, future-ready for many." />
          <Tile title="Yard" value={generatedData.meta.yard} note="Single leased yard in prototype." />
          <Tile title="Store rooms" value={generatedData.meta.storeRooms.join(' + ')} note="Warehouse and two store rooms modeled." />
          <Tile title="Default AI provider" value={getDefaultProvider()} note="Can be changed without code edits." />
        </div>
      </Card>

      <Card>
        <CardHeader title="AI provider selector" description="Stored in local browser storage for prototype use. Live keys remain environment-based." />
        <div className="mt-6">
          <ProviderSelector defaultProvider={getDefaultProvider()} />
        </div>
      </Card>
    </div>
  );
}

function Tile({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
      <p className="mt-2 text-sm text-slate-400">{note}</p>
    </div>
  );
}
