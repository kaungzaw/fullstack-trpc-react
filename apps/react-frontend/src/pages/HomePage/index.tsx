import { trpcProxyClient } from "react-frontend/src/utils/trpc";
import { Button } from "@chakra-ui/react";

const HomePage = () => {
  const signUp = async () => {
    const data = await trpcProxyClient.auth.signUp.mutate({
      email: "hello@world.hw",
      password: "HelloWorld@123",
    });
    console.log(data);
  };

  const signIn = async () => {
    const data = await trpcProxyClient.auth.signIn.mutate({
      email: "hello@world.hw",
      password: "HelloWorld@123",
    });
    console.log(data);
  };

  const getUsers = async () => {
    const data = await trpcProxyClient.user.getAllUsers.query();
    console.log(data);
    console.log(document.cookie);
    // console.log(new Date(Number(document.cookie.split("=")[1])));
  };

  const signOut = async () => {
    const data = await trpcProxyClient.auth.signOut.mutate();
    console.log(data);
  };

  return (
    <div>
      <button onClick={signUp}>sign up</button>
      <button onClick={signIn}>sign in</button>
      <button onClick={getUsers}>getUsers</button>
      <button onClick={signOut}>sign out</button>
      <Button>OK</Button>
    </div>
  );
};

export default HomePage;
