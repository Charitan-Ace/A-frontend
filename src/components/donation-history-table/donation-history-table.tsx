import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DonationDto } from "@/type/donation/donation.dto";
import { DataGrid } from "@/components/table";
import { useDonationHistoryTable } from "./hooks/useDonationHistoryTable";
import { Card } from "../ui/card";

const DonationHistoryTable = () => {
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
        cell: (info) => `$${info.getValue()?.toLocaleString()}`, // Format as currency
      },
      {
        accessorKey: "message",
        header: "Message",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "transactionStripeId",
        header: "Transaction ID",
        cell: (info) => info.getValue() || "N/A", // Display "N/A" if null
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
    ],
    []
  );

  const { loadData } = useDonationHistoryTable();

  return (
    <div className="mt-8 w-full">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Donation History</h2>
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
