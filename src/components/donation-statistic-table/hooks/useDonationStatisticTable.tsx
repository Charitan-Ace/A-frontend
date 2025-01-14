import { useCallback, useEffect, useState } from "react";

interface UseDonationStatisticTableProps {
  loadData: () => Promise<{
    status: number;
    data?: any;
  }>;
}

export function useDonationStatisticTable({
  loadData,
}: UseDonationStatisticTableProps) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await loadData();

      if (response.status === 200 && response.data) {
        setData(response.data);
      } else {
        setError(`Unexpected status: ${response.status}`);
      }
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [loadData]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  return {
    data,
    error,
    loading,
    handleLoadData,
  };
}
