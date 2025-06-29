import Link from "next/link";
import { serverFetchWithAuth } from "@/lib/serverFetchWithAuth";

export default async function ProfilePage() {
  const res = await serverFetchWithAuth("/v1/users/me");

  const { data } = await res?.json();

  if (!res) {
    return <div>에러다임마...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <Link href="/me">go Me (prefetch)</Link>
        <Link href="/my">go My (client)</Link>
      </div>
      <p>{data.name}</p>
    </div>
  );
}
