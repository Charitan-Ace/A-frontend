import useCharityProjectsTable from "./hooks/useCharityProjectsTable";
import { ProjectDto } from "@/type/project/project.dto";
import { ProjectCategoryEnumText, ProjectStatusEnumText } from "@/type/enum";
import { Button } from "@mui/material";
import { PenSquareIcon } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Card } from "@mui/material";
import { DataGrid } from "../table";
import { useMemo } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { ProjectStatus } from "@/type/auth/model";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CharityProjectsTable = () => {
  const columns = useMemo<ColumnDef<ProjectDto, any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: (info) => (
          <a
            className="hover:text-blue-500"
            href={`/project/${info.getValue()}`}
          >
            {info.getValue()}
          </a>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: (info) => info.getValue(),
      },
      // {
      //   accessorKey: "mediaDtoList",
      //   header: "Media",
      //   cell: (info) => (
      //     <div style={{ display: "flex", gap: "8px" }}>
      //       {info.getValue().map((media: MediaReturnDto) =>
      //         media.resourceType === "image" ? (
      //           <img
      //             key={media.id}
      //             src={media.mediaUrl}
      //             alt={`Project media ${media.id}`}
      //             style={{
      //               width: "50px",
      //               height: "50px",
      //               objectFit: "cover",
      //             }}
      //           />
      //         ) : (
      //           <video
      //             key={media.id}
      //             src={media.mediaUrl}
      //             style={{
      //               width: "50px",
      //               height: "50px",
      //               objectFit: "cover",
      //             }}
      //           />
      //         )
      //       )}
      //     </div>
      //   ),
      // },
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
      // {
      //   accessorKey: "charityId",
      //   header: "Charity ID",
      //   cell: (info) => info.getValue(),
      // },
      {
        accessorKey: "countryIsoCode",
        header: "Country",
        cell: (info) => info.getValue(),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const project = row.original;

          return (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <PenSquareIcon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="!max-w-[30%]">
                <AlertDialogTitle>
                  Project status change! - Project: {project.title}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Would you want to change the status of the project to
                  complete? Changes made will notice subscribers.
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>

                {/* <CreateProjectForm /> */}
              </AlertDialogContent>
            </AlertDialog>
          );
        },
      },
    ],
    []
  );

  const { loadData, status, setStatus } = useCharityProjectsTable();

  return (
    <div className="mt-8 w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="status-select">Status</Label>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value as ProjectStatus)}
        >
          <SelectTrigger id="status-select" className="w-[200px]">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {Object.values(ProjectStatus).map((statusKey) => (
                <SelectItem key={statusKey} value={statusKey}>
                  {ProjectStatusEnumText[statusKey]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
          reloadTrigger={Object.values(ProjectStatus).indexOf(status)}
        />
      </Card>
    </div>
  );
};

export default CharityProjectsTable;
