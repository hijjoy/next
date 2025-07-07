import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useContext } from "@/shared/context/context";
import LpService from "../../application/services/lp-service";
import { LpListRes } from "../../dto/response/lp-list-res";

export const getInfiniteLpListOptions = (lpService: LpService) => ({
  queryKey: ["lp-list"],
  queryFn: ({ pageParam = 0 }) =>
    lpService.getLpList({
      cursor: pageParam,
      limit: 10,
    }),
  getNextPageParam: (lastPage: LpListRes) =>
    lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  initialPageParam: 0,
});

export function useGetInfiniteLpList() {
  const { lpService } = useContext();

  return useSuspenseInfiniteQuery(getInfiniteLpListOptions(lpService));
}
