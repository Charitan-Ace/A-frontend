// src/components/donor-update-model/useDonorProfile.ts

import { useState, useEffect } from "react";
import { APIResponse } from "@/api/axios";
import { DonorUpdateInput } from "@/api/profile/schema/donor-update-schema";
import { DonorModel } from "@/type/auth/model";

interface UseDonorProfileProps {
  getProfileDonor: () => any;
  updateProfileDonor: (body: DonorUpdateInput) => Promise<APIResponse<any>>;
  onSave: (donor: DonorModel) => void;
  onClose: () => void;
}

interface UseDonorProfileReturn {
  formData: DonorUpdateInput;
  loading: boolean;
  error: string | null;
  success: string | null;
  handleInputChange: (field: keyof DonorUpdateInput, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const useDonorProfile = ({
  getProfileDonor,
  updateProfileDonor,
  onSave,
  onClose,
}: UseDonorProfileProps): UseDonorProfileReturn => {
  const [formData, setFormData] = useState<DonorUpdateInput>({
    firstName: "",
    lastName: "",
    address: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonorProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProfileDonor();
        console.log(3123, response);
        if (response) {
          setFormData({
            firstName: response.firstName,
            lastName: response.lastName,
            address: response.address,
          });
        } else {
          setError("Failed to fetch donor profile.");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonorProfile();
  }, []);

  const handleInputChange = (field: keyof DonorUpdateInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response: APIResponse<any> = await updateProfileDonor(formData);
      if (response.status === 200 && response.data) {
        setSuccess("Profile updated successfully!");
        onSave(formData as DonorModel);
        onClose();
      } else {
        setError(response.error || "Failed to update profile.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    success,
    handleInputChange,
    handleSubmit,
  };
};
