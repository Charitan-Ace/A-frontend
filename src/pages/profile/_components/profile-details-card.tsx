import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toAbsoluteUrl } from "@/utils/assets";
import { UserDto } from "@/type/auth/model";
import { ProfileEditModal } from "./profile-edit-modal";

interface ProfileDetailsProps {
  user: UserDto;
}

const ProfileDetails = ({ user }: any) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {user && user.email}
      {/* <div className="mt-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Profile Details</h2>
            <div className="flex-grow h-[1px] bg-gray-300"></div>
          </div>
          <Button
            className="rounded-sm text-white hover:bg-emerald-900	"
            onClick={() => setModalOpen(true)}
          >
            Update
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 mt-4">
          <Avatar className="w-48 h-48 border-2 border-gray-300">
            <AvatarImage src={user.profilePictureUrl} alt={user.username} />
            <AvatarFallback>{user.firstName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-700">First Name</Label>
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                {user.firstName}
              </div>
            </div>
            <div>
              <Label className="text-gray-700">Last Name</Label>
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                {user.lastName}
              </div>
            </div>
            <div>
              <Label className="text-gray-700">Email</Label>
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                {user.email}
              </div>
            </div>
            <div>
              <Label className="text-gray-700">Phone</Label>
              <div className="border border-gray-300 p-2 rounded-md bg-gray-50">
                {user.phone || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProfileEditModal
          user={user}
          onClose={() => setModalOpen(false)}
          onSave={(updatedUser) => {
            console.log("Updated User:", updatedUser);
            setModalOpen(false);
          }}
        />
      )} */}
    </>
  );
};

export default ProfileDetails;
