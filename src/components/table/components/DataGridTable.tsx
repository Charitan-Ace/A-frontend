import React, { ReactNode } from "react";
import { useDataGrid } from "..";
import clsx from "clsx";
import { useSettings } from "@/providers";

export interface TDataGridTableProps {
  children: ReactNode;
}

const DataGridTable = ({ children }: TDataGridTableProps) => {
  const { props } = useDataGrid();

  const { settings } = useSettings();

  const spacingClasses = {
    xs: "table-xs",
    sm: "table-sm",
    lg: "table-lg",
  };

  // console.log('settings');

  return (
    <table
      className={clsx(
        "table table-striped font-normal w-full",
        settings.themeMode === "dark" && "table-dark",
        props.layout?.cellsBorder && "table-border",
        props.layout?.tableSpacing && spacingClasses[props.layout.tableSpacing]
      )}
    >
      {children}
    </table>
  );
};

export { DataGridTable };
