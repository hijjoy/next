import { create } from "zustand";
import { HttpClient } from "@/shared/lib/HttpClient";
import { UserClient } from "@/features/users/infrastructure/apis/user-client";
import UserService from "@/features/users/application/services/user-service";
import LpService from "@/features/lps/application/services/lp-service";
import { LpClient } from "@/features/lps/infrastructure/apis/lp-client";

const httpClient = new HttpClient();
const userClient = UserClient.getInstance(httpClient);
const userService = UserService.getInstance(userClient);
const lpClient = LpClient.getInstance(httpClient);
const lpService = LpService.getInstance(lpClient);

interface UserContextStore {
  userService: UserService;
  lpService: LpService;
}

export const useContext = create<UserContextStore>(() => ({
  userService,
  lpService,
}));
