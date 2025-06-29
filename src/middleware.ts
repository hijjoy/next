import { NextRequest, NextResponse } from "next/server";
import {
  ResponseCookies,
  RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";

export default async function middleware(req: NextRequest) {
  // 1. 쿠키에서 토큰 추출
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // // 2. 보호 경로만 처리 (matcher로도 가능)
  // const { pathname } = req.nextUrl;
  // if (!pathname.startsWith("/me") && !pathname.startsWith("/profile")) {
  //   return NextResponse.next();
  // }

  // 3. accessToken이 없으면 로그인 리다이렉트
  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4. 보호 API에 accessToken으로 요청 (예: /v1/users/me)
  // TODO: 이 요청이 정말 필요한가 확인..
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  // 5. accessToken 만료(401)면 refresh 시도
  if (apiRes.status === 401 && refreshToken) {
    const cookieHeader = `refreshToken=${refreshToken}`;
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader,
        },
        credentials: "include",
      }
    );

    if (refreshRes.ok) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await refreshRes.json();

      // 새 토큰 쿠키 세팅
      const response = NextResponse.next();
      response.cookies.set("accessToken", newAccessToken, {
        path: "/",
        httpOnly: true,
      });
      response.cookies.set("refreshToken", newRefreshToken, {
        path: "/",
        httpOnly: true,
      });

      // applySetCookie로 헤더 오버라이드
      applySetCookie(req, response);

      return response;
    } else {
      // refresh 실패 → 로그인 리다이렉트
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 6. 기타(정상) → 통과
  return NextResponse.next();
}

// applySetCookie 함수
function applySetCookie(req: NextRequest, res: NextResponse): void {
  const setCookies = new ResponseCookies(res.headers);
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  NextResponse.next({ request: { headers: newReqHeaders } }).headers.forEach(
    (value, key) => {
      if (
        key === "x-middleware-override-headers" ||
        key.startsWith("x-middleware-request-")
      ) {
        res.headers.set(key, value);
      }
    }
  );
}

export const config = {
  matcher: ["/me/:path*", "/profile/:path*"], // 보호 경로만 적용
};
