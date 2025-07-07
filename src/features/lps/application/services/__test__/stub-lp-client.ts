import { fakeLpListRes } from "./lp-list-mock";
import { LpListRes } from "@/features/lps/dto/response/lp-list-res";
import { LpListReq } from "@/features/lps/dto/request/lp-list-req";
import { LpClientImplements } from "@/features/lps/infrastructure/apis/lp-client-implements";

export class StubLpClient implements LpClientImplements {
  async getLpList(params: LpListReq): Promise<LpListRes> {
    return fakeLpListRes;
  }
}
