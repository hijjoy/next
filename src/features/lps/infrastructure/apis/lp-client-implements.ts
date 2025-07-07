import { LpListReq } from "../../dto/request/lp-list-req";
import { LpListRes } from "../../dto/response/lp-list-res";

export interface LpClientImplements {
  getLpList: (payload: LpListReq) => Promise<LpListRes>;
}
