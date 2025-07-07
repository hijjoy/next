import { beforeEach, describe, it, expect } from "vitest";
import UserService from "../user-service";
import { StubUserClient } from "./stub-user-client";
import { fakeProfileRes } from "./profile-mock";
import { fakeUserLoginRes } from "./login-mock";

describe("UserService with StubUserClient", () => {
  let service: UserService;

  beforeEach(() => {
    const stubClient = new StubUserClient();
    service = UserService.getInstance(stubClient);
  });

  it("login: 테스트 데이터 반환", async () => {
    const result = await service.login({
      email: "test@test.com",
      password: "test",
    });

    expect(result).toEqual(fakeUserLoginRes);
  });

  it("getProfile: 테스트 데이터 반환", async () => {
    const result = await service.getProfile();

    // getProfile이 data만 반환해서 이렇게 비교
    expect(result).toEqual(fakeProfileRes.data);
  });
});
