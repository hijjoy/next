import { UserLoginRes } from "@/features/users/dto/response/user-login-res";

export const fakeUserLoginRes: UserLoginRes = {
  data: {
    id: 1,
    name: "test",
    accessToken: "test",
    refreshToken: "test",
  },
  message: "success",
  status: true,
  statusCode: 200,
};
