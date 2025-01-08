export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

export interface FetchTableDataParams {
  pageIndex: number;
  pageSize: number;
}

const TOTAL_ROWS = 35;

// Simulated data
const MOCK_DATA: Person[] = Array.from({ length: TOTAL_ROWS }, (_, idx) => ({
  id: idx + 1,
  firstName: `First${idx + 1}`,
  lastName: `Last${idx + 1}`,
  age: 20 + ((idx + 1) % 10),
}));

/**
 * Simulate fetching a page of data from the server
 */
export async function fetchTableData({
  pageIndex,
  pageSize,
}: FetchTableDataParams): Promise<{
  rows: Person[];
  totalRows: number;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = pageIndex * pageSize;
      const end = start + pageSize;
      const rows = MOCK_DATA.slice(start, end);
      resolve({ rows, totalRows: TOTAL_ROWS });
    }, 500);
  });
}
