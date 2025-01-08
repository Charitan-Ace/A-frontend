import React from "react";
import { Select, TextField } from "@mui/material";
import { Button } from "@/components/ui/button";

const CharityFormUI = ({
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
        label="Company Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("profile.companyName")}
        error={!!errors.profile?.companyName}
        helperText={errors.profile?.companyName?.message}
      />

      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("profile.address")}
        error={!!errors.profile?.address}
        helperText={errors.profile?.address?.message}
      />

      {/* <TextField
        label="Tax Code"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("profile.taxCode")}
        error={!!errors.profile?.taxCode}
        helperText={errors.profile?.taxCode?.message}
      /> */}
      <Select
        native
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("profile.taxCode")}
        error={!!errors.profile?.taxCode}
        helperText={errors.profile?.taxCode?.message}
        className="mt-3"
      >
        <option value="" disabled>
          Tax Code
        </option>
        <option value="COMPANY">Company</option>
        <option value="INDIVIDUAL">Individual</option>
      </Select>

      <Button
        type="submit"
        color="primary"
        className="bg-primary hover:bg-primary hover:opacity-80 transition-all duration-100 ease-in-out w-full my-4 py-5 font-montserrat"
      >
        Register as Charity
      </Button>
    </form>
  );
};

export default CharityFormUI;
