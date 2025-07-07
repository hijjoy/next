import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import LpSection from "../sections/lp-section";
import { getSSRContext } from "@/shared/context/ssr-context";
import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";

export default async function LpView() {
  const queryClient = getQueryClient();
  const { lpService } = await getSSRContext();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["lp-list"],
    queryFn: ({ pageParam = 0 }) =>
      lpService.getLpList({ cursor: pageParam, limit: 10 }),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LpSection />
    </HydrationBoundary>
  );
}
