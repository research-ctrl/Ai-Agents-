import { z } from 'zod';
import { PREFILLED_SHIP, PREFILLED_YARD } from '@/lib/constants';

export const requirementFormSchema = z.object({
  item_name: z.string().min(2),
  specification: z.string().min(2),
  quantity: z.coerce.number().positive(),
  unit_id: z.string().min(1),
  required_by_date: z.string().min(1),
  phase_id: z.string().min(1),
  urgency: z.enum(['low', 'medium', 'high', 'critical']),
  note: z.string().min(2),
  image_path: z.string().optional().nullable(),
  ship_name: z.string().default(PREFILLED_SHIP),
  yard_name: z.string().default(PREFILLED_YARD),
});

export const aiSummarySchema = z.object({
  provider: z.enum(['mock', 'groq', 'gemini']).default('mock'),
  useCase: z.enum(['vendor', 'reuse', 'dashboard', 'pin_journey']).default('dashboard'),
  contextId: z.string().min(1),
  rawData: z.any(),
});

export type RequirementFormInput = z.infer<typeof requirementFormSchema>;
export type AISummaryInput = z.infer<typeof aiSummarySchema>;
