import { createTRPCReact } from "@trpc/react-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import Cookies from "js-cookie";
import type { AppRouter } from "backend/src/routers/_app";

const url = import.meta.env.VITE_API_URL ?? "";

export const trpc = createTRPCReact<AppRouter>();

const fetchFunction = async (
  url: RequestInfo | URL,
  options: RequestInit | undefined
) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    if (response.status === 401) {
      const expiresAt = Cookies.get("expiresAt");
      if (!expiresAt) {
        console.log("no token");
      } else {
        console.log("expired token");
        Cookies.remove("expiresAt");
      }
    }
  }
  return response;
};

export const Provider = trpc.Provider;

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url,
      fetch: fetchFunction,
    }),
  ],
});

export const trpcProxyClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url,
      fetch: fetchFunction,
    }),
  ],
});
