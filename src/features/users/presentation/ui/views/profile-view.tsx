import getQueryClient from "@/shared/configs/tanstack-query/get-query-client";
import ProfileSection from "../sections/profile-section";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getSSRContext } from "@/shared/context/ssr-context";
import Link from "next/link";

export default async function ProfileView() {
  const queryClient = getQueryClient();
  const { userService } = await getSSRContext();

  queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col gap-4">
      <HydrationBoundary state={dehydratedState}>
        <ProfileSection />
      </HydrationBoundary>
      <Link href="/lps">Lps</Link>
    </div>
  );
}
