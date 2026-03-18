import { Badge } from '@/components/ui/badge';
import { ModulePage } from '@/features/procurement/components/module-page';
import { generatedData } from '@/lib/mock/generated-data';

export default function ReuseReviewPage() {
  return (
    <ModulePage
      title="Reuse review"
      description="AI suggests reusable as-is, reusable after rework, hold, or not reusable, while the final call remains human."
      rows={generatedData.reuseReviews}
      insights={[{ label: 'Reuse reviews', value: String(generatedData.reuseReviews.length) }, { label: 'Human approved reuse', value: String(generatedData.reuseReviews.filter((item) => item.human_decision === 'reuse').length) }, { label: 'AI advisory rows', value: String(generatedData.aiRecommendations.filter((item) => item.context_type === 'reuse_review').length) }]}
      columns={[
        { header: 'Recovery record', render: (row) => row.recovery_record_id },
        { header: 'AI suggestion', render: (row) => <Badge label={row.ai_recommendation.replace(/_/g, ' ')} tone="blue" /> },
        { header: 'Human decision', render: (row) => <Badge label={row.human_decision} tone="green" /> },
        { header: 'Reviewer', render: (row) => row.reviewed_by },
        { header: 'Reviewed at', render: (row) => row.created_at },
      ]}
    />
  );
}
