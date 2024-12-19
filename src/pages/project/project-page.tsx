import { getProjects } from "@/api/project/service/get-projects";
import { ProjectCategoryEnum, ProjectStatusEnum } from "@/type/enum";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";
import { FilterController, ProjectCard, ProjectLoading } from "./_components";
import { Pagination } from "@/components/pagination/pagination";

const ProjectPage = () => {
  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(10),
      category: parseAsStringEnum<ProjectCategoryEnum>(
        Object.values(ProjectCategoryEnum)
      ).withDefault(ProjectCategoryEnum.ALL),
      status: parseAsStringEnum<ProjectStatusEnum>(
        Object.values(ProjectStatusEnum)
      ).withDefault(ProjectStatusEnum.ONGOING),
    },
    { history: "push" }
  );

  const { page, pageSize, category, status } = queryParams;

  const { data: res, isFetching } = useQuery({
    queryKey: [
      "projects",
      `query-page-${page}`,
      `query-pageSize-${pageSize}`,
      `query-category-${category}`,
      `query-status-${status}`,
    ],
    queryFn: () => getProjects({ page, pageSize, category, status }),
  });

  const projects = res?.data?.data;
  const totalPage = res?.data?.pages;

  return (
    <div className="mt-28 flex justify-center items-center flex-col gap-4">
      <h1 className="text-2xl font-bold">Projects!</h1>
      {isFetching && <ProjectLoading />}
      <div className="container mx-auto p-4 flex flex-col justify-center items-center gap-2">
        <FilterController
          defaultCategory={category}
          defaultStatus={status}
          onCategoryChange={(value) => setQueryParams({ category: value })}
          onStatusChange={(value) => setQueryParams({ status: value })}
        />
        <Pagination
          currentPage={page > pageSize ? 1 : page}
          totalPages={totalPage ?? 0}
          currentPageSize={pageSize}
          setPageSize={(value) => {
            console.log(value);
            setQueryParams({ pageSize: value });
          }}
          handleNextPage={() => setQueryParams({ page: page + 1 })}
          handlePrevPage={() => setQueryParams({ page: page - 1 })}
          goToFirstPage={() => setQueryParams({ page: 1 })}
          goToLastPage={() => setQueryParams({ page: totalPage ?? 1 })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects &&
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
      </div>
    </div>
  );
};

export { ProjectPage };
