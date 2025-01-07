import { useState } from "react";

const useSignUpForm = () => {
  const [isDonor, setIsDonor] = useState(true);

  return {
    isDonor,
    setIsDonor,
  };
};

export default useSignUpForm;
