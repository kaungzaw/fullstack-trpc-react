import { useState, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, Center, Spinner } from "@chakra-ui/react";
import { Provider as TRPCProvider, trpcClient } from "./utils/trpc";
import routes from "./routes";

const router = createBrowserRouter(routes);

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <TRPCProvider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Suspense
            fallback={
              <Center mt={10}>
                <Spinner />
              </Center>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
        </ChakraProvider>
      </QueryClientProvider>
    </TRPCProvider>
  );
};

export default App;
