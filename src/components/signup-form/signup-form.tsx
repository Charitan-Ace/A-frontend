import React from "react";
import { Switch, FormControlLabel } from "@mui/material";
import useSignUpForm from "./hooks/useSignUpForm";
import useDonorForm from "./hooks/useDonorForm";
import useCharityForm from "./hooks/useCharityForm";
import DonorFormUI from "./ui/DonorFormUI";
import CharityFormUI from "./ui/CharityFormUI";
import { RegisterInput } from "@/api/signup/schema/signup-schema";

const SignUpFormUI = ({
  handleSignup,
}: {
  handleSignup: (data: RegisterInput) => Promise<any>;
}) => {
  const { isDonor, setIsDonor } = useSignUpForm();

  const donorForm = useDonorForm(handleSignup);
  const charityForm = useCharityForm(handleSignup);

  const toggleRole = () => setIsDonor(!isDonor);

  return (
    <div className="max-w-md mx-auto p-8 shadow-md rounded-md mt-20 bg-white">
      <FormControlLabel
        control={<Switch checked={!isDonor} onChange={toggleRole} />}
        label={isDonor ? "Register as Donor" : "Register as Charity"}
      />
      {isDonor ? (
        <DonorFormUI {...donorForm} />
      ) : (
        <CharityFormUI {...charityForm} />
      )}
    </div>
  );
};

export default SignUpFormUI;
