import { QueryClient } from '@tanstack/react-query';

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 10000,
      retry: 5,
    },
  },
});
