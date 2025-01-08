import React from "react";
import { Table } from "@tanstack/react-table";
import type { Person } from "../api/tableApi";

interface PaginatedTableProps {
  table: Table<Person>;
}

export function PaginatedTable({ table }: PaginatedTableProps) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </button>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </button>
      <span style={{ margin: "0 1rem" }}>
        Page{" "}
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[5, 10, 15, 20].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
}
