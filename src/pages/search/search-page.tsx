import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import {
  projectCategories,
  ProjectCategoryEnum,
  ProjectStatusEnum,
} from "@/type/enum";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/project/service/get-projects.ts";
import {
  FilterController,
  ProjectCard,
  ProjectLoading,
} from "@/pages/search/_components";
import { Pagination } from "@/components/pagination";
import { useAuthContext } from "@/auth";
import ShortBanner from "@/components/banner/short-banner/ShortBanner";

const SearchPage = () => {
  const { auth } = useAuthContext();
  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      pageSize: parseAsInteger.withDefault(10),
      category: parseAsArrayOf<ProjectCategoryEnum>(
        parseAsStringEnum<ProjectCategoryEnum>(
          Object.values(ProjectCategoryEnum)
        )
      ),
      status: parseAsStringEnum<ProjectStatusEnum>(
        Object.values(ProjectStatusEnum)
      ).withDefault(ProjectStatusEnum.APPROVED),
      q: parseAsString.withDefault(""),
      countryIsoCode: parseAsArrayOf(parseAsString),
    },
    { history: "push" }
  );

  const { page, pageSize, category, status, q, countryIsoCode } = queryParams;

  const {
    data: res,
    isFetching,
    isLoading,
  } = useQuery({
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
        categoryTypes: category
          ? category.length === 0
            ? null
            : category
          : null,
        status: status,
        q,
        countryIsoCodes: countryIsoCode
          ? countryIsoCode.map((code) => code.toUpperCase()).length === 0
            ? null
            : countryIsoCode.map((code) => code.toUpperCase())
          : null,
      }),
  });

  const projects = res?.data?.data;
  const totalPage = res?.data?.pages;

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <ShortBanner title="Project" />

      <FilterController
        q={q}
        defaultCategory={projectCategories
          .filter((cat) => category?.includes(cat.value as ProjectCategoryEnum))
          .map((cate) => ({
            name: cate.label,
            value: cate.value as ProjectCategoryEnum,
          }))}
        defaultStatus={status}
        setQ={(value) => setQueryParams({ q: value })}
        onCategoryChange={(value) => setQueryParams({ category: value })}
        onStatusChange={(value) => setQueryParams({ status: value })}
        defaultCountry={[]}
        onCountryChange={(region) => {
          setQueryParams({
            countryIsoCode: region.map((country) => country.code),
          });
        }}
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

      {isFetching || isLoading ? (
        <ProjectLoading />
      ) : (
        <div className="container mx-auto p-4 flex flex-col justify-center items-center gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects &&
              !isFetching &&
              projects.map((project, index) => (
                <ProjectCard
                  roleId={auth!.roleId ?? "DONOR"}
                  key={index}
                  project={project}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { SearchPage };
