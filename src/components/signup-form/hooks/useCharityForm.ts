import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import APIClient from "@/api/client";
import AuthService from "@/api/auth/service/auth-service";
import { toast } from "sonner";
import { CharityFormValues, charitySchema } from "../validation/charitySchema";

const useCharityForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CharityFormValues>({
    resolver: zodResolver(charitySchema),
  });

  const apiClient = new APIClient("http://localhost:8080");
  const authService = new AuthService(apiClient);

  const onSubmit = async (data: CharityFormValues) => {
    try {
      console.log("Submitting Charity data:", data);
      await authService.register(
        data.email,
        data.password,
        "CHARITY",
        data.profile
      );
      toast.success("Charity registration successful!");
      reset();
    } catch (error) {
      console.error("Charity registration failed:", error);
      toast.error("Charity registration failed. Please try again.");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useCharityForm;
