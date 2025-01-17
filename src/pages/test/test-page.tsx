import getTopDonorsByCharity from "@/api/donation/service/getTopDonorsByCharity";
import { getProjects } from "@/api/project";
import getProjectsMe from "@/api/project/service/get-projects-by-charity";
import getTotalDonation from "@/api/statistics/service/getTotalDonation";
import { Button } from "@/components/ui/button";
import { ProjectCategoryEnum, ProjectStatusEnum } from "@/type/enum";

const TestPage = () => {
  const getTest = async () => {
    const res = await fetch(
      "https://gateway.tail03350e.ts.net/project/my-projects/status/PENDING"
    );
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="grid grid-cols-5 gap-5">
        <Button
          onClick={() =>
            getProjects({
              page: 1,
              pageSize: 10,
              categoryTypes: [ProjectCategoryEnum.HEALTH],
              status: ProjectStatusEnum.APPROVED,
              countryIsoCodes: ["VN", "US"],
            })
          }
        >
          Get Projects
        </Button>
        <Button onClick={() => getTotalDonation()}>
          Get Total Statistic Donation
        </Button>
        <Button onClick={() => getProjectsMe({ pageIndex: 10, pageSize: 10 })}>
          Project Me
        </Button>
        <Button onClick={() => getTest()}>Test projects by charity</Button>
        <Button onClick={() => getTotalDonation()}>Total Donation</Button>
        <Button onClick={() => getTopDonorsByCharity()}>Top Donors</Button>
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
