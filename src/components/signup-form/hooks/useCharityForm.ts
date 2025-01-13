import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CharityFormValues, charitySchema } from "../validation/charitySchema";
import { RegisterInput } from "@/api/signup/schema/signup-schema";
import { useState } from "react";

const useCharityForm = (
  handleSignup: (data: RegisterInput) => Promise<any>
) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CharityFormValues>({
    resolver: zodResolver(charitySchema),
  });

  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: CharityFormValues) => {
    try {
      console.log("Submitting Charity data:", data);
      const response = await handleSignup({
        email: data.email,
        password: data.password,
        role: "CHARITY",
        profile: {
          ...data.profile,
        },
      });
      if (response.status !== 200) {
        setIsError(true);
        return;
      }
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
    isError,
  };
};

export default useCharityForm;
