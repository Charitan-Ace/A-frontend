import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "@/auth";
import { MainLayout } from "@/layout";
import { ProjectPage } from "@/pages/project";
import { SearchPage } from "@/pages/search";
import { HomePage } from "@/pages/home";
import { DonationPage } from "@/pages/donation";
import { ProfilePage } from "@/pages/profile";
import { LoginForm, SignUp } from "@/auth/pages";

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      {/* <Route element={<RequireAuth />}> */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<ProfilePage />} />
          <Route path="setting" element={<ProfilePage />} />
          <Route path="history" element={<ProfilePage />} />
          <Route path="projects" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/donation" element={<DonationPage />} />
        {/* <Route path="/project" element={<ProjectPage />} /> */}
        <Route path="/project/search" element={<SearchPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Route>

      {/*<Route path="error/*" element={<ErrorsRouting />} />*/}

      {/* Auth routes */}
      <Route path="auth/*" element={<AuthRoutes />} />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
