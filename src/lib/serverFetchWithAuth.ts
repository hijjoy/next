// lib/serverFetchWithAuth.ts (SSR)
import { cookies } from "next/headers";

/**
 * SSR 환경에서 인증이 필요한 fetch를 수행합니다.
 * - 미들웨어에서 토큰 갱신 및 쿠키 세팅을 담당하므로,
 *   이 함수는 단순히 쿠키를 포함해서 요청만 합니다.
 * - 401이면 null 반환, 재시도/refresh는 하지 않습니다.
 */
export async function serverFetchWithAuth(path: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Cookie: cookieStore.toString(),
    },
    credentials: "include",
  });

  if (res.status === 401) {
    // 미들웨어에서 refresh 처리, 여기서는 null만 반환
    return null;
  }

  return res;
}
