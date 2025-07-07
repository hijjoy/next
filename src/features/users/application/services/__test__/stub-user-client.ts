import { UserLoginReq } from "@/features/users/dto/request/user-login-req";
import { UserLoginRes } from "@/features/users/dto/response/user-login-res";
import { UserClientImplements } from "@/features/users/infrastructure/apis/user-client-implements";
import { fakeUserLoginRes } from "./login-mock";
import { ProfileRes } from "@/features/users/dto/response/profile-res";
import { fakeProfileRes } from "./profile-mock";

export class StubUserClient implements UserClientImplements {
  async login(params: UserLoginReq): Promise<UserLoginRes> {
    return fakeUserLoginRes;
  }

  async getProfile(): Promise<ProfileRes> {
    return fakeProfileRes;
  }
}
