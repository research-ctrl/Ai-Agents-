import type { AIProvider } from '@/lib/types/domain';

export type AIUseCase = 'vendor_mapping' | 'reuse_review' | 'dashboard_commentary' | 'pin_summary';

export type AIRequest = {
  provider: AIProvider;
  useCase: AIUseCase;
  payload: Record<string, unknown>;
};

export type AIResult = {
  provider: AIProvider;
  live: boolean;
  advisoryLabel: string;
  content: string;
};

interface ProviderAdapter {
  name: AIProvider;
  isConfigured(): boolean;
  generate(useCase: AIUseCase, payload: Record<string, unknown>): Promise<AIResult>;
}

function buildMockContent(useCase: AIUseCase, payload: Record<string, unknown>) {
  switch (useCase) {
    case 'vendor_mapping':
      return `Advisory only: prioritize vendors with balanced price history, lower QC rejection, and predictable lead time. Context: ${payload.requirement ?? 'requirement not specified'}.`;
    case 'reuse_review':
      return `Advisory only: evaluate returned material condition, quantity, and parent issue history before accepting for reuse. Context: ${payload.pin ?? 'PIN not specified'}.`;
    case 'pin_summary':
      return `Advisory only: this PIN journey links requirement, approval, PO, receipt, QC, issue, and recovery records for fast managerial review.`;
    default:
      return `Advisory only: material flow is stable, but finance, QC, and recovery queues should be reviewed for the next weekly report.`;
  }
}

class MockAdapter implements ProviderAdapter {
  name: AIProvider = 'mock';

  isConfigured() {
    return true;
  }

  async generate(useCase: AIUseCase, payload: Record<string, unknown>) {
    return {
      provider: 'mock' as AIProvider,
      live: false,
      advisoryLabel: 'AI advisory only',
      content: buildMockContent(useCase, payload),
    };
  }
}

class EnvBackedAdapter implements ProviderAdapter {
  constructor(public name: AIProvider, private envKey?: string) {}

  isConfigured() {
    return Boolean(this.envKey);
  }

  async generate(useCase: AIUseCase, payload: Record<string, unknown>) {
    if (!this.isConfigured()) {
      return new MockAdapter().generate(useCase, payload);
    }

    return {
      provider: this.name as AIProvider,
      live: false,
      advisoryLabel: 'AI advisory only',
      content: `${this.name.toUpperCase()} adapter scaffold is configured via environment. Replace this mock transport with live API integration when ready.`,
    };
  }
}

const adapters: Record<AIProvider, ProviderAdapter> = {
  mock: new MockAdapter(),
  groq: new EnvBackedAdapter('groq', process.env.GROQ_API_KEY),
  gemini: new EnvBackedAdapter('gemini', process.env.GEMINI_API_KEY),
};

export async function generateAIInsight(request: AIRequest) {
  const adapter = adapters[request.provider] ?? adapters.mock;
  return adapter.generate(request.useCase, request.payload);
}

export function getDefaultProvider(): AIProvider {
  const envProvider = process.env.NEXT_PUBLIC_DEFAULT_AI_PROVIDER;
  if (envProvider === 'groq' || envProvider === 'gemini' || envProvider === 'mock') {
    return envProvider;
  }
  return 'mock';
}
