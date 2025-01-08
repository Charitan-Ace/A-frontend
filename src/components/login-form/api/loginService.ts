import { LoginInput } from "@/api/auth/schema/login-schema";
import useAuth from "@/hooks/use-auth";

const LoginService = () => {
  const { signIn } = useAuth();

  const handleLogin = async (loginInfo: LoginInput) => {
    try {
      await signIn(loginInfo);
      console.log("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return { signIn, handleLogin };
};

export default LoginService;
