import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DonationDto } from "@/type/donation/donation.dto";
import { DataGrid } from "@/components/table";
import handleFetchDonationHistory from "./api/handleFetchDonationHistory";

interface DonationHistoryProps {
  donations: DonationDto[];
}

const donations: DonationDto[] = [
  { id: 1, project: "Water for All", date: "2024-01-15", amount: "$100" },
  { id: 2, project: "Education Fund", date: "2024-02-10", amount: "$50" },
  { id: 3, project: "Health Support", date: "2024-03-05", amount: "$75" },
  { id: 1, project: "Water for All", date: "2024-01-15", amount: "$100" },
  { id: 2, project: "Education Fund", date: "2024-02-10", amount: "$50" },
  { id: 3, project: "Health Support", date: "2024-03-05", amount: "$75" },
  { id: 1, project: "Water for All", date: "2024-01-15", amount: "$100" },
  { id: 2, project: "Education Fund", date: "2024-02-10", amount: "$50" },
  { id: 3, project: "Health Support", date: "2024-03-05", amount: "$75" },
];

const DonationHistoryTable = () => {
  // const DonationHistoryTable: React.FC<DonationHistoryProps>
  const columns = useMemo<ColumnDef<DonationDto, any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "No.",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "project",
        header: "Project",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleDateString(); // Format as needed
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => `${info.getValue()}`, // Format as currency
      },
    ],
    []
  );

  // const loadData = async (params: {
  //   pageIndex: number;
  //   pageSize: number;
  // }): Promise<any> => {
  //   const { pageIndex, pageSize } = params;

  //   // For convenience, calculate the start and end of the slice
  //   const start = pageIndex * pageSize;
  //   const end = start + pageSize;

  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       // Slice the donations array according to the requested page
  //       const paginatedData = donations.slice(start, end);

  //       resolve({
  //         data: paginatedData,
  //         total: donations.length,
  //         pagination: {
  //           limit: pageSize,
  //           offset: start,
  //           page: pageIndex + 1,
  //           total: donations.length,
  //         },
  //       });
  //     }, 500);
  //   });
  // };

  const loadData = async (params: {
    pageIndex: number;
    pageSize: number;
  }): Promise<any> => {
    const { pageIndex, pageSize } = params;

    // For convenience, calculate the start and end of the slice
    const start = pageIndex * pageSize;
    const end = start + pageSize;

    const data = handleFetchDonationHistory();

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     // Slice the donations array according to the requested page
    //     const paginatedData = donations.slice(start, end);

    //     resolve({
    //       data: paginatedData,
    //       total: donations.length,
    //       pagination: {
    //         limit: pageSize,
    //         offset: start,
    //         page: pageIndex + 1,
    //         total: donations.length,
    //       },
    //     });
    //   }, 500);
    // });
    return data;
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Donation History</h2>
      </div>
      <DataGrid
        layout={{ cellsBorder: true }}
        columns={columns}
        serverSide={true}
        onFetchData={(params) => loadData(params)}
        sorting={[{ id: "updatedAt", desc: true }]}
        rowSelect={false}
        pagination={{ size: 10 }}
        // reloadTrigger={reloadTrigger}
      />
    </div>
  );
};

export { DonationHistoryTable };
