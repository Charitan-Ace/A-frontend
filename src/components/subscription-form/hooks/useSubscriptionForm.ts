import { SubscriptionInput, subscriptionSchema } from "@/api/payment/schema.ts/subscription-schema";
import subscribeToProject from "@/api/payment/service/subscribeToProject";
import useAuth from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const useSubscriptionForm = (
  projectId: string,
  onClose: () => void
) => {
  const successUrl = `${window.location.href}`;
  const cancelUrl = `${window.location.href}`;

  const {
      register,
      handleSubmit,
      // reset,
      formState: { errors },
    } = useForm<SubscriptionInput>({
      resolver: zodResolver(subscriptionSchema),
      defaultValues: { projectId },
    });

  const onSubmit = async (data: SubscriptionInput) => {
    try {
      const payload = {
        projectId,
        amount: data.amount,
        successUrl,
        cancelUrl,
      };

      const res = await subscribeToProject(payload);
      if (res) {
        window.location.href = res.redirectUrl;
        onClose();
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Subscription failed:", error);
      toast.error("An error occurred while subscribing. Please try again.");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useSubscriptionForm;