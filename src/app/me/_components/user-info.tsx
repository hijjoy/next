"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchWithAuth } from "@/lib/fetchWithAuth";

async function fetchUser() {
  console.log("=== CSR  실행 ===");

  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/users/me`,
    {
      credentials: "include",
    }
  );
  if (res?.status === 401) throw new Error("401");
  if (!res?.ok) return null;
  return res?.json();
}

export default function UserInfo() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>권한 없음</div>;
  if (!data) return <div>데이터 없음</div>;
  return <div>{`"${data.data.name}"`}</div>;
}
