import { Progress } from "@/components/ui/progress";
import { toAbsoluteUrl } from "@/utils/assets";
import { Handshake, Users, Hospital, Earth } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/project/service/get-projects";
import { ProjectCategoryEnum, ProjectStatusEnum } from "@/type/enum";
import { ProjectCard, ProjectLoading } from "../search/_components";

const HomePage = () => {
  const funFacts = [
    { icon: Handshake, numbers: "4597", text: "People Rised", offset: 30 },
    { icon: Users, numbers: "8945", text: "Volunteers", offset: 25 },
    { icon: Hospital, numbers: "10M", text: "Poor People Saved", offset: 15 },
    { icon: Earth, numbers: "4597", text: "Country Members", offset: 45 },
  ];

  const { data: res, isFetching } = useQuery({
    queryKey: ["latest-projects"],
    queryFn: () =>
      getProjects({
        page: 1,
        pageSize: 4,
        category: ProjectCategoryEnum.ALL,
        status: ProjectStatusEnum.ONGOING,
      }),
  });

  const projects = res?.data?.data;

  return (
    <div className="w-full">
      <div
        className="relative h-[35rem] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('${toAbsoluteUrl("/media/home/homeBG.png")}')`,
        }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full text-center gap-5 mt-5">
          <p className="text-primary-foreground font-montserrat font-semibold">
            Give hope for homeless
          </p>
          <h1 className="text-6xl font-semibold text-primary-foreground tracking-wide w-1/2">
            Helping each other can make world better
          </h1>
          <p className="text-lg text-primary-foreground w-1/3 font-montserrat">
            We seek out world changers and difference makers around the
            globe,and equip them to fulfill their unique purpose.
          </p>
          <div className="flex gap-10">
            <button className="relative h-[50px] w-40 overflow-hidden border border-primary bg-primary px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-300 hover:text-primary hover:before:left-0 hover:before:w-full font-montserrat">
              <span className="relative z-10">Donate Now</span>
            </button>
            <button className="relative h-[50px] w-40 overflow-hidden border border-primary bg-transparent px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-300 hover:text-primary hover:before:left-0 hover:before:w-full font-montserrat">
              <span className="relative z-10">Know about us</span>
            </button>
          </div>
        </div>

        <img
          src={toAbsoluteUrl("/media/home/homeBG-deco.png")}
          alt="scroll-down"
          className="absolute bottom-0 right-0"
        />
      </div>

      <div className="container mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-medium text-muted-foreground">
              Welcome To Charitan
            </h2>
            <div className="h-[2px] w-8 bg-primary"></div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Let Us Come Together To Make A Difference
          </h1>
          <p className="text-muted-foreground mb-8 font-montserrat">
            Join us in making a positive impact on the world. Your support can
            change lives and create a better tomorrow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-teal-600/10 p-4">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Our Mission
              </h3>
              <p className="text-sm text-muted-foreground font-montserrat">
                To empower communities by addressing their critical needs.
              </p>
            </div>
            <div className="bg-teal-600/10 p-4">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Our Vision
              </h3>
              <p className="text-sm text-muted-foreground font-montserrat">
                To create a sustainable future for all through collective
                action.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium mb-1 font-montserrat">
                <span>Donations</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-3 bg-teal-600/20" />
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium mb-1 font-montserrat">
                <span>Medical Help</span>
                <span>90%</span>
              </div>
              <Progress value={90} className="h-3 bg-teal-600/20" />
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="bg-muted h-[400px] max-w-[70%] overflow-hidden border-teal-600/20 border-8">
            <img
              src={toAbsoluteUrl("/media/test/logo-test.jpg")}
              alt="Our Work"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bg-white shadow-lg p-6 right-0 bottom-[-6rem] max-w-[70%] border-teal-600/20 border-8">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <span className="font-semibold text-primary">
                  Together, We're Going To Make The Future
                </span>
              </li>
              <li>Children where we are able to fulfill all their needs.</li>
              <li>
                Their requirements to keep them safe from challenges of the
                world.
              </li>
              <li>We have already stepped out and started making changes.</li>
              <li>Keeping them safe from war, hunger, and inequality.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-16 px-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-medium text-muted-foreground">
            Latest Projects
          </h2>
          <div className="h-[2px] w-8 bg-primary"></div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold w-2/5">
            Find The Popular Cause And Donate Them
          </h1>
          <a
            href="/project/:id"
            className="text-primary font-medium flex items-center gap-1 group hover:underline"
          >
            View All Causes
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 transition ease-in delay-50 group-hover:translate-x-1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
        {isFetching && <ProjectLoading />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects &&
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>

      <div className="container mx-auto py-16 px-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-medium text-muted-foreground">
            Our Fun Facts
          </h2>
          <div className="h-[2px] w-8 bg-primary"></div>
        </div>
        <h1 className="text-4xl font-bold mb-4 w-2/5">
          We Believe That We Can Save More Lifes With You
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          {funFacts.map((item) => (
            <div className="bg-teal-600/10 px-4 py-12 flex flex-col justify-center items-center">
              <div className="relative max-w-24 rounded-full">
                <svg
                  className="size-full -rotate-90"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-teal-600/20"
                    strokeWidth="3"
                  ></circle>
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-primary"
                    strokeWidth="3"
                    strokeDasharray="100"
                    strokeDashoffset={item.offset}
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex justify-center items-center">
                  <item.icon className="text-primary min-w-10 min-h-10" />
                </div>
              </div>
              <h1 className="text-4xl font-bold my-3">{item.numbers}+</h1>
              <h1 className="my-3 font-montserrat">{item.text}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { HomePage };
