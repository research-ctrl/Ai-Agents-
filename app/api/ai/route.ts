import { NextResponse } from 'next/server';
import { generateAIInsight } from '@/lib/ai/providers';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await generateAIInsight({
    provider: body.provider ?? 'mock',
    useCase: body.useCase ?? 'dashboard_commentary',
    payload: body.payload ?? {},
  });

  return NextResponse.json(result);
}
