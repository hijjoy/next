import { cookies } from "next/headers";
import { HttpClient } from "@/shared/lib/HttpClient";
import { UserClient } from "@/features/users/infrastructure/apis/user-client";
import UserService from "@/features/users/application/services/user-service";

// 싱글톤 말고, 인스턴스 직접 생성
export async function getSSRContext() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const httpClient = new HttpClient(undefined, {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  });
  const userClient = UserClient.createInstance(httpClient);
  const userService = UserService.createInstance(userClient);

  return { userService };
}
