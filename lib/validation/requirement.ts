import { z } from 'zod';

export const requirementRaiseSchema = z.object({
  itemId: z.string().min(1),
  specification: z.string().min(3),
  quantity: z.coerce.number().positive(),
  unit: z.string().min(1),
  requiredByDate: z.string().min(1),
  phase: z.string().min(1),
  urgency: z.enum(['Normal', 'High', 'Critical']),
  note: z.string().max(500).optional(),
  attachmentPath: z.string().optional(),
});

export type RequirementRaiseInput = z.infer<typeof requirementRaiseSchema>;
