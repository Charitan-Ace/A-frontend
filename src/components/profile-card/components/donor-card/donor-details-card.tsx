import React from "react";
import { Button } from "../../../ui/button";
import { DonorModel } from "@/type/auth/model";
import { Card } from "@/components/ui/card";
import useDonorDetailsCard from "./hooks/useDonorDetailsCard";
import { TextField } from "@mui/material";
import { DonorProfileEditModal } from "../donor-update-model.tsx/donor-edit-modal";

const DonorProfileDetails = ({
  donor,
  loadData,
}: {
  donor?: DonorModel;
  loadData: () => Promise<DonorModel | null>;
}) => {
  const { isModalOpen, setModalOpen, data, isLoading, handleLoadData } =
    useDonorDetailsCard({ loadData });

  const displayDonor = data || donor;

  React.useEffect(() => {
    handleLoadData();
  }, []);

  return (
    <>
      <Card>
        <div className="m-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Profile Details</h2>
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>
            <Button
              className="rounded-sm text-white hover:bg-emerald-900"
              onClick={() => setModalOpen(true)}
              disabled={isLoading}
            >
              Update
            </Button>
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
          donor={donor}
          onClose={() => setModalOpen(false)}
          onSave={(updatedDonor) => {
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default DonorProfileDetails;
