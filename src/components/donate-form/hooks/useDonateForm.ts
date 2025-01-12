import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { DonationInput, donationSchema } from "@/api/donation/schema/donation-schema";
import { createDonation } from "@/api/donation/service/donation-service";

const useDonateForm = (projectId: string, onClose: () => void) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DonationInput>({
    resolver: zodResolver(donationSchema),
    defaultValues: { projectId },
  });

  const onSubmit = async (data: DonationInput) => {
    try {
      const { amount, message, projectId } = data;
      const payload: Partial<DonationInput> = {
        amount,
        message,
        projectId,
      };

      await createDonation(payload);
      onClose();
      toast.success("Thank you for your donation!");
      reset();
    } catch (error) {
      console.error("Donation failed:", error);
      toast.error("Failed to process the donation. Please try again.");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useDonateForm;
