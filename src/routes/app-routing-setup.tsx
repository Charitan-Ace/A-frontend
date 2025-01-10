import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "@/auth";
import { MainLayout } from "@/layout";
import { HomePage } from "@/pages/home";
import { DonationPage } from "@/pages/donation";
import CreateProjectForm from "@/pages/project/_component/create-project-form";
import { SearchPage } from "@/pages/search";

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      {/* <Route element={<RequireAuth />}> */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create"
          element={
            <div className="mt-24 container flex items-center justify-center mx-auto">
              <CreateProjectForm />
            </div>
          }
        />
        {/* <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<ProfilePage />} />
          <Route path="setting" element={<ProfilePage />} />
          <Route path="history" element={<ProfilePage />} />
          <Route path="projects" element={<ProfilePage />} />
        </Route> */}

        {/* Authentication routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route path="/donation" element={<DonationPage />} />
        {/* <Route path="/project" element={<ProjectPage />} /> */}
        <Route path="/project/search" element={<SearchPage />} />
        {/* <Route path="/project/:id" element={<ProjectDetailPage />} /> */}
      </Route>

      {/*<Route path="error/*" element={<ErrorsRouting />} />*/}

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
