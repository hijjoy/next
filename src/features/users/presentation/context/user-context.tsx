import { create } from "zustand";
import { UserClient } from "../../infrastructure/apis/user-client";
import UserService from "../../application/services/user-service";
import { HttpClient } from "@/shared/lib/HttpClient";

const httpClient = new HttpClient();
const userClient = UserClient.getInstance(httpClient);
const userService = UserService.getInstance(userClient);

interface UserContextStore {
  userService: UserService;
  // 앞으로 다른 서비스도 여기에 추가 가능
}

export const useContext = create<UserContextStore>(() => ({
  userService,
}));
