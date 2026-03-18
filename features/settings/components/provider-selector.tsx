'use client';

import { useEffect, useState } from 'react';
import type { AIProvider } from '@/lib/types/domain';

const options: { value: AIProvider; label: string; description: string }[] = [
  { value: 'mock', label: 'Mock', description: 'Always available fallback for prototype mode.' },
  { value: 'groq', label: 'Groq', description: 'Fast LLM route when GROQ_API_KEY is configured.' },
  { value: 'gemini', label: 'Gemini', description: 'Google Gemini route when GEMINI_API_KEY is configured.' },
];

export function ProviderSelector({ defaultProvider }: { defaultProvider: AIProvider }) {
  const [provider, setProvider] = useState<AIProvider>(defaultProvider);

  useEffect(() => {
    const stored = window.localStorage.getItem('shipyard-ai-provider') as AIProvider | null;
    if (stored) setProvider(stored);
  }, []);

  const updateProvider = (next: AIProvider) => {
    setProvider(next);
    window.localStorage.setItem('shipyard-ai-provider', next);
  };

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => updateProvider(option.value)}
          className={`rounded-2xl border p-4 text-left transition ${
            provider === option.value
              ? 'border-sky-400 bg-sky-500/10 text-white'
              : 'border-white/10 bg-slate-950/40 text-slate-300 hover:border-white/20'
          }`}
        >
          <div className="text-sm font-semibold">{option.label}</div>
          <p className="mt-1 text-sm text-slate-400">{option.description}</p>
        </button>
      ))}
    </div>
  );
}
