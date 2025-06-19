import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./src/pages/HomePage";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

const Application = () => {
  return (
    <QueryClientProvider client={client}>
      <HomePage />
    </QueryClientProvider>
  );
};

export default Application;
