import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "@/auth";
import { ErrorsRouting } from "@/routes/errors";
import { HeheContent } from "@/pages/hehe";
import { DashboardContent } from "@/pages/dashboard";

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      {/*<Route element={<RequireAuth />}>*/}
      {/*<Route element={<Demo1Layout />}>*/}
      <Route path="/" element={<HeheContent />} />
      <Route path="/dashboard" element={<DashboardContent />} />
      <Route path="/project" element={<HeheContent />} />
      <Route path="/profile" element={<HeheContent />}>
        <Route path="/profile/list" element={<HeheContent />} />
      </Route>

      {/*  <Route*/}
      {/*    path="/public-profile/profiles/default"*/}
      {/*    element={<ProfileDefaultPage />}*/}
      {/*  />*/}
      {/*  <Route*/}
      {/*    path="/account/home/get-started"*/}
      {/*    element={<AccountGetStartedPage />}*/}
      {/*  />*/}
      {/*  <Route*/}
      {/*    path="/network/get-started"*/}
      {/*    element={<NetworkGetStartedPage />}*/}
      {/*  />*/}
      {/*</Route>*/}
      {/*</Route>*/}
      {/*<Route path="error/*" element={<ErrorsRouting />} />*/}
      <Route path="auth/*" element={<AuthRoutes />} />
      {/*<Route path="*" element={<Navigate to="/error/404" />} />*/}
    </Routes>
  );
};

export { AppRoutingSetup };
