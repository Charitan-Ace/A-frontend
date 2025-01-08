import { RegisterInput } from "@/api/auth/schema/signup-schema";
import useAuth from "@/hooks/use-auth";

const SignupService = () => {
  const { signUp } = useAuth();

  const handleSignup = async (signupInfo: RegisterInput) => {
    try {
      console.log(666, "SignupService", signupInfo);
      await signUp(signupInfo);
      console.log("Signup successful!");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return { signUp, handleSignup };
};

export default SignupService;
