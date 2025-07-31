import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: 1, // Reduced retry attempts
        staleTime: 5 * 60 * 1000, // 5 minutes default stale time
        gcTime: 10 * 60 * 1000, // 10 minutes garbage collection time
        refetchOnMount: true,
      },
      mutations: {
        retry: 1,
        retryDelay: 1000,
      },
    },
  })