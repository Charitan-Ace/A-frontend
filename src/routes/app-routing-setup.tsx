import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "@/auth";
import { MainLayout } from "@/layout";
import { ProjectPage } from "@/pages/project";
import { SearchPage } from "@/pages/search";
import { HomePage } from "@/pages/home";
import { DonationPage } from "@/pages/donation";
import { ProfilePage } from "@/pages/profile";
import ProtectedRoute from "./protected-route";

const AppRoutingSetup = (): ReactElement => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/search" element={<SearchPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute allowedRoles={["DONOR", "CHARITY"]} />}>
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route path="/donation" element={<DonationPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["CHARITY"]} />}>
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project/manage" element={<ProjectPage />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
