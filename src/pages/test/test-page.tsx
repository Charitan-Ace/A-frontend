import { getProjects } from "@/api/project";
import getTotalDonation from "@/api/statistics/service/getTotalDonation";
import { Button } from "@/components/ui/button";
import { ProjectCategoryEnum, ProjectStatusEnum } from "@/type/enum";

const TestPage = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="grid grid-cols-5 gap-5">
        <Button
          onClick={() =>
            getProjects({
              page: 1,
              pageSize: 10,
              categoryTypes: [ProjectCategoryEnum.HEALTH],
              status: ProjectStatusEnum.ONGOING,
              countryIsoCodes: ["VN", "US"],
            })
          }
        >
          Get Projects
        </Button>
        <Button onClick={() => getTotalDonation()}>
          Get Total Statistic Donation
        </Button>
        <Button onClick={() => {}}>Test Page</Button>
        <Button onClick={() => {}}>Test Page</Button>
        <Button onClick={() => {}}>Test Page</Button>
        <Button onClick={() => {}}>Test Page</Button>
        <Button onClick={() => {}}>Test Page</Button>
        <Button onClick={() => {}}>Test Page</Button>
        <Button onClick={() => {}}>Test Page</Button>
        <Button onClick={() => {}}>Test Page</Button>
        <Button onClick={() => {}}>Test Page</Button>
      </div>
    </div>
  );
};

export default TestPage;
