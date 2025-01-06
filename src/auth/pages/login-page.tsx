import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import APIClient from "@/api/client";
import AuthService from "@/api/auth/service/auth-service";
import { loginSchema } from "@/api/auth/schema/login-schema";
import BreadcrumbHeader from "@/components/breadcrumb-header";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const apiClient = new APIClient("http://localhost:8080");
  const authService = new AuthService(apiClient);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // ------------------- submit ---------------------

  const onSubmit = async (data: FormData) => {
    await loginUser(data.email, data.password);
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);

      console.log("Login successful:", response);

      toast.success("Logged in successfully!");
      reset();

      // navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="relative max-w-screen min-h-screen overflow-hidden">
      <BreadcrumbHeader />
      <div className="max-w-md mx-auto p-8 shadow-md rounded-md mt-20 bg-white">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
            color="primary"
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            color="primary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            color="primary"
            className="bg-primary hover:bg-primary hover:opacity-80 transition-all duration-100 ease-in-out w-full my-4 py-5 font-montserrat"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <Typography variant="body2" align="center" className="mt-2">
            <a href="/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </a>
          </Typography>

          <Typography variant="body2" align="center" className="mt-1">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Sign Up
            </a>
          </Typography>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export { LoginPage };
