import { LucideIcon } from "@/components/lucide-icons.tsx";
import { Input } from "@/components/ui/input.tsx";

import {
  projectCategories,
  ProjectCategoryEnum,
  ProjectStatusEnum,
  projectStatuses,
} from "@/type/enum";
import { MultiSelect } from "./multi-select";

interface FilterControllerProps {
  q: string;
  setQ: (value: string) => void;
  defaultCategory: { name: string; value: ProjectCategoryEnum }[];
  defaultStatus: { name: string; value: ProjectStatusEnum }[];
  onStatusChange: (statuses: ProjectStatusEnum[]) => void;
  onCategoryChange: (category: ProjectCategoryEnum[]) => void;
}

const FilterController = ({
  onCategoryChange,
  onStatusChange,
  defaultCategory,
  defaultStatus,
  q,
  setQ,
}: FilterControllerProps) => {
  return (
    <div className="flex items-center justify-center gap-4 container">
      <div className="relative w-full">
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
      />

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
