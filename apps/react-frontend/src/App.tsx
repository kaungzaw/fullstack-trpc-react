import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as TRPCProvider, trpcClient } from "./utils/trpc";
import routes from "./routes";

const router = createBrowserRouter(routes);

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <TRPCProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </TRPCProvider>
  );
};

export default App;