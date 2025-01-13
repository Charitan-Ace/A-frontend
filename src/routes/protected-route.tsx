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
  const { auth, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (allowedRoles.length === 0) {
    return <Outlet />;
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
