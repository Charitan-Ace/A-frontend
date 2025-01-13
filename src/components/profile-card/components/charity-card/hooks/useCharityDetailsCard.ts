import { useState } from "react";

const useCharityDetailsCard = ({
  loadData,
}: {
  loadData: () => Promise<any>;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadData = async () => {
    setIsLoading(true);
    try {
      const response = await loadData();
      console.log(7765765, response);
      setData(response);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isModalOpen,
    setModalOpen,
    data,
    isLoading,
    handleLoadData,
  };
};

export default useCharityDetailsCard;
