'use client';

import { useMemo, useState } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { generatedData } from '@/lib/mock/generated-data';
import { requirementRaiseSchema } from '@/lib/validation/requirement';

const defaults = {
  ship: 'MV Horizon One',
  yard: 'East Dock Yard',
  requester: 'Sawant',
  itemId: generatedData.items[0].id,
  specification: generatedData.items[0].specification,
  quantity: 12,
  unit: generatedData.items[0].unit,
  requiredByDate: generatedData.requirements[0].required_by_date,
  phase: generatedData.phases[0],
  urgency: 'High',
  note: 'Prototype request with autofilled defaults and optional photo path.',
  attachmentPath: 'requirements/manual/new-item-photo.jpg',
};

export function RequirementRaiseForm() {
  const [form, setForm] = useState(defaults);
  const [message, setMessage] = useState('');

  const selectedItem = useMemo(
    () => generatedData.items.find((item) => item.id === form.itemId) ?? generatedData.items[0],
    [form.itemId],
  );

  const updateItem = (itemId: string) => {
    const item = generatedData.items.find((entry) => entry.id === itemId) ?? generatedData.items[0];
    setForm((current) => ({ ...current, itemId, specification: item.specification, unit: item.unit }));
  };

  const submit = () => {
    const result = requirementRaiseSchema.safeParse(form);
    setMessage(result.success ? 'Prototype requirement validated. Next action: procurement review queue.' : 'Validation failed. Please review required fields.');
  };

  return (
    <Card>
      <CardHeader
        eyebrow="Part 6 · Frontend scaffolding"
        title="Requirement raise"
        description="Low-input UI with prefilled ship, yard, requester, and guided selections."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="Ship" value={form.ship} readOnly />
        <Field label="Yard" value={form.yard} readOnly />
        <Field label="Requester" value={form.requester} readOnly />
        <label className="space-y-2 text-sm text-slate-300">
          <span>Item</span>
          <select value={form.itemId} onChange={(event) => updateItem(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-white">
            {generatedData.items.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <Field label="Specification" value={form.specification} onChange={(value) => setForm((current) => ({ ...current, specification: value }))} />
        <Field label="Quantity" value={String(form.quantity)} onChange={(value) => setForm((current) => ({ ...current, quantity: Number(value) }))} />
        <Field label="Unit" value={form.unit} readOnly />
        <Field label="Required by" type="date" value={form.requiredByDate} onChange={(value) => setForm((current) => ({ ...current, requiredByDate: value }))} />
        <label className="space-y-2 text-sm text-slate-300">
          <span>Phase</span>
          <select value={form.phase} onChange={(event) => setForm((current) => ({ ...current, phase: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-white">
            {generatedData.phases.map((phase) => (
              <option key={phase} value={phase}>{phase}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300">
          <span>Urgency</span>
          <select value={form.urgency} onChange={(event) => setForm((current) => ({ ...current, urgency: event.target.value as typeof form.urgency }))} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-white">
            {['Normal', 'High', 'Critical'].map((urgency) => (
              <option key={urgency} value={urgency}>{urgency}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
          <span>Note</span>
          <textarea value={form.note} onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-white" />
        </label>
        <Field label="Attachment storage path" value={form.attachmentPath} onChange={(value) => setForm((current) => ({ ...current, attachmentPath: value }))} />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={submit} className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950">Validate & queue</button>
        <div className="text-sm text-slate-400">Selected item: <span className="text-white">{selectedItem.name}</span></div>
      </div>
      {message ? <p className="mt-4 text-sm text-sky-200">{message}</p> : null}
    </Card>
  );
}

function Field({ label, value, onChange, readOnly = false, type = 'text' }: { label: string; value: string; onChange?: (value: string) => void; readOnly?: boolean; type?: string }) {
  return (
    <label className="space-y-2 text-sm text-slate-300">
      <span>{label}</span>
      <input type={type} value={value} readOnly={readOnly} onChange={(event) => onChange?.(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-3 py-2 text-white" />
    </label>
  );
}
