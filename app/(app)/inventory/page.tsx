import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function InventoryPage() {
  return (
    <ModulePage
      title="Inventory list"
      description="Every stock record is PIN-tagged with location, linked transactions, and parent-child lineage for recovered material."
      rows={generatedData.inventoryItems}
      insights={[{ label: 'Warehouse + store rooms', value: '3 active locations' }, { label: 'Derived PINs', value: String(generatedData.inventoryItems.filter((item) => item.parent_pin).length) }, { label: 'Available stock', value: String(generatedData.inventoryItems.filter((item) => item.status === 'available').length) }]}
      columns={[
        { header: 'PIN', render: (row) => <Link href={`/inventory/pin/${row.pin}`} className="text-sky-300 underline-offset-4 hover:underline">{row.pin}</Link> },
        { header: 'Item', render: (row) => row.item_name },
        { header: 'Location', render: (row) => row.location },
        { header: 'Qty', render: (row) => row.quantity_on_hand },
        { header: 'Status', render: (row) => <Badge label={row.status} tone="green" /> },
        { header: 'Parent', render: (row) => row.parent_pin ?? '—' },
      ]}
    />
  );
}
