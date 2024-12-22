import { Navigate, Route, Routes } from "react-router";
import { LoginForm, SignUp } from "@/auth/pages";

const AuthRoutes = () => (
  <Routes>
    <Route index element={<LoginForm />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="*" element={<Navigate to="/error/404" />} />
  </Routes>
);

export { AuthRoutes };
