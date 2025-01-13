// src/components/donor-update-model/DonorProfileEditModal.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDonorProfile } from "./hooks/useDonorProfileUpdate";
import { DonorUpdateInput } from "@/api/profile/schema/donor-update-schema";
interface DonorProfileEditModalProps {
  getProfileDonor: () => Promise<any>;
  updateProfileDonor: (body: DonorUpdateInput) => Promise<any>;
  onClose: () => void;
  onSave: (donor: any) => void;
}

const DonorProfileEditModal: React.FC<DonorProfileEditModalProps> = ({
  getProfileDonor,
  updateProfileDonor,
  onClose,
  onSave,
}) => {
  const { formData, loading, error, success, handleInputChange, handleSubmit } =
    useDonorProfile({
      getProfileDonor,
      updateProfileDonor,
      onSave,
      onClose,
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-xl p-8">
        <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

        {loading && (
          <div className="mb-4 text-center">
            <span className="text-gray-700">Loading...</span>
          </div>
        )}

        {success && (
          <div className="mb-4 text-green-500">
            <span>{success}</span>
          </div>
        )}

        {!loading && (
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <Label htmlFor="firstName" className="text-gray-700">
                First Name
              </Label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="border border-gray-300 font-sans rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-gray-700">
                Last Name
              </Label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="border border-gray-300 font-sans rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-gray-700">
                Address
              </Label>
              <input
                id="address"
                type="text"
                value={formData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="border border-gray-300 font-sans rounded-md p-2 w-full"
                required
              />
            </div>
          </form>
        )}

        {error && (
          <div className="text-red-500 w-full flex mt-8 justify-center mb-4 ">
            <span>{error}</span>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <Button
            type="button"
            className="bg-gray-300 text-black rounded-sm hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="text-white bg-emerald-600 rounded-sm hover:bg-emerald-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonorProfileEditModal;
