import { Card } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataGrid } from "../table";
import useCharityProjectsTable from "./hooks/useCharityProjectsTable";
import { ProjectDto } from "@/type/project/project.dto";
import { MediaReturnDto } from "@/type/media/media.dto";
import { ProjectCategoryEnumText, ProjectStatusEnumText } from "@/type/enum";

const CharityProjectsTable = () => {
  const columns = useMemo<ColumnDef<ProjectDto, any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "mediaDtoList",
        header: "Media",
        cell: (info) => (
          <div style={{ display: "flex", gap: "8px" }}>
            {info.getValue().map((media: MediaReturnDto) =>
              media.resourceType === "image" ? (
                <img
                  key={media.id}
                  src={media.mediaUrl}
                  alt={`Project media ${media.id}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <video
                  key={media.id}
                  src={media.mediaUrl}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              )
            )}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "categoryType",
        header: "Category",
        cell: (info) =>
          ProjectCategoryEnumText[
            info.getValue() as keyof typeof ProjectCategoryEnumText
          ],
      },
      {
        accessorKey: "goal",
        header: "Goal",
        cell: (info) => `$${info.getValue()?.toLocaleString()}`,
      },
      {
        accessorKey: "statusType",
        header: "Status",
        cell: (info) =>
          ProjectStatusEnumText[
            info.getValue() as keyof typeof ProjectStatusEnumText
          ],
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
      {
        accessorKey: "currentDonation",
        header: "Current Donation",
        cell: (info) => `$${info.getValue()?.toLocaleString()}`,
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        cell: (info) => {
          const date = new Date(info.getValue());
          return date.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
      {
        accessorKey: "charityId",
        header: "Charity ID",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "countryIsoCode",
        header: "Country",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const { loadData } = useCharityProjectsTable();

  return (
    <div className="mt-8 w-full">
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Projects </h2>
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

export default CharityProjectsTable;