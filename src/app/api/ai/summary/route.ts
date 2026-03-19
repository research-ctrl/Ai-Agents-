import { NextRequest, NextResponse } from 'next/server';
import { getAISummary } from '@/lib/ai';
import { aiSummarySchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  const json = await request.json();
  const parsed = aiSummarySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const result = await getAISummary(parsed.data);
  return NextResponse.json(result);
}
