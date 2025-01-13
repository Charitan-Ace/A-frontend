// src/components/donor-update-model/useCharityProfile.ts

import { useState, useEffect } from "react";
import { APIResponse } from "@/api/axios";
import { CharityModel } from "@/type/auth/model";
import { CharityUpdateInput } from "@/api/profile/schema/charity-update-schema";

interface UseCharityProfileProps {
  getProfileCharity: () => any;
  updateProfileCharity: (body: CharityUpdateInput) => Promise<APIResponse<any>>;
  onSave: (donor: CharityModel) => void;
  onClose: () => void;
}

interface UseCharityProfileReturn {
  formData: CharityUpdateInput;
  loading: boolean;
  error: string | null;
  success: string | null;
  handleInputChange: (field: keyof CharityUpdateInput, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const useCharityProfile = ({
  getProfileCharity,
  updateProfileCharity,
  onSave,
  onClose,
}: UseCharityProfileProps): UseCharityProfileReturn => {
  const [formData, setFormData] = useState<CharityUpdateInput>({
    companyName: "",
    taxCode: "",
    address: "",
    organizationType: "ORGANIZATION",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharityProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProfileCharity();
        if (response) {
          setFormData({
            companyName: response.companyName,
            taxCode: response.taxCode,
            address: response.address,
            organizationType: response.organizationType,
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

    fetchCharityProfile();
  }, []);

  const handleInputChange = (
    field: keyof CharityUpdateInput,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response: APIResponse<any> = await updateProfileCharity(formData);
      if (response.status === 200 && response.data) {
        setSuccess("Profile updated successfully!");
        onSave(formData as CharityModel);
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
