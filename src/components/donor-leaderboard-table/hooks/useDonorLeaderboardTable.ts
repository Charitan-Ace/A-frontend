import { useCallback, useEffect, useState } from "react";

interface DonationLeaderboardData {
  [key: string]: number;
}

interface DonorLeaderboardTableProps {
  loadData: () => Promise<DonationLeaderboardData>;
}

export function useDonorLeaderboardTable({
  loadData,
}: DonorLeaderboardTableProps) {
  const [data, setData] = useState<DonationLeaderboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await loadData();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [loadData]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  return {
    data,
    loading,
    error,
    reload: handleLoadData,
  };
}
