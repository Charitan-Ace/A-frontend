// hooks/useTableData.ts

import { useState, useEffect } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Person } from "../api/tableApi";
import { fetchTableData } from "../api/tableApi";

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstName", {
    header: "First Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.getValue(),
  }),
];

export function useTableData() {
  // Pagination states
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  // Data and total records from the "server"
  const [data, setData] = useState<Person[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const pageCount = Math.ceil(totalRows / pageSize);

  // Setup the TanStack table
  const table = useReactTable<Person>({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      // TanStack Table can return a function updater or direct values
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, // We are controlling data externally
  });

  // Whenever pageIndex or pageSize changes, refetch
  useEffect(() => {
    fetchTableData({ pageIndex, pageSize }).then((res) => {
      setData(res.rows);
      setTotalRows(res.totalRows);
    });
  }, [pageIndex, pageSize]);

  // Return everything needed by the UI
  return {
    table,
    columns,
    data,
    totalRows,
    pageIndex,
    pageSize,
    pageCount,
    setPageIndex,
    setPageSize,
  };
}
