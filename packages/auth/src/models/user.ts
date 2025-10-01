import { z } from "zod";
import { Role, roleSchema } from "../role";

export const userSchema = z.object({
  id: z.string(),
  role: roleSchema,
});

export type User = z.infer<typeof userSchema>;
