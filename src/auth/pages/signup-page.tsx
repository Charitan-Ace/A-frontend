import React from "react";
import BreadcrumbHeader from "@/components/breadcrumb-header";
import SignUpFormUI from "@/components/signup-form/SignUpForm";

const SignUp = () => {
  return (
    <div className="relative max-w-screen min-h-screen overflow-hidden">
      <BreadcrumbHeader />
      <SignUpFormUI />
    </div>
  );
};

export { SignUp };
