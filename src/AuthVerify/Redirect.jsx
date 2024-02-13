import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const Redirect = () => {
  const {isAuth} = useAuth();

  if (!isAuth) return <Navigate to="/login" />;

  return <Outlet />;
};