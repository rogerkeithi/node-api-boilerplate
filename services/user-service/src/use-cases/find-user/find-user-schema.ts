import { z } from "zod";

export const FindUserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("E-mail inválido.").optional(),
});

export type FindUserSchemaDTO = z.infer<typeof FindUserSchema>;