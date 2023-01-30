import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { trpcProxyClient } from "utils/trpc";
import routeNames from "constants/routeNames";

interface SignInData {
  expiresAt: string;
  userId: string;
}

const RootLayout = () => {
  const { expiresAt, userId } = useLoaderData() as SignInData;
  const navigate = useNavigate();

  console.log({ expiresAt, userId });

  const signOut = async () => {
    const signedInUserId = localStorage.getItem("userId");
    const userId = await trpcProxyClient.auth.signOut.mutate();
    if (signedInUserId === userId) {
      localStorage.removeItem("expiresAt");
      localStorage.removeItem("userId");
      navigate(routeNames.SIGN_IN);
    } else {
      console.log("invalid userId");
    }
  };

  return (
    <>
      <Button onClick={signOut}>Sign Out</Button>
      <Outlet />
    </>
  );
};

export default RootLayout;
