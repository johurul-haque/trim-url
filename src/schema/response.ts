import { z } from 'zod';

export const responseSchema = z.object({
  id: z.string(),
  shortId: z.string(),
  redirectUrl: z.string().url(),
  createdAt: z.string().datetime(),
});
