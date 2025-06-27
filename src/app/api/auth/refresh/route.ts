import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await res.json();
  console.log(data, "리프레시 호출");

  const response = NextResponse.json({
    success: true,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
  response.cookies.set("accessToken", data.accessToken, {
    httpOnly: true,
    path: "/",
  });
  response.cookies.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
