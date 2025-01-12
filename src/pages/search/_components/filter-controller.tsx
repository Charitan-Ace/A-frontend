import { LucideIcon } from "@/components/lucide-icons.tsx";
import { Input } from "@/components/ui/input.tsx";

import {
  projectCategories,
  ProjectCategoryEnum,
  ProjectStatusEnum,
  projectStatuses,
} from "@/type/enum";
import { MultiSelect } from "./multi-select";
import { IRegion } from "@/type/geography";
import { useQuery } from "@tanstack/react-query";
import { getAllRegion } from "@/api/geography/get-all-region";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { type } from "os";
import { Fragment } from "react/jsx-runtime";

interface FilterControllerProps {
  q: string;
  setQ: (value: string) => void;
  defaultCategory: { name: string; value: ProjectCategoryEnum }[];
  defaultStatus: ProjectStatusEnum;
  defaultRegion: { name: string; value: IRegion }[];
  onStatusChange: (statuses: ProjectStatusEnum) => void;
  onCategoryChange: (category: ProjectCategoryEnum[]) => void;
  onRegionChange: (region: IRegion[]) => void;
}

const FilterController = ({
  onCategoryChange,
  onStatusChange,
  defaultCategory,
  defaultStatus,
  defaultRegion,
  onRegionChange,
  q,
  setQ,
}: FilterControllerProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getAllRegion(),
  });

  return (
    <div className="flex flex-wrap items-center justify-center container">
      <div className="relative flex-1">
        <Input
          type="search"
          placeholder="Search the history..."
          className="pl-8"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <LucideIcon
          name="Search"
          className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50"
        />
      </div>

      {isLoading ? (
        <Skeleton />
      ) : (
        data?.data && (
          <MultiSelect<IRegion>
            filterBy={"Region"}
            defaultItems={defaultRegion}
            options={data.data.map((region) => ({
              name: region.name,
              value: region,
            }))}
            onValueChange={(selectedRegions) =>
              onRegionChange(selectedRegions.map((status) => status.value))
            }
          />
        )
      )}

      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="category-select">Status</InputLabel>
        <Select
          labelId="status-select"
          label="Status"
          value={defaultStatus}
          onChange={(e) => onStatusChange(e.target.value as ProjectStatusEnum)}
        >
          {Object.values(ProjectStatusEnum).map((status) => {

            return (
              <MenuItem key={status} value={status}>
                {status.charAt(0) + status.toLowerCase().slice(1)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {/* 
      <MultiSelect<ProjectStatusEnum>
        filterBy={"Status"}
        defaultItems={defaultStatus}
        options={projectStatuses.map((status) => ({
          name: status.label,
          value: status.value as ProjectStatusEnum,
        }))}
        onValueChange={(selectedStatuses) =>
          onStatusChange(
            selectedStatuses.map((status) => status.value as ProjectStatusEnum)
          )
        }
      /> */}

      <MultiSelect<ProjectCategoryEnum>
        filterBy={"Category"}
        defaultItems={defaultCategory}
        options={projectCategories.map((category) => ({
          name: category.label,
          value: category.value as ProjectCategoryEnum,
        }))}
        onValueChange={(selectedCategories) =>
          onCategoryChange(
            selectedCategories.map(
              (category) => category.value as ProjectCategoryEnum
            )
          )
        }
      />
    </div>
  );
};

export { FilterController };
