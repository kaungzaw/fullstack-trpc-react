import { useState } from "react";
import { trpcProxyClient } from "react-frontend/src/utils/trpc";

const SignInPage = () => {
  const [email, setEmail] = useState("hello@world.hw");
  const [password, setPassword] = useState("HelloWorld@123");

  const signIn = async () => {
    const data = await trpcProxyClient.auth.signIn.mutate({
      email,
      password,
    });
    console.log(data);
  };

  return (
    <>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={signIn}>sign in</button>
      </div>
    </>
  );
};

export default SignInPage;
