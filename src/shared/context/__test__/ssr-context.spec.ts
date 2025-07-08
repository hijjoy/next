import { describe, it, expect, vi } from "vitest";
import { getSSRContext } from "../ssr-context";

// next/headers의 cookies를 mock 처리
vi.mock("next/headers", () => ({
  cookies: () => ({
    get: (key: string) => ({ value: "fake-token" }),
  }),
}));

describe("SSR Context", () => {
  it("should provide userService and lpService", async () => {
    const { userService, lpService } = await getSSRContext();

    expect(userService).toBeDefined();
    expect(lpService).toBeDefined();
  });

  it("should provide not same userService instance", async () => {
    const { userService } = await getSSRContext();
    const { userService: userService2 } = await getSSRContext();

    expect(userService).not.toBe(userService2);
  });
});
