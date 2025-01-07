import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@/components/ui/button";

const DonorFormUI = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
}: {
  register: any;
  handleSubmit: any;
  onSubmit: any;
  errors: any;
}) => {
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
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("profile.firstName")}
        error={!!errors.profile?.firstName}
        helperText={errors.profile?.firstName?.message}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("profile.lastName")}
        error={!!errors.profile?.lastName}
        helperText={errors.profile?.lastName?.message}
      />
      {/* <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("profile.phoneNumber")}
      /> */}
      <Button
        type="submit"
        color="primary"
        className="bg-primary hover:bg-primary hover:opacity-80 transition-all duration-100 ease-in-out w-full my-4 py-5 font-montserrat"
      >
        Register as Donor
      </Button>
    </form>
  );
};

export default DonorFormUI;
