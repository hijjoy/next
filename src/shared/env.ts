import { z } from "zod";

// 1. 환경 변수 스키마 정의
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8000"),

  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid environment variables:\n", result.error.format());
  throw new Error("Environment variable validation failed");
}

export const env = result.data;
