import { create } from "zustand";
import { UserClient } from "../../infrastructure/apis/user-client";
import UserService from "../../application/services/user-service";
import { HttpClient } from "@/shared/lib/HttpClient";

const httpClient = new HttpClient();
const userClient = UserClient.getInstance(httpClient);
const userService = UserService.getInstance(userClient);

interface UserContextStore {
  userService: UserService;
}

export const useContext = create<UserContextStore>(() => ({
  userService,
}));
