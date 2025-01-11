import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CharityFormValues, charitySchema } from "../validation/charitySchema";
import { RegisterInput } from "@/api/signup/schema/signup-schema";

const useCharityForm = (
  handleSignup: (data: RegisterInput) => Promise<void>
) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CharityFormValues>({
    resolver: zodResolver(charitySchema),
  });

  const onSubmit = async (data: CharityFormValues) => {
    try {
      console.log("Submitting Charity data:", data);
      await handleSignup({
        email: data.email,
        password: data.password,
        role: "CHARITY",
        profile: { ...data.profile, organizationType: "ORGANIZATION" },
      });
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
