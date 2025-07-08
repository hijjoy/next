import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "@/shared/context/context"; // zustand store import

export function withAllContexts(
  children: ReactNode,
  mockContext: Partial<ReturnType<typeof useContext.getState>>
) {
  const testClient = createTestQueryClient();

  // mockContext로 zustand store를 덮어씀
  useContext.setState(mockContext);

  return (
    <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
  );
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}
