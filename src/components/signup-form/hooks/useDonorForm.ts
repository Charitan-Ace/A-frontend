import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { DonorFormValues, donorSchema } from "../validation/donorSchema";
import SignupService from "../api/signupService";

const useDonorForm = () => {
  const { handleSignup } = SignupService();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DonorFormValues>({
    resolver: zodResolver(donorSchema),
  });

  const onSubmit = async (data: DonorFormValues) => {
    try {
      console.log("Submitting Donor data:", data);
      await handleSignup({
        email: data.email,
        password: data.password,
        role: "DONOR",
        profile: { ...data.profile },
      });
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
  };
};

export default useDonorForm;
