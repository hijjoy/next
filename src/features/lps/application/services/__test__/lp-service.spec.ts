import { describe, it, expect, beforeEach } from "vitest";
import LpService from "../lp-service";
import { StubLpClient } from "./stub-lp-client";
import { LpListReq } from "@/features/lps/dto/request/lp-list-req";
import { fakeLpListRes } from "./lp-list-mock";

// TODO: 무한스크롤 테스트로 변경해야함
describe("LpService with StubLpClient", () => {
  let service: LpService;

  beforeEach(() => {
    const stubClient = new StubLpClient();
    service = LpService.getInstance(stubClient);
  });

  it("getLpList: 테스트 데이터 반환", async () => {
    const params: LpListReq = { cursor: 0, limit: 10 };
    const result = await service.getLpList(params);
    expect(result).toEqual(fakeLpListRes);
  });
});
