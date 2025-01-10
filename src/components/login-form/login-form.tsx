import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import useLoginForm from "./hooks/useLoginForm";

const LoginFormUI = ({
  linkRedirect,
  linkForgotPassword,
  linkSignUp,
}: {
  linkRedirect: string;
  linkForgotPassword: string;
  linkSignUp: string;
}) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    showPassword,
    togglePasswordVisibility,
  } = useLoginForm(linkRedirect);

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

      <Button
        type="submit"
        color="primary"
        className="bg-primary hover:bg-primary hover:opacity-80 transition-all duration-100 ease-in-out w-full my-4 py-5 font-montserrat"
      >
        Login
      </Button>

      <Typography variant="body2" align="center" className="mt-2">
        <a href={linkForgotPassword} className="text-primary hover:underline">
          Forgot your password?
        </a>
      </Typography>

      <Typography variant="body2" align="center" className="mt-1">
        Don't have an account?{" "}
        <a href={linkSignUp} className="text-primary hover:underline">
          Sign Up
        </a>
      </Typography>
    </form>
  );
};

export default LoginFormUI;
