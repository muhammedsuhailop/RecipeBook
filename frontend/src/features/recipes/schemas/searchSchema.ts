import { z } from "zod";

export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, "Enter something to search")
    .max(80, "Search is too long"),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
