/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { createContext, useContext, useEffect, useState } from "react";
import {
  FilterColumn,
  TDataGridProps,
  TDataGridSelectedRowIds,
} from "./DataGrid";
import { deepMerge } from "@/utils/deep-merge";

export interface IDataGridContextProps<TData extends object> {
  props: TDataGridProps<TData>;
  table: any;
  totalRows: number;
  filterColumns?: FilterColumn[];
  loading: boolean;
  setLoading: (state: boolean) => void;
  selectedRowIds: Set<string>;
  toggleRowSelection: (id: string) => void;
  toggleAllRowsSelection: (checked: boolean) => void;
  getSelectedRowIds: () => string[];
  isSelectAllChecked: boolean;
  isSelectAllIndeterminate: boolean;
  reloadTrigger?: number;
  filters: any;
  setFilters: (filters: any) => void;
  selectLabel?: string;
  isInitialized: boolean;
}

const DataGridContext = createContext<IDataGridContextProps<any> | undefined>(
  undefined
);

export const useDataGrid = () => {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error("useDataGrid must be used within a DataGridProvider");
  }
  return context;
};

export const DataGridProvider = <TData extends object>({
  children,
  ...props
}: TDataGridProps<TData> & { children: React.ReactNode }) => {
  const defaultValues: Partial<TDataGridProps<TData>> = {
    messages: {
      empty: "Không có dữ liệu",
      loading: "Đang tải",
    },
    pagination: {
      info: "{from} -> {to}",
      // info: '{from} - {to} of {count}',
      sizes: [5, 10, 25, 50, 100],
      sizesLabel: "⚙️",
      sizesDescription: "dòng / trang",
      size: 5,
      page: 0,
      moreLimit: 5,
      more: false,
    },
    layout: { cellsBorder: true },
    rowSelect: false,
    serverSide: false,
  };

  const mergedProps = deepMerge(defaultValues, props);

  const [data, setData] = useState<TData[]>(mergedProps.data ?? []);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(
    mergedProps.data?.length ?? 0
  );

  // State management for selected rows
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(
    mergedProps?.selectedRowIds ?? new Set()
  );
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false);
  const [isSelectAllIndeterminate, setIsSelectAllIndeterminate] =
    useState<boolean>(false);

  // Pagination, Sorting, and Filters from props
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: props.pagination?.page ?? 0,
    pageSize: props.pagination?.size ?? 5,
  });
  const [sorting, setSorting] = useState<any[]>(mergedProps.sorting ?? []);
  const [filters, setFilters] = useState<ColumnFiltersState>(
    mergedProps.filters ?? []
  );

  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch data for server-side pagination, sorting, and filtering
  const fetchServerSideData = async () => {
    if (!mergedProps.onFetchData) return;

    setLoading(true);

    try {
      const requestParams = {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sorting,
        filters,
      };

      const { data, total } = await mergedProps.onFetchData(requestParams);
      if (data) {
        setData(data);
        setTotalRows(total);
        setIsInitialized(true);
      } else {
        console.log(2, "data does not exist", total, data);
        setData([]);
        setTotalRows(0);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);

      setLoading(false);
      setIsInitialized(true);
    }
  };

  const table = useReactTable({
    columns: mergedProps.columns,
    data: data,
    debugTable: false,
    pageCount: mergedProps.serverSide
      ? Math.ceil(totalRows / pagination.pageSize)
      : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: mergedProps.serverSide,
    manualSorting: mergedProps.serverSide,
    manualFiltering: mergedProps.serverSide,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setFilters,
    state: {
      pagination,
      sorting,
      columnFilters: filters,
    },
  });

  const toggleRowSelection = (id: string) => {
    setSelectedRowIds((prevSelected) => {
      const newSelected: TDataGridSelectedRowIds = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      if (props.onRowsSelectChange) {
        props.onRowsSelectChange(newSelected);
      }
      return newSelected;
    });
  };

  const toggleAllRowsSelection = (checked: boolean) => {
    const allRowIds = table.getRowModel().rows.map((row) => row.id);

    const newSelectedRowIds: TDataGridSelectedRowIds = checked
      ? new Set(allRowIds)
      : new Set();
    setSelectedRowIds(newSelectedRowIds);
    if (props.onRowsSelectChange) {
      props.onRowsSelectChange(newSelectedRowIds);
    }
  };

  const getSelectedRowIds = () => {
    return Array.from(selectedRowIds);
  };

  const handleStateChange = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (props.selectedRowIds) {
      setSelectedRowIds(new Set(props.selectedRowIds));
    }
  }, [props.selectedRowIds]);

  useEffect(() => {
    if (mergedProps.serverSide) {
      fetchServerSideData();
    }
  }, [pagination, sorting, filters, mergedProps.reloadTrigger]);

  useEffect(() => {
    if (table.getState().sorting.length > 0) {
      handleStateChange();
    }
  }, [table.getState().sorting]);

  useEffect(() => {
    handleStateChange();
  }, [table.getState().pagination]);

  useEffect(() => {
    const allRowIds = table.getRowModel().rows.map((row) => row.id);
    const isAllSelected = allRowIds.every((id) => selectedRowIds.has(id));
    const isSomeSelected = allRowIds.some((id) => selectedRowIds.has(id));

    setIsSelectAllChecked(isAllSelected);
    setIsSelectAllIndeterminate(!isAllSelected && isSomeSelected);
  }, [selectedRowIds, table.getRowModel().rows]);

  return (
    <DataGridContext.Provider
      value={{
        props: mergedProps,
        table,
        totalRows,
        loading,
        setLoading,
        selectedRowIds,
        toggleRowSelection,
        toggleAllRowsSelection,
        getSelectedRowIds,
        isSelectAllChecked,
        isSelectAllIndeterminate,
        filters,
        setFilters,
        filterColumns: props.filterColumns,
        selectLabel: props.selectLabel,
        isInitialized,
      }}
    >
      {children}
    </DataGridContext.Provider>
  );
};
