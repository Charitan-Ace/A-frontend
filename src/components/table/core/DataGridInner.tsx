import { Fragment } from "react";
import {
  useDataGrid,
  DataGridLoader,
  DataGridTable,
  DataGridTableBody,
  DataGridTableBodyCell,
  DataGridTableBodyRow,
  DataGridTableHead,
  DataGridTableHeadCell,
  DataGridTableEmpty,
  DataGridToolbar,
} from ".."; // Ensure these imports are correct
import { flexRender, Row, Cell } from "@tanstack/react-table"; // Import Row, Cell, and ColumnFiltersState types
import DataGridFilter from "./DataGridFilter";

const DataGridInner = <TData extends object>() => {
  const {
    loading,
    table,
    isInitialized,
    filterColumns,
    setFilters,
    filters,
    selectLabel,
  } = useDataGrid();

  const renderRows = (rows: Row<TData>[]) => {
    return rows.map((row: Row<TData>, rowIndex: number) => (
      <DataGridTableBodyRow key={rowIndex} id={row.id}>
        {row
          .getVisibleCells()
          .map((cell: Cell<TData, any>, cellIndex: number) => (
            <DataGridTableBodyCell
              key={cellIndex}
              id={cell.id}
              className={
                (cell.column.columnDef.meta as any)?.cellClassName || ""
              }
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </DataGridTableBodyCell>
          ))}
      </DataGridTableBodyRow>
    ));
  };

  return (
    <Fragment>
      <div className="grid min-w-full">
        <div className="scrollable-x-auto">
          <DataGridTable>
            <DataGridTableHead>
              {table
                .getHeaderGroups()
                .map((headerGroup) =>
                  headerGroup.headers.map((header, index) => (
                    <DataGridTableHeadCell key={index} header={header} />
                  ))
                )}
            </DataGridTableHead>
            <DataGridTableBody>
              <DataGridFilter />
              {!isInitialized ? (
                <tr></tr>
              ) : table.getRowModel().rows.length > 0 ? (
                renderRows(table.getRowModel().rows)
              ) : (
                <DataGridTableEmpty />
              )}
            </DataGridTableBody>
          </DataGridTable>
          {!isInitialized || loading ? <DataGridLoader /> : <div></div>}
        </div>
        <DataGridToolbar />
      </div>
    </Fragment>
  );
};

export { DataGridInner };
