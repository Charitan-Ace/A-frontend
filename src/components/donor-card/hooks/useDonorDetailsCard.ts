import { useState } from "react";

const useDonorDetailsCard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return {
    isModalOpen,
    setModalOpen,
  };
};

export default useDonorDetailsCard;
