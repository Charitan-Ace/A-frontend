import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/auth";

interface ProtectedRouteProps {
  allowedRoles: string[]; // Roles allowed to access the route
  redirectTo?: string; // Default to "/auth/login" if not specified
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectTo = "/auth/login",
}) => {
  const { auth } = useAuthContext();

  if (!auth || !auth.role || !auth.active) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return <Navigate to="/error/403" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
