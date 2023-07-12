import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

export const DatingApp = () => {
  const navigate = useNavigate();
  const user = useOutletContext();

  console.log("@@@@@@@@@@@@@", user);

  return (
    <>
      <Outlet />
      app
    </>
  );
};
