import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { DonationInput, donationSchema } from "@/api/donation/schema/donation-schema";
import { createDonation } from "@/api/donation/service/donation-service";
import { truncate } from "fs/promises";

const useDonateForm = (projectId: string, onClose: () => void) => {
  const successUrl = "http://localhost:3000/success";
  const cancelUrl = "http://localhost:3000/cancel";

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<DonationInput>({
    resolver: zodResolver(donationSchema),
    defaultValues: { projectId },
  });

  const payloadDoner = (data: DonationInput) => {
    const { amount, message, projectId } = data;

    const payload = {
      amount: amount,
      message: message,
      projectId: projectId,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
    }

    return payload;
  }

  const payloadGuest = (data: DonationInput) => {
    const { amount, message, projectId } = data;

    const payload = {
      amount: amount,
      message: message,
      projectId: projectId,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      email: "test@gmail.com",
      firstName: "Linh",
      lastName: "Do",
      address: "My Home"
    }
    return payload;
  }

  const onSubmit = async (data: DonationInput) => {
    try {
      const isGuest = true
      const payload = isGuest ? payloadGuest(data):  payloadDoner(data)

      var body = await createDonation(payload);
      window.location.href = body.redirectUrl

      // toast.success("Donate successfully. Thank you for your donation!");
      // onClose();
      // reset();
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
