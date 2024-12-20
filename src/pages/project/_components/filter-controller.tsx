import { LucideIcon } from "@/components/lucide-icons";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  projectCategories,
  ProjectCategoryEnum,
  ProjectStatusEnum,
  projectStatuses,
} from "@/type/enum";

interface FilterControllerProps {
  q: string;
  setQ: (value: string) => void;
  defaultStatus: ProjectStatusEnum;
  defaultCategory: ProjectCategoryEnum;
  onStatusChange: (status: ProjectStatusEnum) => void;
  onCategoryChange: (category: ProjectCategoryEnum) => void;
}

const FilterController = ({
  defaultCategory,
  defaultStatus,
  onCategoryChange,
  onStatusChange,
  q,
  setQ
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

      <Select
        onValueChange={(value) => {
          onStatusChange(value as ProjectStatusEnum);
        }}
        defaultValue={defaultStatus}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {projectStatuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              <Badge
                variant="outline"
                className={`flex items-center gap-2 ${status.classes}`}
              >
                <status.LucideIcon />
                {status.label}
              </Badge>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => {
          onCategoryChange(value as ProjectCategoryEnum);
        }}
        defaultValue={defaultCategory}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          {projectCategories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              <Badge
                variant="outline"
                className={`flex items-center gap-2 ${category.classes}`}
              >
                <category.LucideIcon />
                {category.label}
              </Badge>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { FilterController };
