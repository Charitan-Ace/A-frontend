import { LucideIcon } from "@/components/lucide-icons.tsx";
import { Input } from "@/components/ui/input.tsx";

import {
  projectCategories,
  ProjectCategoryEnum,
  ProjectStatusEnum,
} from "@/type/enum";
import { MultiSelect } from "./multi-select";
import { COUNTRIES, ICountry, IRegion, REGIONS } from "@/type/geography";
import { useQuery } from "@tanstack/react-query";
import { getAllRegion } from "@/api/geography/get-all-region";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";

interface FilterControllerProps {
  q: string;
  setQ: (value: string) => void;
  defaultCategory: { name: string; value: ProjectCategoryEnum }[];
  defaultStatus: ProjectStatusEnum;
  defaultCountry: { name: string; value: ICountry }[];
  onStatusChange: (statuses: ProjectStatusEnum) => void;
  onCategoryChange: (category: ProjectCategoryEnum[]) => void;
  onCountryChange: (country: ICountry[]) => void;
}

const FilterController = ({
  onCategoryChange,
  onStatusChange,
  defaultCategory,
  defaultStatus,
  defaultCountry,
  onCountryChange,
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

      {/* {isLoading ? (
        <Skeleton />
      ) : (
        data?.data && ( */}
      <MultiSelect<ICountry>
        filterBy={"Country"}
        defaultItems={defaultCountry}
        isSearchable={true}
        options={COUNTRIES.map((country) => ({
          name: country.name,
          value: country,
        }))}
        onValueChange={(selectedCountries) =>
          onCountryChange(selectedCountries.map((country) => country.value))
        }
      />
      {/* )
      )} */}

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
