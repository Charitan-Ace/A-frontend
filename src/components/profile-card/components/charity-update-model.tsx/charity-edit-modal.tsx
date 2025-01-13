// src/components/donor-update-model/CharityProfileEditModal.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCharityProfile } from "./hooks/useCharityProfileUpdate";
import { CharityUpdateInput } from "@/api/profile/schema/charity-update-schema";
import { OrganizationType } from "@/type/auth/model";
import { Select } from "@mui/material";
interface CharityProfileEditModalProps {
  getProfileCharity: () => Promise<any>;
  updateProfileCharity: (body: CharityUpdateInput) => Promise<any>;
  onClose: () => void;
  onSave: (donor: any) => void;
}

const CharityProfileEditModal: React.FC<CharityProfileEditModalProps> = ({
  getProfileCharity,
  updateProfileCharity,
  onClose,
  onSave,
}) => {
  const { formData, loading, error, success, handleInputChange, handleSubmit } =
    useCharityProfile({
      getProfileCharity,
      updateProfileCharity,
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
              <Label htmlFor="companyName" className="text-gray-700">
                First Name
              </Label>
              <input
                id="companyName"
                type="text"
                value={formData.companyName || ""}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                className="border border-gray-300 font-sans rounded-md p-2 w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-gray-700">
                Last Name
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
            <div>
              <Label htmlFor="taxCode" className="text-gray-700">
                Address
              </Label>
              <input
                id="taxCode"
                type="text"
                value={formData.taxCode || ""}
                onChange={(e) => handleInputChange("taxCode", e.target.value)}
                className="border border-gray-300 font-sans rounded-md p-2 w-full"
                required
              />
            </div>
            <Select
              className="mt-3"
              fullWidth
              defaultValue=""
              onChange={(e) =>
                handleInputChange("organizationType", e.target.value)
              }
            >
              <option value="" disabled>
                Organization Type
              </option>
              <option value={OrganizationType.ORGANIZATION}>
                Organization
              </option>
              <option value={OrganizationType.INDIVIDUAL}>Individual</option>
              <option value={OrganizationType.NON_PROFIT}>Non-Profit</option>
            </Select>
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

export default CharityProfileEditModal;
