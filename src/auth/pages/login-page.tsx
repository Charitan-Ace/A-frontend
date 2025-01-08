import BreadcrumbHeader from "@/components/breadcrumb-header";
import LoginFormUI from "@/components/login-form/login-form";

const LoginPage = () => {
  return (
    <div className="relative max-w-screen min-h-screen overflow-hidden">
      <BreadcrumbHeader />
      <div className="max-w-md mx-auto p-8 shadow-md rounded-md mt-20 bg-white">
        <LoginFormUI
          linkRedirect={"/profile"}
          linkForgotPassword={"/forgot-password"}
          linkSignUp={"/auth/signup"}
        />
      </div>
    </div>
  );
};

export { LoginPage };
