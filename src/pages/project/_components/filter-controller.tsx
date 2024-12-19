import { Badge } from "@/components/ui/badge";
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
}: FilterControllerProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Select
        onValueChange={(value) => {
          onStatusChange(value as ProjectStatusEnum);
        }}
        defaultValue={defaultStatus}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by status"/>
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
        <SelectTrigger>
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
