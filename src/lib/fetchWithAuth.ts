export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string>),
  };

  const method = (init?.method || "GET").toUpperCase();
  if (["POST", "PUT", "PATCH"].includes(method) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  let res = await fetch(input, {
    ...init,
    credentials: "include",
    headers,
  });

  if (res.status !== 401) return res;

  // 클라이언트 환경: accessToken 만료 → refresh 요청
  const refreshRes = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!refreshRes.ok) {
    window.location.href = "/login";
    return res;
  }

  const data = await refreshRes.json();
  if (!data.accessToken) {
    window.location.href = "/login";
    return res;
  }

  // 새 토큰으로 재시도
  return fetch(input, {
    ...init,
    credentials: "include",
    headers: {
      ...headers,
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
}
