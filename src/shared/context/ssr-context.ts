import { cookies } from "next/headers";
import { HttpClient } from "@/shared/lib/HttpClient";
import { UserClient } from "@/features/users/infrastructure/apis/user-client";
import UserService from "@/features/users/application/services/user-service";
import LpService from "@/features/lps/application/services/lp-service";
import { LpClient } from "@/features/lps/infrastructure/apis/lp-client";

// 싱글톤 말고, 인스턴스 직접 생성
export async function getSSRContext() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const httpClient = new HttpClient(undefined, {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  });
  const userClient = UserClient.createInstance(httpClient);
  const userService = UserService.createInstance(userClient);
  const lpClient = LpClient.createInstance(httpClient);
  const lpService = LpService.createInstance(lpClient);

  return { userService, lpService };
}
