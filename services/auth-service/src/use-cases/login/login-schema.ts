import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid e-mail."),
  password: z.string(),
});

export type LoginSchemaDTO = z.infer<typeof LoginSchema>;