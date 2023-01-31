import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { redirect } from "react-router-dom";
import { trpcProxyClient } from "utils/trpc";
import routeNames from "constants/routeNames";

const RootLayout = lazy(() => import("layouts/RootLayout"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const SignInPage = lazy(() => import("pages/SignInPage"));
const SignUpPage = lazy(() => import("pages/SignUpPage"));
const UsersPage = lazy(() => import("pages/UsersPage"));
const SettingsPage = lazy(() => import("pages/SettingsPage"));

const routes: Array<RouteObject> = [
  {
    path: routeNames.SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: routeNames.SIGN_UP,
    element: <SignUpPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    loader: async () => {
      // const expiresAt = localStorage.getItem("expiresAt");
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw redirect(routeNames.SIGN_IN);
      }
      const user = await trpcProxyClient.user.getUserById.query(userId);
      return { user };
    },
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routes;
