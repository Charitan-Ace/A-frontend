import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import APIClient from "@/api/client";
import AuthService from "@/api/auth/service/auth-service";
import { LoginFormValues, loginSchema } from "../validation/loginSchema";
const useLoginForm = (linkRedirect: string) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const apiClient = new APIClient("http://localhost:8080");
  const authService = new AuthService(apiClient);

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
      const response = await authService.login(data.email, data.password);

      if (response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
        return;
      }

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
