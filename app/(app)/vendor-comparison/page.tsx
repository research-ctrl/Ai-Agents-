import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function VendorComparisonPage() {
  return (
    <ModulePage
      title="Vendor comparison"
      description="Historical vendor data, AI recommendation, and human final selection all in one comparative view."
      rows={generatedData.vendorComparisons}
      insights={[{ label: 'Seeded vendors', value: String(generatedData.vendors.length) }, { label: 'AI recommendations', value: String(generatedData.aiRecommendations.filter((item) => item.context_type === 'vendor_mapping').length) }, { label: 'Average delivery days', value: '4-7 days' }]}
      columns={[
        { header: 'Requirement', render: (row) => row.requirement_id },
        { header: 'Vendor', render: (row) => row.vendor_id },
        { header: 'Price score', render: (row) => row.price_score },
        { header: 'Delivery days', render: (row) => row.delivery_days },
        { header: 'QC rejection', render: (row) => `${row.qc_rejection_rate}%` },
        { header: 'AI flag', render: (row) => row.is_ai_recommended ? <Badge label="Recommended" tone="blue" /> : <Badge label="Consider" tone="slate" /> },
      ]}
    />
  );
}
