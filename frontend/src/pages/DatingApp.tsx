import { Outlet, useOutletContext } from "react-router-dom";
import { DatingAppWrapper } from "../features/DatingApp/components/Wrapper";

export const DatingApp = () => {
  const user = useOutletContext();
  console.log("@@@@@@@@@@@@@", user);

  return <DatingAppWrapper Outlet={Outlet} />;
};
