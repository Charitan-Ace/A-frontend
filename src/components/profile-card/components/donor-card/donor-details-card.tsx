import { Button } from "../../../ui/button";
import { DonorModel } from "@/type/auth/model";
import { Card } from "@/components/ui/card";
import useDonorDetailsCard from "./hooks/useDonorDetailsCard";
import { TextField } from "@mui/material";
import DonorProfileEditModal from "../donor-update-model.tsx/donor-edit-modal";
import { useEffect } from "react";
import { DonorUpdateInput } from "@/api/profile/schema/donor-update-schema";
import saveDonorCard from "@/api/payment/service/saveDonorCard";
import { toast } from "react-toastify";

const DonorProfileDetails = ({
  donor,
  loadData,
  updateProfileDonor,
}: {
  donor?: DonorModel;
  loadData: () => Promise<DonorModel | null>;
  updateProfileDonor: (body: DonorUpdateInput) => Promise<any>;
}) => {
  const { isModalOpen, setModalOpen, data, isLoading, handleLoadData } =
    useDonorDetailsCard({ loadData });

  const displayDonor = data || donor;

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleSave = (updatedDonor: DonorModel) => {
    console.log("Donor updated:", updatedDonor);
    handleLoadData();
  };

  const handleSaveCard = async () => {
    const successUrl = window.location.href;
    const cancelUrl = window.location.href;
  
    const payload = {
      successUrl,
      cancelUrl,
    };
  
    try {
      const res = await saveDonorCard(payload);
      if (res) {
        console.log("Card info saved successfully:", res);
        toast.success("Card info saved successfully");
      } else {
        toast.error("Failed to save card info");
      }
    } catch (error) {
      console.error("Error in handleSaveCard:", error);
    }
  };

  return (
    <>
      <Card>
        <div className="m-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Donor Details</h2>
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>
            <div className="flex gap-4">
              <Button
                className="rounded-sm text-white hover:bg-emerald-900"
                onClick={() => setModalOpen(true)}
                disabled={isLoading}
              >
                Update
              </Button>
              <Button
                className="rounded-sm text-white hover:bg-emerald-900"
                onClick={() => handleSaveCard()}
                disabled={isLoading}
              >
                Save Card Info
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 mt-4">
            {displayDonor?.avatar && (
              <div className="w-48 h-48 border-2 border-gray-300 rounded-full overflow-hidden">
                <img
                  src={displayDonor.avatar}
                  alt={`${displayDonor.firstName || "Donor"}'s Avatar`}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={displayDonor?.email || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Role"
                  variant="outlined"
                  fullWidth
                  value={displayDonor?.roleId || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={displayDonor?.firstName || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={displayDonor?.lastName || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={displayDonor?.address || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {isModalOpen && (
        <DonorProfileEditModal
          onClose={() => setModalOpen(false)}
          getProfileDonor={loadData}
          updateProfileDonor={updateProfileDonor}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default DonorProfileDetails;
