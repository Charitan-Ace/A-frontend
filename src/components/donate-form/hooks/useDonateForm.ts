import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { DonationInput, donationSchema } from "@/api/donation/schema/donation-schema";
import { createDonation } from "@/api/donation/service/donation-service";
import { truncate } from "fs/promises";
import useAuth from "@/hooks/use-auth";

const useDonateForm = (projectId: string, onClose: () => void) => {
  const successUrl = `${window.location.href}?paymentSuccess=true`;
  const cancelUrl = `${window.location.href}?paymentFail=true`;
  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<DonationInput>({
    resolver: zodResolver(donationSchema),
    defaultValues: { projectId },
  });

  const payloadDonor = (data: DonationInput) => {
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
    const { amount, message, projectId, email, firstName, lastName, address} = data;

    const payload = {
      amount: amount,
      message: message,
      projectId: projectId,
      successUrl: successUrl,
      cancelUrl: cancelUrl,
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address
    }
    return payload;
  }

  const onSubmit = async (data: DonationInput) => {
    try {
      // const isDonor = !!auth?.email
      const isDonor = auth?.roleId === "DONOR"
      const payload = isDonor ? payloadDonor(data) : payloadGuest(data)
      console.log(payload)

      const res = await createDonation(payload);
      window.location.href = res.redirectUrl

      // toast.success("Donate successfully. Thank you for your donation!");
      // onClose();
      // reset();
    } catch (error) {
      console.error("Donation failed:", error);
      // toast.error("Failed to process the donation. Please try again.");
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
