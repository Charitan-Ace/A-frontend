import {
  CreateProjectInput,
  createProjectSchema,
} from "@/api/project/schema/create-project";
import { ProjectCategoryEnum } from "@/type/enum";
import { ProjectDto } from "@/type/project/project.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const dateFormatter = (date: Date) => {
  const offset = -new Date().getTimezoneOffset();
  const offsetDate = new Date(date.getTime() + offset * 60 * 1000);
  return offsetDate.toISOString().slice(0, 16);
};

const useProjectForm = (updateProjectDto?: ProjectDto) => {
  const defaultValues = !updateProjectDto
    ? {
        title: "",
        description: "",
        goal: 0,
        startTime: dateFormatter(new Date(Date.now() + 60 * 60 * 1000)),
        endTime: dateFormatter(new Date(Date.now() + 24 * 60 * 60 * 1000 * 7)), // 24 hours from now
        categoryType: ProjectCategoryEnum.HEALTH,
        countryIsoCode: "",
      }
    : {
        title: updateProjectDto.title,
        description: updateProjectDto.description,
        goal: updateProjectDto.goal,
        startTime: dateFormatter(new Date(updateProjectDto.startTime)),
        endTime: dateFormatter(new Date(updateProjectDto.endTime)),
        categoryType: updateProjectDto.categoryType,
        countryIsoCode: updateProjectDto.countryIsoCode,
      };

  const {
    getValues,
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid: formValid },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues,
    mode: "onChange",
  });

  return {
    getValues,
    register,
    handleSubmit,
    watch,
    control,
    errors,
    formValid,
  };
};

export { useProjectForm };
