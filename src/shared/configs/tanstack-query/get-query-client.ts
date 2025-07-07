import {
  defaultShouldDehydrateQuery,
  isServer,
  Query,
  QueryClient,
} from "@tanstack/react-query";

const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    dehydrate: {
      shouldDehydrateQuery: (query: Query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
    },
  },
};

function makeQueryClient() {
  return new QueryClient(queryClientOptions);
}

let browserQueryClient: QueryClient | undefined;

export default function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}
