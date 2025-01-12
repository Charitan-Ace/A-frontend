import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { projectStatuses } from "@/type/enum";
import { ProjectDto } from "@/type/project/project.dto";
import { useState } from "react";
import DonateFormUI from "@/components/donate-form/DonateForm";

interface ProjectCardProps {
  project: ProjectDto;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const currentDonateProgress = Math.round(
    (project.currentDonation / project.goal) * 100
  );

  const projectStatus = projectStatuses.find(
    (status) => status.value === project.status
  );

  const [showDonateForm, setShowDonateForm] = useState(false);

  return (
    <>
      <Card className="max-w-md overflow-hidden">
        <div className="group relative h-[400px] bg-muted">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gray-600/0 opacity-0 transition-all group-hover:bg-gray-600/80 group-hover:opacity-100">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-xl"
              onClick={() => setShowDonateForm(true)}
            >
              Donate Now
            </Button>
          </div>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-emerald-600 font-medium">
                {project.category}
              </span>

              {projectStatus && (
                <Badge
                  variant="outline"
                  className={`flex items-center gap-2 ${projectStatus.classes}`}
                >
                  <projectStatus.LucideIcon />
                  {projectStatus.label}
                </Badge>
              )}
            </div>
            <h2 className="text-4xl font-serif">{project.name}</h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Donation</span>
              <span className="font-medium">{currentDonateProgress}%</span>
            </div>
            <Progress
              value={currentDonateProgress}
              className="h-2 bg-teal-600/20"
            />
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-medium">
                Raised: ${project.currentDonation.toLocaleString("en-Us")}
              </span>
              <span className="text-lg font-medium">
                Goal: ${project.goal.toLocaleString("en-Us")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      {showDonateForm && (
        <DonateFormUI
          projectName={project.name}
          projectId={project.id}
          onClose={() => setShowDonateForm(false)}
        />
      )}
    </>
  );
};

export { ProjectCard };
