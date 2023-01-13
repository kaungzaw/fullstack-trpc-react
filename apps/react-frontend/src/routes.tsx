import type { RouteObject } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import RootLayout from "./layouts/RootLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import UsersPage from "./pages/UsersPage";

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "users",
        element: (
          <RequireAuth>
            <UsersPage />
          </RequireAuth>
        ),
      },
      {
        path: "settings",
        element: (
          <RequireAuth>
            <SettingsPage />
          </RequireAuth>
        ),
      },
    ],
  },
];

export default routes;
