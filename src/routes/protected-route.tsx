import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/auth";

interface ProtectedRouteProps {
  allowedRoles: string[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectTo = "/auth/login",
}) => {
  const { auth, isLoading, getUser } = useAuthContext();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth || !auth.roleId || !auth.active) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!allowedRoles.includes(auth.roleId)) {
    return <Navigate to="/error/403" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
