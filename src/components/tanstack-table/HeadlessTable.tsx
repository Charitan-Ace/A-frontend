import { useTableData } from "./hooks/useTableData";
import { TableUI } from "./components/TableUI";
import { PaginatedTable } from "./components/PaginatedTable";

function HeadlessTable() {
  const { table } = useTableData();

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Headless Table with TanStack (React Table)</h1>
      <TableUI table={table} />
      <PaginatedTable table={table} />
    </div>
  );
}

export default HeadlessTable;
