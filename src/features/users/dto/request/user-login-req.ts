import { z } from "zod";

export const userLoginReq = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type UserLoginReq = z.infer<typeof userLoginReq>;
