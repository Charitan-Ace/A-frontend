import { Card } from "@/components/ui/card";
import { useDonorLeaderboardTable } from "./hooks/useDonorLeaderboardTable";

interface DonorLeaderboardProps {
  loadData: () => Promise<Record<string, number>>;
}
// sample data
// {
//   "b59f8321-f0f7-4890-880f-70cb925e849e": 13449.632789924779,
//   "b4fc1c09-5082-4a1d-a48c-6870a1c9b6f3": 13292.000849018277,
//   "8d3e4329-36d3-4c9e-a7cb-95750573a9bc": 11678.255329663167,
// }

export function DonorLeaderboard({ loadData }: DonorLeaderboardProps) {
  const { data, loading, error } = useDonorLeaderboardTable({ loadData });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  const entries = Object.entries(data);

  return (
    <Card className="mt-6 p-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-primary underline">
          Donor Leaderboard
        </h2>
      </div>
      <table className="w-full min-w-full divide-y text-sm mt-6">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-900">
              Donor Id
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {entries.map(([id, amount], index) => (
            <tr key={id} className={index % 2 === 1 ? "bg-gray-100" : ""}>
              <td className="px-4 py-2 text-gray-700">{id}</td>
              <td className="px-4 py-2 text-gray-700">{amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
