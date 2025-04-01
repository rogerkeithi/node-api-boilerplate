import { z } from "zod";

export const FindUserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Invalid e-mail.").optional(),
});

export type FindUserSchemaDTO = z.infer<typeof FindUserSchema>;