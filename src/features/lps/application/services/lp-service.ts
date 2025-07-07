import { LpListReq } from "../../dto/request/lp-list-req";
import { LpListRes } from "../../dto/response/lp-list-res";
import { LpClientImplements } from "../../infrastructure/apis/lp-client-implements";

export default class LpService {
  public static instance: LpService | undefined;

  private constructor(private readonly lpClient: LpClientImplements) {}

  public static getInstance(lpClient: LpClientImplements) {
    if (!LpService.instance) {
      LpService.instance = new LpService(lpClient);
    }
    return LpService.instance;
  }

  public static createInstance(lpClient: LpClientImplements) {
    return new LpService(lpClient);
  }

  public static resetInstance() {
    LpService.instance = undefined;
  }

  async getLpList(payload: LpListReq): Promise<LpListRes> {
    return this.lpClient.getLpList(payload);
  }
}
