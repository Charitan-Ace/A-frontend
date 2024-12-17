import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthContext } from "./use-auth-context";
import { ScreenLoader } from "@/components/loaders";

const RequireAuth = () => {
  const { auth, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <ScreenLoader />;
  }

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export { RequireAuth };
