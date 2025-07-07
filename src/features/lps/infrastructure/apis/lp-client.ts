import { HttpClient } from "@/shared/lib/HttpClient";
import { LpListReq } from "../../dto/request/lp-list-req";
import { LpListRes } from "../../dto/response/lp-list-res";
import { LpClientImplements } from "./lp-client-implements";

export class LpClient implements LpClientImplements {
  private static instance: LpClient | undefined;
  private readonly httpClient: HttpClient;

  private constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public static getInstance(httpClient: HttpClient) {
    if (!LpClient.instance) {
      LpClient.instance = new LpClient(httpClient);
    }
    return LpClient.instance;
  }

  public static resetInstance() {
    LpClient.instance = undefined;
  }

  public static createInstance(httpClient: HttpClient) {
    return new LpClient(httpClient);
  }

  async getLpList(payload: LpListReq): Promise<LpListRes> {
    const params = new URLSearchParams();
    params.set("cursor", String(payload.cursor));
    params.set("limit", String(payload.limit));

    if (payload.order) params.set("order", payload.order);
    if (payload.search) params.set("search", payload.search);

    return this.httpClient.get(`/v1/lps?${params.toString()}`);
  }
}
