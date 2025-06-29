import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { serverFetchWithAuth } from "@/lib/serverFetchWithAuth";
import UserInfo from "./_components/user-info";
import getQueryClient from "@/configs/tanstack-query/get-query-client";

async function fetchUser() {
  console.log("=== SSR prefetch 실행 ===");

  const res = await serverFetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/users/me`
  );
  if (!res?.ok) return null;

  return res.json();
}

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserInfo />
    </HydrationBoundary>
  );
}
