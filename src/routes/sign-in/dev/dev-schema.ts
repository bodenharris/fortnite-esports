import { z } from "zod";

export const devSignInFormSchema = z.object({
    email: z.string().email(),
});

export type DevSignInFormSchema = typeof devSignInFormSchema;
