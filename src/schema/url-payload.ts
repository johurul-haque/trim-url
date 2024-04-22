import { z } from 'zod';

export const urlPayload = z.object({
  url: z.string().url(),
});
