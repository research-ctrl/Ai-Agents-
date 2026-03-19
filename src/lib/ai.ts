import type { AIProvider } from '@/types';

type SummaryParams = {
  provider: AIProvider;
  useCase: 'vendor' | 'reuse' | 'dashboard' | 'pin_journey';
  contextId: string;
  rawData: unknown;
};

function getGroqKey() {
  return process.env.GROQ_API_KEY;
}

function getGeminiKey() {
  return process.env.GEMINI_API_KEY;
}

function buildPrompt(params: SummaryParams) {
  return `You are an advisory assistant for a shipyard material control prototype. Use the raw JSON data to write a concise operational summary for the ${params.useCase} use case. Keep it factual, mention risks, recommended next step, and state that final decisions remain human.\n\nContext ID: ${params.contextId}\nRaw Data:\n${JSON.stringify(params.rawData, null, 2)}`;
}

async function summarizeWithGroq(prompt: string) {
  const key = getGroqKey();
  if (!key) throw new Error('Missing GROQ_API_KEY');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      messages: [
        { role: 'system', content: 'Respond with concise operational advice only.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq request failed with ${response.status}`);
  }

  const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content?.trim() ?? 'No advisory output returned by Groq.';
}

async function summarizeWithGemini(prompt: string) {
  const key = getGeminiKey();
  if (!key) throw new Error('Missing GEMINI_API_KEY');

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed with ${response.status}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('').trim() ?? 'No advisory output returned by Gemini.';
}

function mockSummary(params: SummaryParams) {
  const subject = {
    vendor: 'shortlisted vendors, balancing price, lead time, and rejection history',
    reuse: 'recovered stock condition and re-entry potential',
    dashboard: 'open demand, payment blockers, and QC hold trends',
    pin_journey: 'the end-to-end trace from request through recovery and derived PINs',
  }[params.useCase];

  return `Mock advisory summary for ${params.contextId}: review ${subject}. The raw operational data suggests one or two execution risks that should be checked by procurement and stores before action. Final decision remains with the human team.`;
}

export async function getAISummary(params: SummaryParams) {
  const prompt = buildPrompt(params);

  try {
    if (params.provider === 'groq') {
      return { providerUsed: 'groq' as const, summary: await summarizeWithGroq(prompt), mocked: false };
    }

    if (params.provider === 'gemini') {
      return { providerUsed: 'gemini' as const, summary: await summarizeWithGemini(prompt), mocked: false };
    }
  } catch (error) {
    return {
      providerUsed: 'mock' as const,
      summary: `${mockSummary(params)} (Fallback reason: ${(error as Error).message})`,
      mocked: true,
    };
  }

  return { providerUsed: 'mock' as const, summary: mockSummary(params), mocked: true };
}

export function getProviderAvailability() {
  return {
    groq: Boolean(getGroqKey()),
    gemini: Boolean(getGeminiKey()),
    mock: true,
  };
}
