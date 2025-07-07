import { z } from "zod";

export const lpListReq = z.object({
  search: z.string().optional(),
  cursor: z.number(),
  limit: z.number(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type LpListReq = z.infer<typeof lpListReq>;
