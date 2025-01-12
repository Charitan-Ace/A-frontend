import BreadcrumbHeader from "@/components/breadcrumb-header";
import SignUpFormUI from "@/components/signup-form/signup-form";
import { RegisterInput } from "@/api/signup/schema/signup-schema";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "@/hooks/use-auth";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSignUp = async (data: RegisterInput) => {
    try {
      const response = await signUp(data);
      toast.success("Registration successful!");

      if (response && response?.status === 200) {
        navigate("/auth/login");
      }
      return response;
    } catch (error) {
      console.error("Sign up failed:", error);
      toast.error("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="relative max-w-screen min-h-screen overflow-hidden">
      <BreadcrumbHeader />
      <SignUpFormUI handleSignup={handleSignUp} />
    </div>
  );
};

export { SignUp };
