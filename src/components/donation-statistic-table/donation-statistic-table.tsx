import { Card } from "@/components/ui/card";
import { useDonationStatisticTable } from "./hooks/useDonationStatisticTable";

interface DonationStatisticsTableProps {
  loadData: () => Promise<any>;
  columnHeading: string;
}

export function DonationStatisticsTable({
  loadData,
  columnHeading,
}: DonationStatisticsTableProps) {
  const { data, loading, error } = useDonationStatisticTable({
    loadData,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data || !data.donationStatistics) return <p>No data available</p>;

  const entries = Object.entries(data.donationStatistics);

  return (
    <Card className="mt-6 p-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-primary underline">
          Donation by Project
        </h2>
      </div>
      <table className="w-full min-w-full divide-y font-normal divide-gray-200 text-md">
        <thead className="">
          <tr>
            <th scope="col" className=" py-2 text-left font-bold text-gray-900">
              {columnHeading}
            </th>
            <th scope="col" className=" py-2 text-left font-bold text-gray-900">
              Total Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {entries.map(([donationId, amount], index) => (
            <tr
              key={donationId}
              // Apply bg-gray-400 for odd index (i.e., 1, 3, 5, etc.)
              className={index % 2 === 1 ? "bg-[#EFF1F5]" : ""}
            >
              <td className=" py-2 text-gray-700">{donationId}</td>
              <td className=" py-2 text-gray-700">${amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
