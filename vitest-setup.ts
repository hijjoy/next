import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LpService from "@/features/lps/application/services/lp-service";
import { LpClient } from "@/features/lps/infrastructure/apis/lp-client";
import { UserClient } from "@/features/users/infrastructure/apis/user-client";
import UserService from "@/features/users/application/services/user-service";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  LpService.resetInstance();
  LpClient.resetInstance();
  UserClient.resetInstance();
  UserService.resetInstance();
  console.log("beforeEach - 인스턴스 초기화 🌀");
});
