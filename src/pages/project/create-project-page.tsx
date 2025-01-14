import ShortBanner from "@/components/banner/short-banner/ShortBanner";
import CreateProjectForm from "./_component/create-project-form";

const CreateProjectPage = () => {
  return (
    <div>
      <ShortBanner title="Create Project" />

      <CreateProjectForm />
    </div>
  );
};

export { CreateProjectPage };
