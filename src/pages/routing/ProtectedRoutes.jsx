import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export const ProtectedRoute = () => {
  const { loading, user } = useAuthContext();
  return loading ? (
    <p>Loading</p>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
};
