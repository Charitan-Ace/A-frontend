import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DonationDto } from "@/type/donation/donation.dto";
import { DataGrid } from "@/components/table";
import { useDonationHistoryTable } from "./hooks/useDonationHistoryTable";
import { Card } from "@/components/ui/card";
import { APIResponse } from "@/api/axios";
import { DONATION_STATEMENT_URL } from "@/api/statistics/constant";

interface DonationHistoryTableProps {
  loadDonationStatement: (id: number) => Promise<APIResponse<any>>;
}

const DonationHistoryTable = ({
  loadDonationStatement,
}: DonationHistoryTableProps) => {
  const columns = useMemo<ColumnDef<DonationDto, any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No.",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => `$${info.getValue()?.toLocaleString()}`,
      },
      {
        accessorKey: "message",
        header: "Message",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "transactionStripeId",
        header: "Transaction ID",
        cell: (info) => info.getValue() || "N/A",
      },
      {
        accessorKey: "projectId",
        header: "Project ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "donorId",
        header: "Donor ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleDateString(); // Format as needed
        },
      },
      {
        accessorKey: "id",
        header: "Actions",
        cell: (info) => {
          return (
            <a
              href={`${DONATION_STATEMENT_URL}/${info.getValue()}`}
              target="_top"
              className="text-primary underline"
            >
              Load Statement
            </a>
          );
        },
      },
    ],
    []
  );

  const { loadData } = useDonationHistoryTable();

  return (
    <div className="mt-8 w-full">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-primary underline">
            Donation History
          </h2>
        </div>
        <DataGrid
          layout={{ cellsBorder: true }}
          columns={columns}
          serverSide={true}
          onFetchData={(params) => loadData(params)}
          rowSelect={false}
          pagination={{ size: 10 }}
        />
      </Card>
    </div>
  );
};

export { DonationHistoryTable };
