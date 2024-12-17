import { Navigate, Route, Routes } from "react-router";
import { Login, SignUp } from "@/auth/pages";

const AuthRoutes = () => (
  <Routes>
    {/*<Route element={<AuthBrandedLayout />}>*/}
    <Route index element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="*" element={<Navigate to="/error/404" />} />
    {/*</Route>*/}

    {/*<Route element={<AuthLayout />}>*/}
    {/*  <Route path="/classic/login" element={<Login />} />*/}
    {/*  <Route path="/classic/signup" element={<Signup />} />*/}
    {/*  <Route path="/classic/2fa" element={<TwoFactorAuth />} />*/}
    {/*  <Route path="/classic/check-email" element={<CheckEmail />} />*/}
    {/*  <Route path="*" element={<Navigate to="/error/404" />} />*/}
    {/*</Route>*/}
  </Routes>
);

export { AuthRoutes };
