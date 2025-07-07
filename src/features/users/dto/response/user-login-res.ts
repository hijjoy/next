import { BaseResponse } from "@/shared/type";

export type UserLoginRes = BaseResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;
