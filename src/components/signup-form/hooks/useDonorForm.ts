import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { DonorFormValues, donorSchema } from "../validation/donorSchema";
import { RegisterInput } from "@/api/signup/schema/signup-schema";
import { useState } from "react";

const useDonorForm = (handleSignup: (data: RegisterInput) => Promise<any>) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DonorFormValues>({
    resolver: zodResolver(donorSchema),
  });

  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: DonorFormValues) => {
    try {
      console.log("Submitting Donor data:", data);
      const response = await handleSignup({
        email: data.email,
        password: data.password,
        role: "DONOR",
        profile: { ...data.profile },
      });

      if (response.status !== 200) {
        setIsError(true);
        return;
      }
      toast.success("Donor registration successful!");
      reset();
    } catch (error) {
      console.error("Donor registration failed:", error);
      toast.error("Donor registration failed. Please try again.");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isError,
  };
};

export default useDonorForm;
