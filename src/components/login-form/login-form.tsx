// LoginFormUI.tsx

import React from "react";
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { LoginInput } from "@/api/login/schema/login-schema";
import { useLoginForm } from "./hooks/useLoginForm";

interface LoginFormProps {
  linkForgotPassword: string;
  linkSignUp: string;

  onLogin: (data: LoginInput) => Promise<any>;

  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const LoginFormUI: React.FC<LoginFormProps> = ({
  linkForgotPassword,
  linkSignUp,
  onLogin,
  onSuccess,
  onError,
}) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isError,
    showPassword,
    togglePasswordVisibility,
  } = useLoginForm({ onLogin, onSuccess, onError });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={togglePasswordVisibility}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {isError && (
        <Typography variant="body2" color="error" align="center">
          Error occur, please try again
        </Typography>
      )}

      <Button
        type="submit"
        color="primary"
        className="bg-primary hover:bg-primary hover:opacity-80 transition-all duration-100 ease-in-out w-full my-4 py-5 font-montserrat"
      >
        Login
      </Button>

      {/* <Typography variant="body2" align="center" className="mt-2">
        <a href={linkForgotPassword} className="text-primary hover:underline">
          Forgot your password?
        </a>
      </Typography> */}

      <Typography variant="body2" align="center" className="mt-1">
        Don&apos;t have an account?{" "}
        <a href={linkSignUp} className="text-primary hover:underline">
          Sign Up
        </a>
      </Typography>
    </form>
  );
};
