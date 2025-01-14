import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useDonateForm from "./hooks/useDonateForm";
import { InputAdornment, TextField } from "@mui/material";

const DonateFormUI = ({
  projectName,
  projectId,
  onClose,
}: {
  projectName: string;
  projectId: string;
  onClose: () => void;
}) => {
  const { register, handleSubmit, onSubmit, errors } = useDonateForm(
    projectId,
    onClose
  );

  // const displayDonor = true;

  const [messageLength, setMessageLength] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageLength(e.target.value.length);
  };

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
          <TextField
            label="Donation Amount"
            type="number"
            fullWidth
            margin="normal"
            {...register("amount", { valueAsNumber: true })}
            error={!!errors.amount}
            helperText={errors.amount?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            // InputProps={{ readOnly: !!displayDonor }}
            // defaultValue={displayDonor?.firstName || ""}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            // InputProps={{ readOnly: !!displayDonor }}
            // defaultValue={displayDonor?.lastName || ""}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
            // InputProps={{ readOnly: !!displayDonor }}
            // defaultValue={displayDonor?.address || ""}
          />
          <TextField
            label="Your Email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            // InputProps={{ readOnly: !!displayDonor }}
            // defaultValue={displayDonor?.email || ""}
          />
          <TextField
            label="Leave A Message"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            {...register("message")}
            error={!!errors.message}
            helperText={errors.message?.message}
            onChange={(e) => {
              register("message").onChange(e);
              handleMessageChange(e as React.ChangeEvent<HTMLInputElement>);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {`${messageLength}/250`}
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            className="bg-primary w-full hover:bg-emerald-900"
          >
            Donate Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DonateFormUI;
