import { describe, it, expect } from "vitest";
import { useContext } from "@/shared/context/context";
import UserService from "@/features/users/application/services/user-service";
import LpService from "@/features/lps/application/services/lp-service";

describe("useContext", () => {
  it("should provide userService and lpService", () => {
    const { userService, lpService } = useContext.getState();

    expect(userService).toBeDefined();
    expect(lpService).toBeDefined();
  });

  it("should provide the same userService instance", () => {
    const { userService } = useContext.getState();
    const { userService: userService2 } = useContext.getState();

    expect(userService).toBe(userService2);
  });
});
