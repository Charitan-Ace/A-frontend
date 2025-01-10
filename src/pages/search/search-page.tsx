import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import { ProjectCategoryEnum, ProjectStatusEnum } from "@/type/enum";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/project/service/get-projects.ts";
import {
  FilterController,
  ProjectCard,
  ProjectLoading,
} from "@/pages/search/_components";
import { Pagination } from "@/components/pagination";

const SearchPage = () => {
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
      q: parseAsString.withDefault(""),
      countryIsoCode: parseAsString.withDefault("CN"),
    },
    { history: "push" }
  );

  const { page, pageSize, category, status, q, countryIsoCode } = queryParams;

  const { data: res, isFetching } = useQuery({
    queryKey: [
      "projects",
      `query-page-${page}`,
      `query-pageSize-${pageSize}`,
      `query-category-${category}`,
      `query-status-${status}`,
      `query-q-${q}`,
      `query-countryIsoCode-${countryIsoCode}`,
    ],
    queryFn: () =>
      getProjects({
        page,
        pageSize,
        category,
        status,
        q,
        countryIsoCode: countryIsoCode ? countryIsoCode.toUpperCase() : "",
      }),
  });

  const projects = res?.data?.data;
  const totalPage = res?.data?.pages;

  return (
    <div className="mt-28 flex justify-center items-center flex-col gap-4">
      <h1 className="text-2xl font-bold">Projects!</h1>
      <FilterController
        q={q}
        setQ={(value) => setQueryParams({ q: value })}
        defaultCategory={category}
        defaultStatus={status}
        onCategoryChange={(value) => setQueryParams({ category: value })}
        onStatusChange={(value) => setQueryParams({ status: value })}
      />
      <div className="container">
        <Pagination
          currentPage={page > pageSize ? 1 : page}
          totalPages={totalPage ?? 0}
          currentPageSize={pageSize}
          setPageSize={(value) => {
            setQueryParams({ pageSize: value });  
          }}
          handleNextPage={() => setQueryParams({ page: page + 1 })}
          handlePrevPage={() => setQueryParams({ page: page - 1 })}
          goToFirstPage={() => setQueryParams({ page: 1 })}
          goToLastPage={() => setQueryParams({ page: totalPage ?? 1 })}
        />
      </div>

      {isFetching && <ProjectLoading />}
      <div className="container mx-auto p-4 flex flex-col justify-center items-center gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects &&
            !isFetching &&
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
      </div>
    </div>
  );
};

export { SearchPage };
