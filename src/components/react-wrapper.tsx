import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const ReactWrapper = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <slot />
    </QueryClientProvider>
  );
};
