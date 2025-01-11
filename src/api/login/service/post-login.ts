import { LoginInput } from "@/api/login/schema/login-schema";
import useAuth from "@/hooks/use-auth";

export const handleLogin = async (loginInfo: LoginInput) => {
  const { signIn } = useAuth();

  try {
    await signIn(loginInfo);
    console.log("Login successful!");
  } catch (error) {
    console.error("Error during login:", error);
  }
};
