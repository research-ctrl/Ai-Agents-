import { Card, CardHeader } from '@/components/ui/card';
import { getDefaultProvider } from '@/lib/ai/providers';
import { ProviderSelector } from '@/features/settings/components/provider-selector';

export default function AIProviderPage() {
  return (
    <Card>
      <CardHeader
        eyebrow="Part 7 · AI integration scaffold"
        title="AI provider selector"
        description="Groq and Gemini are selectable when keys exist, with a safe mock fallback that keeps the app operational."
      />
      <div className="mt-6 space-y-4">
        <ProviderSelector defaultProvider={getDefaultProvider()} />
        <p className="text-sm text-slate-400">Provider selection changes the advisory source, but the workflow continues to function when no live key is configured.</p>
      </div>
    </Card>
  );
}
