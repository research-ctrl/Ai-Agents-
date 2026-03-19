import { PageHeader } from '@/components/page-header';
import { PREFILLED_SHIP, PREFILLED_YARD } from '@/lib/constants';
import { getReferenceData } from '@/lib/db';

export default function NewRequirementPage() {
  const refs = getReferenceData();

  return (
    <div className="space-y-6">
      <PageHeader title="New requirement" description="Prototype low-input form. Defaults are prefilled for the active ship and yard. Submission wiring can point to Supabase or remain mock-only for demos." />
      <form className="grid gap-4 rounded-2xl bg-white p-6 shadow-panel lg:grid-cols-2">
        <label className="text-sm font-medium text-industrial-700">
          Item name
          <select className="mt-2 w-full rounded-2xl border bg-industrial-50 px-3 py-2">
            {refs.items.slice(0, 12).map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-industrial-700">
          Specification
          <input defaultValue={refs.items[0]?.specification} className="mt-2 w-full rounded-2xl border bg-industrial-50 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-industrial-700">
          Quantity
          <input defaultValue={12} type="number" className="mt-2 w-full rounded-2xl border bg-industrial-50 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-industrial-700">
          Unit
          <select className="mt-2 w-full rounded-2xl border bg-industrial-50 px-3 py-2">
            {refs.units.map((unit) => (
              <option key={unit.id}>{unit.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-industrial-700">
          Required by date
          <input type="date" className="mt-2 w-full rounded-2xl border bg-industrial-50 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-industrial-700">
          Phase
          <select className="mt-2 w-full rounded-2xl border bg-industrial-50 px-3 py-2">
            {refs.phases.map((phase) => (
              <option key={phase.id}>{phase.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-industrial-700">
          Urgency
          <select className="mt-2 w-full rounded-2xl border bg-industrial-50 px-3 py-2">
            {['low', 'medium', 'high', 'critical'].map((urgency) => (
              <option key={urgency}>{urgency}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-industrial-700">
          Optional image attachment path
          <input placeholder="requirement-images/new-item.jpg" className="mt-2 w-full rounded-2xl border bg-industrial-50 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-industrial-700 lg:col-span-2">
          Note
          <textarea rows={4} defaultValue="Needed for active block workfront." className="mt-2 w-full rounded-2xl border bg-industrial-50 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-industrial-700">
          Ship
          <input readOnly defaultValue={PREFILLED_SHIP} className="mt-2 w-full rounded-2xl border bg-industrial-100 px-3 py-2" />
        </label>
        <label className="text-sm font-medium text-industrial-700">
          Yard
          <input readOnly defaultValue={PREFILLED_YARD} className="mt-2 w-full rounded-2xl border bg-industrial-100 px-3 py-2" />
        </label>
        <div className="lg:col-span-2 flex flex-wrap gap-3">
          <button type="button" className="rounded-full bg-industrial-900 px-5 py-2 text-sm font-semibold text-white">Save prototype draft</button>
          <button type="button" className="rounded-full border px-5 py-2 text-sm font-semibold text-industrial-700">Upload image later</button>
        </div>
      </form>
    </div>
  );
}
