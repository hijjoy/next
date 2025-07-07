import { HttpClient } from "@/shared/lib/HttpClient";
import { UserClientImplements } from "./user-client-implements";
import { UserLoginReq } from "../../dto/request/user-login-req";
import { UserLoginRes } from "../../dto/response/user-login-res";
import { ProfileRes } from "../../dto/response/profile-res";

export class UserClient implements UserClientImplements {
  private static instance: UserClient | undefined;
  private readonly httpClient: HttpClient;

  private constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public static getInstance(httpClient: HttpClient) {
    if (!UserClient.instance) {
      UserClient.instance = new UserClient(httpClient);
    }
    return UserClient.instance;
  }

  public static resetInstance() {
    UserClient.instance = undefined;
  }

  async login(params: UserLoginReq): Promise<UserLoginRes> {
    return this.httpClient.post("/v1/auth/signin", params);
  }

  async getProfile(): Promise<ProfileRes> {
    return this.httpClient.get("/v1/users/me");
  }
}
