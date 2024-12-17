import { Navigate, Route, Routes } from "react-router";
import { Login, SignUp } from "@/auth/pages";

const AuthRoutes = () => (
  <Routes>
    <Route index element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="*" element={<Navigate to="/error/404" />} />
  </Routes>
);

export { AuthRoutes };
