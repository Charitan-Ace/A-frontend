import { Card } from "@/components/ui/card";
import { useDonationStatisticTable } from "./hooks/useDonationStatisticTable";
import { Typography } from "@mui/material";

interface DonationStatisticsTableProps {
  loadData: () => Promise<any>;
  columnHeading: string;
}

// {
//   "userId": "30c82470-fc28-42b7-ae8a-35dcb09e7ade",
//   "donationStatistics": {
//     "cffedd29-972f-41c4-bbe6-54829087caf1": 123.0,
//     "dfsfsdfdsdf-fdsfsfsfs-fsfsfs-fs-dfsdf": 999.0,
//   }
// }

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
              className={index % 2 === 1 ? "bg-[#EFF1F5]" : ""}
            >
              <td className=" py-2 text-gray-700">
                <a
                  href={`/project/${donationId}`}
                  className="hover:text-blue-600"
                >
                  {donationId}
                </a>
              </td>
              <td className=" py-2 text-gray-700">${amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full flex flex-col text-xl">
        <Typography className="mt-4" color="textSecondary">
          <span className="text-primary underline font-bold">
            Total Projects:
          </span>{" "}
          {entries.length}
        </Typography>

        <Typography className="mt-4" color="textSecondary">
          <span className="text-primary underline font-bold">
            Total Donation:{" "}
          </span>{" "}
          ${entries.reduce((acc, [, amount]) => acc + amount, 0).toFixed(2)}
        </Typography>
      </div>
    </Card>
  );
}
