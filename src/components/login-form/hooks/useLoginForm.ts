import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LoginFormValues, loginSchema } from "../validation/loginSchema";
import LoginService from "../api/loginService";
const useLoginForm = (linkRedirect: string) => {
  const { handleLogin } = LoginService();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await handleLogin({
        email: data.email,
        password: data.password,
      });

      toast.success("Logged in successfully!");
      reset();
      navigate(linkRedirect);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    showPassword,
    togglePasswordVisibility,
  };
};

export default useLoginForm;
