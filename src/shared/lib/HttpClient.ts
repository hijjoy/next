import { env } from "@/shared/env";

export class HttpClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;
  private readonly isServer: boolean;

  constructor(
    baseUrl?: string,
    defaultHeaders: Record<string, string> = {},
    isServer: boolean = typeof window === "undefined"
  ) {
    this.baseUrl =
      baseUrl ??
      (process.env.NEXT_PUBLIC_API_URL || env.NEXT_PUBLIC_API_URL || "");
    this.defaultHeaders = defaultHeaders;
    this.isServer = isServer;
  }

  private async fetchWithAuth(input: RequestInfo, init?: RequestInit) {
    const headers: Record<string, string> = {
      ...this.defaultHeaders, // <- defaultHeaders(Authorization 등) 포함
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

    // 서버 환경이면 refresh 시도 없이 바로 반환
    if (this.isServer) {
      return res;
    }

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

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await this.fetchWithAuth(this.baseUrl + url, {
      ...options,
      method: "GET",
      headers: {
        ...this.defaultHeaders,
        ...(options?.headers || {}),
      },
    });
    if (!res) throw new Error("Unauthorized or fetch failed");
    return res.json();
  }

  async post<T>(url: string, body?: any, options?: RequestInit): Promise<T> {
    const res = await this.fetchWithAuth(this.baseUrl + url, {
      ...options,
      method: "POST",
      headers: {
        ...this.defaultHeaders,
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res) throw new Error("Unauthorized or fetch failed");
    return res.json();
  }

  async put<T>(url: string, body?: any, options?: RequestInit): Promise<T> {
    const res = await this.fetchWithAuth(this.baseUrl + url, {
      ...options,
      method: "PUT",
      headers: {
        ...this.defaultHeaders,
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res) throw new Error("Unauthorized or fetch failed");
    return res.json();
  }

  async patch<T>(url: string, body?: any, options?: RequestInit): Promise<T> {
    const res = await this.fetchWithAuth(this.baseUrl + url, {
      ...options,
      method: "PATCH",
      headers: {
        ...this.defaultHeaders,
        ...(options?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res) throw new Error("Unauthorized or fetch failed");
    return res.json();
  }

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await this.fetchWithAuth(this.baseUrl + url, {
      ...options,
      method: "DELETE",
      headers: {
        ...this.defaultHeaders,
        ...(options?.headers || {}),
      },
    });
    if (!res) throw new Error("Unauthorized or fetch failed");
    return res.json();
  }
}
