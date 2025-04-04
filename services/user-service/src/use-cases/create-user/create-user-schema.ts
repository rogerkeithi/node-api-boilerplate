import { z } from "zod";
import { Roles } from "@rk-org/shared";

export const CreateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid e-mail"),
  role: z.enum([Roles.USER, Roles.ADMIN, Roles.MODERATOR]),
  password: z.string().min(6, "Password must be at least 3 characters long."),
});

export type CreateUserSchemaDTO = z.infer<typeof CreateUserSchema>;