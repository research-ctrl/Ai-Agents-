import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function RecoveryEntryPage() {
  return (
    <ModulePage
      title="Recovery entry"
      description="Returned balance is classified as not used, leftover, or scrap with image path, quantity, reason, and condition."
      rows={generatedData.recoveryRecords}
      insights={[{ label: 'Recoveries', value: String(generatedData.recoveryRecords.length) }, { label: 'Not used / leftover / scrap', value: 'N / LF / S prefixes' }, { label: 'Image references', value: String(generatedData.recoveryRecords.filter((item) => item.image_path).length) }]}
      columns={[
        { header: 'Recovery PIN', render: (row) => row.recovery_pin },
        { header: 'Type', render: (row) => <Badge label={row.recovery_type.replace(/_/g, ' ')} tone={row.recovery_type === 'scrap' ? 'red' : row.recovery_type === 'leftover' ? 'amber' : 'green'} /> },
        { header: 'Condition', render: (row) => row.condition_status },
        { header: 'Quantity', render: (row) => row.quantity },
        { header: 'Image', render: (row) => row.image_path },
      ]}
    />
  );
}
