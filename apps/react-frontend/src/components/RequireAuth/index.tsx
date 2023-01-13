import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const authed = Cookies.get("expiresAt") ? true : false;

  return authed === true ? children : <Navigate to="/sign-in" replace />;
};

export default RequireAuth;
