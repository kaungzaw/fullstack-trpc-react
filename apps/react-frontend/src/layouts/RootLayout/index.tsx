import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div>RootLayout</div>
      <Outlet />
    </>
  );
};

export default RootLayout;
