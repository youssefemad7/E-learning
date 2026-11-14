import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  user: object | null;
};

export default function ProtectedRoute({ user }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
