import { NextRequest, NextResponse } from "next/server";
import {
  ResponseCookies,
  RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import { jwtDecode } from "jwt-decode";

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

  // accessToken 만료 여부 확인
  if (isJwtExpired(accessToken) && refreshToken) {
    console.log("accessToken 만료");
    // accessToken이 만료된 경우 바로 refresh 로직 실행
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

  // accessToken이 만료되지 않은 경우 기존대로 API 요청
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

function isJwtExpired(token: string): boolean {
  try {
    const payload: { exp: number } = jwtDecode(token);
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export const config = {
  matcher: ["/me/:path*", "/profile/:path*"], // 보호 경로만 적용
};

/**
 * 유효시간으로 했을때의 장단점
 * 장점
 * 1. API 호출을 줄일 수 있음: 만료된 토큰으로 불필요한 API 요청을 하지 않음.
 * 단점
 * 1. 서버와 클라이언트의 시간이 다르면 오차가 생길 수 있음(보통 수분 이내).
 * 2. accessToken이 JWT가 아니거나, exp 필드가 없다면 불가능.
 * 3. 서버에서 블랙리스트 처리(강제 로그아웃 등)된 토큰은 exp가 남아있어도 유효하지 않을 수 있음.
 *
 * API 요청 후 401 응답으로 판단하는 방식
 * 장점
 * 1. 서버가 최종적으로 토큰의 유효성을 판단하므로, exp가 없거나 서버에서 강제 만료된 경우도 감지 가능.
 * 2. JWT가 아니어도 사용 가능
 *
 * 단점
 * 1. 만료된 토큰으로 API를 호출했다가 401을 받고 다시 refresh 요청을 해야 하므로, 네트워크 낭비가 있음.
 *
 * -> 두 방식을 같이 사용해도됨
 */
