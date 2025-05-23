import { z } from "zod";

export const accountFormSchema = z.object({
    username: z.string().min(2).max(50),
});

export type AccountFormSchema = typeof accountFormSchema;
