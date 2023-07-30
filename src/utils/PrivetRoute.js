import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UsernameContext } from "../pages/UserNameContext";

export const PrivateRoutes = () => {
  const { username } = useContext(UsernameContext);

  return username ? <Outlet /> : <Navigate to='/signin' />;
};
