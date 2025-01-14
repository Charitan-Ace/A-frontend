import ShortBanner from "@/components/banner/short-banner/ShortBanner";
import CharityProjectsTable from "@/components/charity-projects-table/CharityProjectsTable";

const ProjectPage = () => {
  return (
    <div>
      <ShortBanner title="My Projects" />
      <div className="mx-4">
        <CharityProjectsTable />
      </div>
    </div>
  );
};

export { ProjectPage };
