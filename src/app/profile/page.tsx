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
      <Link href="/me">go Me</Link>
      <p>{data.name}</p>
    </div>
  );
}
