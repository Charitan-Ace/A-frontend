import { Navigate, Route, Routes } from "react-router";
import { LoginPage, SignUp } from "@/auth/pages";

const AuthRoutes = () => (
  <Routes>
    <Route index element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="*" element={<Navigate to="/error/404" />} />
  </Routes>
);

export { AuthRoutes };
