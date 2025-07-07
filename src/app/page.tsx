import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center gap-10 min-h-screen flex-col">
      <h1 className="text-4xl">크래빗 new 아키텍쳐 테스트</h1>

      <div className="flex items-center gap-5">
        <Link href="/profile">Profile</Link>
        <Link href="/lps">Lps</Link>
        <Link href="/login">login</Link>
      </div>
    </div>
  );
}
