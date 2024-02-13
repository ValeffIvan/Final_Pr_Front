import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const Redirect = () => {
  const {isAuth} = useAuth();
console.log(isAuth)
  if (!isAuth) return <Navigate to="/login" />;

  return <Outlet />;
};