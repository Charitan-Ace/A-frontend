// useLoginForm.ts

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "../validation/loginSchema";
import { LoginInput } from "@/api/login/schema/login-schema";
import { useState } from "react";

interface UseLoginFormProps {
  onLogin: (data: LoginInput) => Promise<any>;
  onSuccess?: () => void; // optional success callback
  onError?: (error: unknown) => void; // optional error callback
  defaultValues?: Partial<LoginFormValues>;
}

export const useLoginForm = ({
  onLogin,
  onSuccess,
  onError,
  defaultValues,
}: UseLoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await onLogin({
        email: data.email,
        password: data.password,
      });
      if (response.status !== 200) {
        setIsError(true);
      }
      onSuccess?.();
      reset();
    } catch (error) {
      console.log("Login error:", error);
      onError?.(error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    showPassword,
    togglePasswordVisibility,
    isError,
  };
};
