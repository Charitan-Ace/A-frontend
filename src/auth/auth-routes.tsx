import { Navigate, Route, Routes, useNavigate } from "react-router";
import { LoginPage, SignUp } from "@/auth/pages";
import { useAuthContext } from "./use-auth-context";

const AuthRoutes = () => {
  const { auth } = useAuthContext();
  const route = useNavigate();
  if (auth) {
    route("/")
  }
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AuthRoutes };
