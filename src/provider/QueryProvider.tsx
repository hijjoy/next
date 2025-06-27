"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import getQueryClient from "@/configs/tanstack-query/get-query-client";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const client = getQueryClient();

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
