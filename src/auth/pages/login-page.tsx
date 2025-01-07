import React, { useState } from "react";
import { useForm } from "react-hook-form";
import APIClient from "@/api/client";
import AuthService from "@/api/auth/service/auth-service";
import BreadcrumbHeader from "@/components/breadcrumb-header";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const apiClient = new APIClient("http://localhost:8080");
  const authService = new AuthService(apiClient);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Submitting login data:", data);
      const response = await authService.login(data.email, data.password);
      if (response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
        return;
      }

      console.log("Login successful:", response);
      toast.success("Logged in successfully!");
      reset();
      // navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
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
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
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
          >
            Login
          </Button>

          <Typography variant="body2" align="center" className="mt-2">
            <a href="/forgot-password" className="text-primary hover:underline">
              Forgot your password?
            </a>
          </Typography>

          <Typography variant="body2" align="center" className="mt-1">
            Don't have an account?{" "}
            <a href="/auth/signup" className="text-primary hover:underline">
              Sign Up
            </a>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export { LoginPage };
