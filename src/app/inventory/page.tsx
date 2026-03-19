import Link from 'next/link';
import { DataTable } from '@/components/data-table';
import { PageHeader } from '@/components/page-header';
import { StatusBadge } from '@/components/status-badge';
import { getInventoryList } from '@/lib/db';

export default function InventoryPage() {
  const inventory = getInventoryList();
  return (
    <div className="space-y-6">
      <PageHeader title="Inventory list" description="PIN-based intake records with category, location, vendor, phase, and receipt/QC linkage for full traceability." />
      <DataTable
        headers={['PIN', 'Item', 'Category', 'Location', 'Qty', 'Status', 'Parent PIN']}
        rows={inventory.map((row) => [
          <Link key={row.pin} href={`/inventory/${encodeURIComponent(row.pin)}`} className="font-semibold text-industrial-900 underline-offset-4 hover:underline">
            {row.pin}
          </Link>,
          row.item?.name ?? row.item_id,
          row.category?.name ?? row.category_id,
          row.location?.name ?? row.location_id,
          row.quantity,
          <StatusBadge key={row.id} value={row.status} />,
          row.parent_pin ?? '—',
        ])}
      />
    </div>
  );
}
