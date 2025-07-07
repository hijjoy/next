import { useMutation } from "@tanstack/react-query";
import { UserLoginReq } from "../../dto/request/user-login-req";
import { useContext } from "@/shared/context/context";
import { useRouter } from "next/navigation";

export function usePostLogin() {
  const { userService } = useContext();
  const router = useRouter();

  return useMutation({
    mutationFn: (params: UserLoginReq) => userService.login(params),
    onSuccess: (data) => {
      console.log(data);
      router.push("/profile");
    },
    onError: (error) => {
      console.log(error);
    },
  });
}
