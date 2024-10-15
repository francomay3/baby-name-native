import { z } from "zod";

export const TestRowSchema = z.object({
  id: z.number(),
  value: z.string(),
  intValue: z.number(),
});

export type TestRow = z.infer<typeof TestRowSchema>;
