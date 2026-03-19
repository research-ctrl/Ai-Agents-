import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { getReferenceData } from '@/lib/db';

export default function SettingsPage() {
  const refs = getReferenceData();
  return (
    <div className="space-y-6">
      <PageHeader title="Settings & master data" description="Reference data needed for practical dropdown-first operations: items, vendors, phases, categories, units, locations, roles, and users." />
      <div className="grid gap-6 xl:grid-cols-2">
        <DataTable headers={['Item', 'Specification', 'Unit', 'Category']} rows={refs.items.slice(0, 10).map((item) => [item.name, item.specification, item.unit_id, item.category_id])} />
        <DataTable headers={['Vendor', 'Lead time', 'Delivery', 'Reliability']} rows={refs.vendors.map((vendor) => [vendor.name, `${vendor.lead_time_days} days`, vendor.delivery_score, vendor.reliability_score])} />
        <DataTable headers={['Phase', 'ID']} rows={refs.phases.map((phase) => [phase.name, phase.id])} />
        <DataTable headers={['Location', 'ID']} rows={refs.locations.map((location) => [location.name, location.id])} />
        <DataTable headers={['Role', 'ID']} rows={refs.roles.map((role) => [role.name, role.id])} />
        <DataTable headers={['User', 'Role']} rows={refs.users.map((user) => [user.name, user.role_id])} />
        <div className="rounded-2xl bg-white p-6 shadow-panel xl:col-span-2">
          <h2 className="text-lg font-semibold text-industrial-900">Raw backend seed preview</h2>
          <p className="mt-2 text-sm text-industrial-600">Operational users can inspect raw backend-shaped data directly during demos.</p>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-industrial-950 p-4 text-xs text-emerald-200">{JSON.stringify({ items: refs.items.slice(0, 2), vendors: refs.vendors.slice(0, 2) }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
