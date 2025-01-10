import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useDonateForm from "./hooks/useDonateForm";
import { TextField } from "@mui/material";

const DonateFormUI = ({
  projectName,
  onClose,
}: {
  projectName: string;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    donationTotal,
    setDonationTotal,
  } = useDonateForm();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          className="absolute top-4 right-4 text-white hover:bg-emerald-900"
          onClick={onClose}
        >
          ✖
        </Button>
        <h2 className="text-xl font-semibold mb-4">
          Donating to <span className="text-primary">{projectName}</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              type="button"
              className={`bg-gray-200 hover:bg-emerald-900 ${
                donationTotal === 10 ? "bg-primary text-white" : "text-black"
              }`}
              onClick={() => setDonationTotal(10)}
            >
              $10
            </Button>
            <Button
              type="button"
              className={`bg-gray-200 hover:bg-emerald-900 ${
                donationTotal === 25 ? "bg-primary text-white" : "text-black"
              }`}
              onClick={() => setDonationTotal(25)}
            >
              $25
            </Button>
            <Button
              type="button"
              className={`bg-gray-200 hover:bg-emerald-900 ${
                donationTotal === 50 ? "bg-primary text-white" : "text-black"
              }`}
              onClick={() => setDonationTotal(50)}
            >
              $50
            </Button>
            <Button
              type="button"
              className={`bg-gray-200 hover:bg-emerald-900 ${
                donationTotal === 100 ? "bg-primary text-white" : "text-black"
              }`}
              onClick={() => setDonationTotal(100)}
            >
              $100
            </Button>
          </div> */}

          <TextField
            label="Donation Amount"
            type="number"
            fullWidth
            margin="normal"
            {...register("amount", { valueAsNumber: true })}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <TextField
            label="Your Email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Leave A Comment"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            {...register("message")}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
          {/* <label className="flex items-center space-x-2 mb-4">
            <input type="checkbox" {...register("agreeToTerms")} />
            <span>Agree to terms?</span>
          </label> */}

          <p className="text-right font-medium mb-4">
            Donation Total: ${donationTotal}
          </p>
          <Button type="submit" className="bg-primary w-full hover:bg-emerald-900">
            Donate Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DonateFormUI;
