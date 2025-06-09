import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter"),
  password: z
    .string()
    .min(4, "Password maksimal 4 karakter")
    .max(25, "Passowrd maksimal 25 karakter"),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter"),
  email: z.string().email(),
  password: z
    .string()
    .min(4, "Password maksimal 4 karakter")
    .max(25, "Passowrd maksimal 25 karakter"),
});

export type LoginFormSchema = z.infer<typeof LoginSchema>;
export type RegisterFormSchema = z.infer<typeof RegisterSchema>;
