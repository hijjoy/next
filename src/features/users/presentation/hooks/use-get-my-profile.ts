import { queryOptions } from "@tanstack/react-query";
import { useContext } from "../context/user-context";

export function useGetMyProfile() {
  const { userService } = useContext();

  return queryOptions({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
  });
}
