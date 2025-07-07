import { UserLoginReq } from "../../dto/request/user-login-req";
import { ProfileRes } from "../../dto/response/profile-res";
import { UserLoginRes } from "../../dto/response/user-login-res";

export interface UserClientImplements {
  login: (payload: UserLoginReq) => Promise<UserLoginRes>;
  getProfile: () => Promise<ProfileRes>;
}
