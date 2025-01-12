import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DonorModel } from "@/type/auth/model";

interface DonorProfileEditModalProps {
  donor: DonorModel;
  onClose: () => void;
  onSave: (donor: DonorModel) => void;
}

const DonorProfileEditModal = ({
  donor,
  onClose,
  onSave,
}: DonorProfileEditModalProps) => {
  const [formData, setFormData] = useState<DonorModel>({ ...donor });

  const handleInputChange = (field: keyof DonorModel, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-xl p-8">
        <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="border border-gray-300 font-sans rounded-md p-2 w-full"
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
            />
          </div>
        </form>
        <div className="mt-6 flex justify-end gap-4">
          <Button
            className="bg-gray-300 text-black rounded-sm hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="text-white rounded-sm hover:bg-emerald-900"
            onClick={() => onSave(formData)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export { DonorProfileEditModal };
