import { cookies } from "next/headers";
import { HttpClient } from "@/shared/lib/HttpClient";
import { UserClient } from "@/features/users/infrastructure/apis/user-client";
import UserService from "@/features/users/application/services/user-service";

export async function getSSRUserContext() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const httpClient = new HttpClient(undefined, {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  });
  const userClient = UserClient.getInstance(httpClient);
  const userService = UserService.getInstance(userClient);

  return { userService };
}
