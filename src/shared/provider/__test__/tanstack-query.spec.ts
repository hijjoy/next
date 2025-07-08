import { describe, expect, it } from "vitest";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

describe("getQueryClient", () => {
  it("should return the same instance when called multiple times", () => {
    const firstTime = getQueryClient();
    const secondTime = getQueryClient();

    expect(firstTime).toBe(secondTime);
  });
});
