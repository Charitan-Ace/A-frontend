import { createProject } from "@/api/project/service/create-project";
import { ProjectCategoryEnum } from "@/type/enum";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import MediaUploadForm from "./media-upload";
import { useMediaForm } from "../_hooks/use-media-form";
import { uploadImages } from "@/api/media/upload-images";
import { MediaFile } from "@/type/media/media.dto";
import { useNavigate } from "react-router-dom";
import { COUNTRIES } from "@/type/geography";
import { queryClient } from "@/api/client";
import { updateProject } from "@/api/project/service/update-project";
import { ProjectDto } from "@/type/project/project.dto";
import { useProjectForm } from "../_hooks/use-project-form";
import { Controller } from "react-hook-form";

const addTimeZoneOffset = (date: string) => {
  const offset = -new Date().getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const offsetMinutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
  const offsetSign = offset >= 0 ? "+" : "-";
  return `${date}${offsetSign}${offsetHours}:${offsetMinutes}`;
};

interface CreateProjectFormProps {
  updateProjectDto?: ProjectDto;
}

const CreateProjectForm = ({ updateProjectDto }: CreateProjectFormProps) => {
  const {
    watch,
    getValues,
    register,
    formValid,
    errors,
    handleSubmit,
    control,
  } = useProjectForm(updateProjectDto);
  const { mediaFiles, removeFile, handleFileChange, isValid } = useMediaForm({
    maxSizeMB: 1,
    maxNumberImageFiles: 15,
    maxNumberVideoFiles: 4,
  });

  const router = useNavigate();

  const description = watch("description");

  const uploadProjectMedia = useMutation({
    mutationKey: ["uploadProjectMedia"],
    mutationFn: ({ id, files }: { id: string; files: MediaFile[] }) => {
      return uploadImages(files, id);
    },
    onMutate: () => {
      toast.loading("Uploading project media...");
    },
    onSuccess: (data) => {
      const mediaData = data.data;
      if (data.error) {
        toast.error(data.error);
      }
      if (!mediaData) {
        toast.error(data.error);
        return;
      }
      toast.dismiss();
      toast.success("Image uploaded successfully");

      queryClient.invalidateQueries({
        queryKey: ["project", mediaData.data[0].projectId],
      });
      router(`/project/${mediaData.data[0].projectId}?isLoadingImages=false`);
    },
  });
  const createNewProject = useMutation({
    mutationKey: ["createProject"],
    mutationFn: () => {
      const values = getValues();
      return createProject({
        ...values,
        startTime: addTimeZoneOffset(values.startTime),
        endTime: addTimeZoneOffset(values.endTime),
        categoryType: values.categoryType
          ?.valueOf()
          .toUpperCase() as ProjectCategoryEnum,
      });
    },

    onSuccess: (data) => {
    console.log(1414, data)

      if (data.error) {
        toast.error(data.error);
      }

      const projectData = data.data;
      if (!projectData) {
        toast.error(data.error);
        return;
      }

      uploadProjectMedia.mutate({ files: mediaFiles, id: projectData.id });
      router(`/project/${projectData.id}?isLoadingImages=true`);
    },
  });

  const updateProjectDetails = useMutation({
    mutationKey: ["updateProject"],
    mutationFn: ({ projectId }: { projectId: string }) => {
      const values = getValues();
      return updateProject(
        {
          ...values,
          startTime: addTimeZoneOffset(values.startTime),
          endTime: addTimeZoneOffset(values.endTime),
          categoryType: values.categoryType
            ?.valueOf()
            .toUpperCase() as ProjectCategoryEnum,
        },
        projectId
      );
    },

    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      }

      const projectData = data.data;
      if (!projectData) {
        toast.error(data.error);
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["project", projectData.id],
      });

      router(`/project/${projectData.id}`);
    },
  });

  const onSubmit = () => {
    if (!updateProjectDto) {
      createNewProject.mutate();
      return;
    }

    updateProjectDetails.mutate({ projectId: updateProjectDto.id });
    return;
  };

  return (
    <div className="container m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Project Title"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Project Description"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("description", {
            maxLength: {
              value: 200,
              message: `Description cannot exceed ${200} characters`,
            },
          })}
          multiline
          maxRows={5}
          error={!!errors.description}
          helperText={
            <span className="flex justify-between">
              <span>{errors.description?.message}</span>
              <span>
                {description.length}/{200}
              </span>
            </span>
          }
        />

        <TextField
          label="Goal Amount"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          {...register("goal")}
          error={!!errors.goal}
          helperText={errors.goal?.message}
        />

        {!updateProjectDto && (
          <div className="flex gap-2 items-center">
            <TextField
              label="Start Date"
              type="datetime-local"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("startTime")}
              error={!!errors.startTime}
              helperText={errors.startTime?.message}
            />

            <TextField
              label="End Date"
              type="datetime-local"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("endTime")}
              error={!!errors.endTime}
              helperText={errors.endTime?.message}
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-select">Category Type</InputLabel>
            <Controller
              control={control}
              name="categoryType"
              render={({ field }) => (
                <Select
                  {...field}
                  id="category-select"
                  labelId="category-select"
                  label="Category Type"
                  error={!!errors.categoryType}
                >
                  {Object.values(ProjectCategoryEnum).map((type) => {
                    return (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="country-code">Country</InputLabel>

            <Controller
              control={control}
              name="countryIsoCode"
              render={({ field }) => (
                <Select
                  {...field}
                  id="ountry-code"
                  labelId="ountry-code"
                  label="Country"
                  error={!!errors.countryIsoCode}
                >
                  {COUNTRIES.map((country) => {
                    return (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
            {/* <Select
              labelId="country-code"
              label="Country"
              {...register("countryIsoCode")}
              error={!!errors.countryIsoCode}
            >
              {COUNTRIES.map((country) => {
                return (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select> */}
          </FormControl>
        </div>

        {!updateProjectDto && (
          <MediaUploadForm
            isValid={isValid}
            mediaFiles={mediaFiles}
            removeFile={removeFile}
            handleFileChange={handleFileChange}
          />
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={
            (!updateProjectDto && !isValid) ||
            createNewProject.isPending ||
            updateProjectDetails.isPending ||
            !formValid
          }
          sx={{ mt: 2 }}
        >
          {!updateProjectDto ? "Create Project" : "Update Project"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
