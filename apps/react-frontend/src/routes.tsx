import type { RouteObject } from "react-router-dom";
import { redirect } from "react-router-dom";
import routeNames from "constants/routeNames";
import RootLayout from "layouts/RootLayout";
import NotFoundPage from "pages/NotFoundPage";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import SettingsPage from "pages/SettingsPage";
import UsersPage from "pages/UsersPage";

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
    loader: () => {
      const expiresAt = localStorage.getItem("expiresAt");
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw redirect(routeNames.SIGN_IN);
      }
      return { expiresAt, userId };
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
