import { z } from 'zod';

export const createRecordPayload = z.object({
  url: z.string().url(),
});

export const updateRecordPayload = z
  .object({
    shortId: z.string(),
    redirectUrl: z.string().url(),
  })
  .partial();
