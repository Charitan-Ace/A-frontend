import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DonationDto } from "@/type/donation/donation.dto";
import { DataGrid } from "@/components/table";
import handleFetchDonationHistory from "./api/handleFetchDonationHistory";
import { GET_DONATIONS_URL } from "@/api/donation/constant";
interface DonationHistoryProps {
  content: DonationDto[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

const sampleData: DonationHistoryProps = {
  content: [
    {
      id: 2,
      amount: 100000.0,
      message: "hi",
      transactionStripeId: null,
      projectId: "123",
      donorId: "abc",
      createdAt: "2025-01-11",
    },
    {
      id: 3,
      amount: 75000.0,
      message: "Great cause",
      transactionStripeId: "txn_123456",
      projectId: "456",
      donorId: "def",
      createdAt: "2025-01-12",
    },
    {
      id: 4,
      amount: 50000.0,
      message: "Keep up the good work",
      transactionStripeId: "txn_789012",
      projectId: "789",
      donorId: "ghi",
      createdAt: "2025-01-13",
    },
    {
      id: 5,
      amount: 125000.0,
      message: "Happy to help",
      transactionStripeId: null,
      projectId: "012",
      donorId: "jkl",
      createdAt: "2025-01-14",
    },
  ],
  pageable: {
    pageNumber: 1,
    pageSize: 1,
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    offset: 1,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 2,
  totalElements: 2,
  first: false,
  size: 1,
  number: 1,
  sort: {
    empty: true,
    unsorted: true,
    sorted: false,
  },
  numberOfElements: 1,
  empty: false,
};

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
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => `$${info.getValue().toLocaleString()}`, // Format as currency
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

  const loadData = async (params: {
    pageIndex: number;
    pageSize: number;
  }): Promise<any> => {
    const { pageIndex, pageSize } = params;

    // For convenience, calculate the start and end of the slice
    const start = pageIndex * pageSize;
    const end = start + pageSize;

    return new Promise((resolve) => {
      setTimeout(() => {
        // Slice the donations array according to the requested page
        const paginatedData = sampleData.content.slice(start, end);

        resolve({
          data: paginatedData,
          total: sampleData.content.length,
          pagination: {
            limit: pageSize,
            offset: start,
            page: pageIndex + 1,
            total: sampleData.content.length,
          },
        });
      }, 500);
    });
  };

  // const loadData = async (params: {
  //   pageIndex: number;
  //   pageSize: number;
  // }): Promise<any> => {
  //   const { pageIndex, pageSize } = params;

  //   // For convenience, calculate the start and end of the slice
  //   const start = pageIndex * pageSize;
  //   const end = start + pageSize;

  //   // const data = handleFetchDonationHistory();
  //   // const data = sampleData;

  //   return sampleData;
  // };

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
        rowSelect={false}
        pagination={{ size: 10 }}
        // sorting={[{ id: "updatedAt", desc: true }]}
        // reloadTrigger={reloadTrigger}
      />
    </div>
  );
};

export { DonationHistoryTable };
