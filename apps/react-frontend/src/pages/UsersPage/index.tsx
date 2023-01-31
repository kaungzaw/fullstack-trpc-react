import { trpc } from "utils/trpc";

const UsersPage = () => {
  const { data, isLoading } = trpc.user.getAllUsers.useQuery();

  return (
    <>
      <div>UsersPage</div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        data && data.map((i) => <div key={i.id}>{i.email}</div>)
      )}
    </>
  );
};

export default UsersPage;
