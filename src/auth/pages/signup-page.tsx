import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import BreadcrumbHeader from "@/components/breadcrumb-header";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const [isDonor, setIsDonor] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
    console.log("Registration Data:", data);
    // You can integrate API calls here
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
          sx={{ display: "flex", justifyContent: "center", mb: 3 }}
        />

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Common Fields */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
            color="primary"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            color="primary"
          />

          {isDonor ? (
            <>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message?.toString()}
                color="primary"
              />

              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message?.toString()}
                color="primary"
              />
            </>
          ) : (
            <>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message?.toString()}
                color="primary"
              />

              <TextField
                label="Tax Code"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("taxCode", {
                  required: "Tax Code is required",
                  pattern: {
                    value: /^[A-Z0-9]+$/i,
                    message: "Invalid Tax Code format",
                  },
                })}
                error={!!errors.taxCode}
                helperText={errors.taxCode?.message?.toString()}
                color="primary"
              />

              {/* New organizationType Select Field */}
              <FormControl
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.organizationType}
                color="primary"
              >
                <InputLabel id="organization-type-label">
                  Organization Type
                </InputLabel>
                <Select
                  labelId="organization-type-label"
                  label="Organization Type"
                  defaultValue=""
                  {...register("organizationType", {
                    required: "Organization Type is required",
                  })}
                >
                  <MenuItem value="COMPANY">COMPANY</MenuItem>
                  <MenuItem value="INDIVIDUAL">INDIVIDUAL</MenuItem>
                  <MenuItem value="NON-PROFIT">NON-PROFIT</MenuItem>
                </Select>
                {errors.organizationType && (
                  <Typography variant="caption" color="error">
                    {errors.organizationType?.message?.toString()}
                  </Typography>
                )}
              </FormControl>
            </>
          )}

          {/* Optional Fields */}
          <TextField
            label="Address (Optional)"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("address")}
            color="primary"
          />

          {!isDonor && (
            <TextField
              label="Description (Optional)"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              {...register("description")}
              color="primary"
            />
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
