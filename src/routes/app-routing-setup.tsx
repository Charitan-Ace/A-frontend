import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "@/auth";
import { MainLayout } from "@/layout";
import { ProjectPage } from "@/pages/project";
import { SearchPage } from "@/pages/search";
import { HomePage } from "@/pages/home";
import { DonationPage } from "@/pages/donation";
import { ProfilePage } from "@/pages/profile";

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      {/* Protected routes */}
      {/* <Route element={<RequireAuth />}> */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/project" element={<ProjectPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/donation" element={<DonationPage />} />

        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<HomePage />} />
          <Route path="transaction" element={<ProjectPage />} />
          <Route path="setting" element={<HomePage />} />
          <Route path="history" element={<HomePage />} />
          <Route path="projects" element={<HomePage />} />
        </Route>
      </Route>
      {/* </Route> */}

      {/*<Route path="error/*" element={<ErrorsRouting />} />*/}

      {/* Auth routes */}
      <Route path="auth/*" element={<AuthRoutes />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
