import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";
import BreadcrumbHeader from "@/components/breadcrumb-header";
import AuthService from "@/api/auth/service/auth-service";
import APIClient from "@/api/client";
import { toast } from "sonner";

const SignUp = () => {
  const [isDonor, setIsDonor] = useState(true);

  const { register, handleSubmit, reset } = useForm();

  const apiClient = new APIClient("http://localhost:8080");
  const authService = new AuthService(apiClient);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting data:", data);
      await authService.register({
        // "donor5@email.com",
        // "testpassword",
        // "DONOR",
        email: "charity4d@gmail.com",
        password: "testpassword",
        role: "CHARITY",
        profile: {
          companyName: "Halo",
          taxCode: "123",
          address: "RMIT UNI_12",
          organizationType: "INDIVIDUAL",
          // firstName: "first5",
          // lastName: "last5"
        },
      });
      toast.success("Registration successful!");
      reset();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleRoleToggle = () => {
    setIsDonor(!isDonor);
  };

  return (
    <div className="relative max-w-screen min-h-screen overflow-hidden">
      <BreadcrumbHeader />
      <div className="max-w-md mx-auto p-8 shadow-md rounded-md mt-20 bg-white">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className="text-primary font-semibold"
        >
          Join us today!
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={!isDonor}
              onChange={handleRoleToggle}
              color="primary"
            />
          }
          label={isDonor ? "Register as Donor" : "Register as Charity"}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password")}
          />

          {isDonor ? (
            <>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("profile.firstName")}
              />

              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("profile.lastName")}
              />

              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("profile.phoneNumber")}
              />
            </>
          ) : (
            <>
              <TextField
                label="Company Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("profile.companyName")}
              />

              <TextField
                label="Tax Code"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("profile.taxCode")}
              />

              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("profile.address")}
              />
            </>
          )}

          <Button
            type="submit"
            color="primary"
            className="bg-primary hover:bg-primary hover:opacity-80 transition-all duration-100 ease-in-out w-full my-4 py-5 font-montserrat"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export { SignUp };
