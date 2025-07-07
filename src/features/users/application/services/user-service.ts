import { UserLoginReq } from "../../dto/request/user-login-req";
import { ProfileRes } from "../../dto/response/profile-res";
import { UserLoginRes } from "../../dto/response/user-login-res";
import { UserClientImplements } from "../../infrastructure/apis/user-client-implements";

export default class UserService {
  public static instance: UserService | undefined;

  private constructor(private readonly userClient: UserClientImplements) {}

  public static getInstance(userClient: UserClientImplements) {
    if (!UserService.instance) {
      UserService.instance = new UserService(userClient);
    }
    return UserService.instance;
  }

  // ✅ SSR 전용 인스턴스 생성
  public static createInstance(userClient: UserClientImplements) {
    return new UserService(userClient);
  }

  public static resetInstance() {
    UserService.instance = undefined;
  }

  async login(params: UserLoginReq): Promise<UserLoginRes> {
    return this.userClient.login(params);
  }

  async getProfile(): Promise<ProfileRes["data"]> {
    const { data } = await this.userClient.getProfile();

    return data;
  }
}
