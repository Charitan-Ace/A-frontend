import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputAdornment, TextField } from "@mui/material";
import useSubscriptionForm from "./hooks/useSubscriptionForm";

const SubscriptionForm = ({
  projectId,
  projectName,
  onClose,
}: {
  projectId: string;
  projectName: string;
  onClose: () => void;
}) => {
  const { register, handleSubmit, onSubmit, errors } = useSubscriptionForm(
    projectId,
    onClose
  );

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
        <h2 className="text-xl font-semibold">Subscribe Monthly Donation to</h2>
        <h2 className="text-xl font-semibold mb-4 text-primary">
          {projectName}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Monthly Donation Amount"
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
          <Button
            type="submit"
            className="bg-primary w-full hover:bg-emerald-900 mt-5"
          >
            Checkout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
