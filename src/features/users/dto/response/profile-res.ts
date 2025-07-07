import { BaseResponse } from "@/shared/type";

export type ProfileRes = BaseResponse<{
  id: number;
  name: string;
  email: string;
  bio: null;
  avatar: null;
  createdAt: string;
  updatedAt: string;
}>;
