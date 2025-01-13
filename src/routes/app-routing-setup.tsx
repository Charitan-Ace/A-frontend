import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "@/auth";
import { MainLayout } from "@/layout";
import { SearchPage } from "@/pages/search";
import { HomePage } from "@/pages/home";
import { DonationPage } from "@/pages/donation";
import { ProfilePage } from "@/pages/profile";
import ProtectedRoute from "./protected-route";
import { ProjectDetailPage, ProjectPage } from "@/pages/project";
import CreateProjectForm from "@/pages/project/_component/create-project-form";
import TestPage from "@/pages/test/test-page";

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/create" element={<CreateProjectForm />} />
        <Route path="/project" element={<SearchPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route element={<ProtectedRoute allowedRoles={[]} />}>
          <Route path="/project/search" element={<SearchPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute allowedRoles={["DONOR", "CHARITY"]} />}>
          <Route path="/profile/*" element={<ProfilePage />} />
        </Route>

        <Route path="/donation" element={<DonationPage />} />

        <Route path="/project" element={<ProjectPage />} />
        <Route path="/project/manage" element={<ProjectPage />} />

        <Route path="/test-connection" element={<TestPage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
