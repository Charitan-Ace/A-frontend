import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DonateFormValues {
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  message?: string;
  agreeToTerms: boolean;
}

const useDonateForm = () => {
  const [donationTotal, setDonationTotal] = useState(10);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonateFormValues>();

  const onSubmit = (data: DonateFormValues) => {
    if (!data.agreeToTerms) {
      toast.error("You must agree to the terms!");
      return;
    }

    console.log("Donation submitted:", { ...data, amount: donationTotal });
    toast.success("Donation submitted!");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    donationTotal,
    setDonationTotal,
  };
};

export default useDonateForm;
