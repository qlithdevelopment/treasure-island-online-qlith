import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoutes() {
  const { isAuthenticated, loading } = useAuth();
  const hasLocalToken =
    typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

  if (hasLocalToken || isAuthenticated) {
    return <Outlet />;
  }

  if (loading && hasLocalToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-text">
        Checking authentication...
      </div>
    );
  }

  return <Navigate to="/login" replace />;
}
