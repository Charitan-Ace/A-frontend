import { LoginInput } from "@/api/login/schema/login-schema";
import BreadcrumbHeader from "@/components/breadcrumb-header";
import { LoginFormUI } from "@/components/login-form/login-form";
import useAuth from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLoginWithRedirect = async (data: LoginInput) => {
    try {
      await signIn(data);
      toast.success("Login successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error logging in. Please try again.");
    }
  };

  return (
    <div className="relative max-w-screen min-h-screen overflow-hidden">
      <BreadcrumbHeader />
      <div className="max-w-md mx-auto p-8 shadow-md rounded-md mt-20 bg-white">
        <LoginFormUI
          linkForgotPassword="/forgot-password"
          linkSignUp="/auth/signup"
          onLogin={handleLoginWithRedirect}
        />
      </div>
    </div>
  );
};

export { LoginPage };
