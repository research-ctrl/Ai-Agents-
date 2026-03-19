import { PageHeader } from '@/components/page-header';
import { aiProviders } from '@/lib/constants';
import { getProviderAvailability } from '@/lib/ai';

export default function AIProviderPage() {
  const availability = getProviderAvailability();
  return (
    <div className="space-y-6">
      <PageHeader title="AI provider selector" description="Choose Groq or Gemini through environment variables, while keeping AI advisory-only and the app fully usable on mock fallback." />
      <div className="grid gap-4 md:grid-cols-3">
        {aiProviders.map((provider) => (
          <div key={provider.value} className="rounded-2xl bg-white p-5 shadow-panel">
            <h2 className="text-lg font-semibold text-industrial-900">{provider.label}</h2>
            <p className="mt-2 text-sm text-industrial-600">
              {provider.keyVar ? `Env key: ${provider.keyVar}` : 'No key needed. Safe default fallback for demos.'}
            </p>
            <p className="mt-4 text-sm font-semibold text-industrial-800">
              Status: {availability[provider.value as keyof typeof availability] ? 'available' : 'missing key'}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-panel">
        <p className="text-sm leading-6 text-industrial-700">
          API route: <code className="rounded bg-industrial-100 px-2 py-1">/api/ai/summary</code>. Send provider, use case, context ID,
          and raw data. If a provider key is missing or a request fails, the route returns a deterministic mock summary instead of breaking the app.
        </p>
      </div>
    </div>
  );
}
