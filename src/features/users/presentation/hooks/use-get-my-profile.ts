import { useContext } from "@/shared/context/context";
import { queryOptions } from "@tanstack/react-query";

export function useGetMyProfile() {
  const { userService } = useContext();

  return queryOptions({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
  });
}
