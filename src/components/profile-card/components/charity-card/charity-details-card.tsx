import { Button } from "../../../ui/button";
import { CharityModel } from "@/type/auth/model";
import { Card } from "@/components/ui/card";
import useCharityDetailsCard from "./hooks/useCharityDetailsCard";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { CharityUpdateInput } from "@/api/profile/schema/charity-update-schema";
import CharityProfileEditModal from "../charity-update-model.tsx/charity-edit-modal";

const CharityProfileDetails = ({
  donor,
  loadData,
  updateProfileCharity,
}: {
  donor?: CharityModel;
  loadData: () => Promise<CharityModel | null>;
  updateProfileCharity: (body: CharityUpdateInput) => Promise<any>;
}) => {
  const { isModalOpen, setModalOpen, data, isLoading, handleLoadData } =
    useCharityDetailsCard({ loadData });

  const displayCharity = data || donor;

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleSave = (updatedCharity: CharityModel) => {
    console.log("Charity updated:", updatedCharity);
    handleLoadData();
  };

  return (
    <>
      <Card>
        <div className="m-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Charity Details</h2>
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
            {displayCharity?.avatar && (
              <div className="w-48 h-48 border-2 border-gray-300 rounded-full overflow-hidden">
                <img
                  src={displayCharity.avatar}
                  alt={`${displayCharity.firstName || "Charity"}'s Avatar`}
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
                  value={displayCharity?.email || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Role"
                  variant="outlined"
                  fullWidth
                  value={displayCharity?.roleId || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  value={displayCharity?.companyName || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Tax Code"
                  variant="outlined"
                  fullWidth
                  value={displayCharity?.taxCode || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  value={displayCharity?.address || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
              <div>
                <TextField
                  label="Organization Type"
                  variant="outlined"
                  fullWidth
                  value={displayCharity?.organizationType || "N/A"}
                  InputProps={{ readOnly: true }}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {isModalOpen && (
        <CharityProfileEditModal
          onClose={() => setModalOpen(false)}
          getProfileCharity={loadData}
          updateProfileCharity={updateProfileCharity}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default CharityProfileDetails;
