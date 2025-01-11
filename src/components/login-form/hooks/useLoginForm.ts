// useLoginForm.ts

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "../validation/loginSchema";
import { LoginInput } from "@/api/login/schema/login-schema";
import { useState } from "react";

interface UseLoginFormProps {
  onLogin: (data: LoginInput) => Promise<void>;
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
      await onLogin({
        email: data.email,
        password: data.password,
      });
      onSuccess?.(); // only call onSuccess if provided
      reset();
    } catch (error) {
      onError?.(error); // only call onError if provided
    }
  };

  return {
    // Return pieces needed for UI rendering
    register,
    handleSubmit,
    onSubmit,
    errors,
    showPassword,
    togglePasswordVisibility,
  };
};
