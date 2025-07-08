import { describe, it, beforeEach, expect } from "vitest";
import { useGetMyProfile } from "@/features/users/presentation/hooks/use-get-my-profile";
import { withAllContexts } from "@/shared/utils/test";
import { renderHook, waitFor } from "@testing-library/react";
import { useQuery } from "@tanstack/react-query";
import { fakeProfileRes } from "@/features/users/application/services/__test__/profile-mock";
import { StubUserClient } from "@/features/users/application/services/__test__/stub-user-client";
import UserService from "@/features/users/application/services/user-service";

describe("useGetMyProfile", () => {
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    const stubClient = new StubUserClient();
    const userService = UserService.getInstance(stubClient);

    wrapper = ({ children }) => withAllContexts(children, { userService });
  });

  it("프로필 정보를 성공적으로 가져온다", async () => {
    const { result } = renderHook(() => useGetMyProfile(), { wrapper });
    const queryOptions = result.current;

    const { result: queryResult } = renderHook(() => useQuery(queryOptions), {
      wrapper,
    });

    await waitFor(() => {
      expect(queryResult.current.isSuccess).toBe(true);
    });

    expect(queryResult.current.data).toEqual(fakeProfileRes.data);
  });

  it("queryKey와 queryFn이 올바르게 설정된다", () => {
    const { result } = renderHook(() => useGetMyProfile(), { wrapper });
    const queryOptions = result.current;

    expect(queryOptions.queryKey).toEqual(["profile"]);
    expect(queryOptions.queryFn).toBeDefined();
    expect(typeof queryOptions.queryFn).toBe("function");
  });
});
