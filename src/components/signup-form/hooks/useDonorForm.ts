import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import APIClient from "@/api/client";
import AuthService from "@/api/auth/service/auth-service";
import { toast } from "sonner";
import { DonorFormValues, donorSchema } from "../validation/donorSchema";

const useDonorForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DonorFormValues>({
    resolver: zodResolver(donorSchema),
  });

  const apiClient = new APIClient("http://localhost:8080");
  const authService = new AuthService(apiClient);

  const onSubmit = async (data: DonorFormValues) => {
    try {
      console.log("Submitting Donor data:", data);
      await authService.register(
        data.email,
        data.password,
        "DONOR",
        data.profile
      );
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
