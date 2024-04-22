import { z } from 'zod';

export const responseSchema = z.object({
  _id: z.string(),
  shortId: z.string(),
  redirectUrl: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
