import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText } from "lucide-react";
import { DonateForm } from "@/pages/search/_components/donate-form";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/project/service/get-project-by-id";
import { ImagesCarousel } from "./_component/project-images-carousel";
import ShortBanner from "@/components/banner/short-banner/ShortBanner";
import { useAuthContext } from "@/auth";
import { useEffect, useState } from "react";
import SubscriptionForm from "@/components/subscription-form/SubscriptionForm";
import getSubscribeProjects from "@/api/payment/service/getSubscribedProject";
import cancelSubscription from "@/api/payment/service/cancelSubscription";
import { toast, ToastContainer } from "react-toastify";
import DonateFormUI from "@/components/donate-form/DonateForm";
import { CharityModel } from "@/type/auth/model";
import getProfileCharityById from "@/api/profile/service/getProfileCharityById";

const ProjectDetailPage = () => {
  const projectId = useParams<{ id: string }>().id;
  const [searchParams] = useSearchParams();
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [charityInfo, setCharityInfo] = useState<CharityModel | null>(null);

  const { auth } = useAuthContext();

  const isLoadingImages = searchParams.get("isLoadingImages") === "true";

  const { data: projectRes } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById({ projectId: projectId ?? "" }),
    enabled: !!projectId,
  });

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subscriptions = await getSubscribeProjects();

        if (subscriptions && Array.isArray(subscriptions)) {
          console.log("subscriptions:", subscriptions);
          const isSubscribedToProject = subscriptions.includes(projectId ?? "");
          if (isSubscribedToProject) {
            setIsSubscribed(true);
            setSubscriptionId(projectId ?? null);
          } else {
            setIsSubscribed(false);
          }
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, [projectId]);

  const handleCancelSubscription = async () => {
    if (!subscriptionId) {
      console.error("No subscriptionId found. Cannot cancel subscription.");
      return;
    }

    try {
      const success = await cancelSubscription(subscriptionId);
      if (success) {
        setIsSubscribed(false);
        setSubscriptionId(null);
        toast.success("Subscription canceled successfully.");
      } else {
        toast.error("Failed to cancel subscription. Please try again.");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error("An error occurred while canceling your subscription.");
    }
  };

  useEffect(() => {
    const fetchCharityInfo = async () => {
      if (project?.charityId) {
        const data = await getProfileCharityById(project.charityId);
        setCharityInfo(data);
      }
    };

    fetchCharityInfo();
  }, []);

  if (!projectRes) {
    return;
  }

  const { data: project } = projectRes;

  

  const TEMP_IMAGES = [
    "https://i.pinimg.com/736x/ea/46/f2/ea46f2abca222b60f478adaf9828f1f5.jpg",

    "https://i.pinimg.com/474x/49/ea/cf/49eacfdc693f2cc7f1ca9dd14e075d62.jpg",

    "https://i.pinimg.com/736x/60/d3/f4/60d3f467cb0aae3cf56275ff51986996.jpg",
  ];

  return (
    <div>
      <ShortBanner title={project ? project.title : "No Project found!"} />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {project && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {/* Main content */}
                <div className="space-y-8">
                  {/* Hero Image */}
                  {isLoadingImages && project.mediaDtoList.length === 0 ? (
                    <div className="aspect-video rounded-lg bg-gray-600" />
                  ) : (
                    <ImagesCarousel
                      images={
                        project.mediaDtoList.length === 0
                          ? TEMP_IMAGES
                          : project.mediaDtoList
                              .filter((media) => !media.isThumbnail)
                              .map((media) => media.mediaUrl)
                      }
                    />
                  )}

                  {/* Donate Button */}
                  <div className="flex gap-4">
                    {(auth?.roleId !== "CHARITY" || !auth) && (
                      <Button
                        className="rounded-sm text-white hover:bg-emerald-900"
                        onClick={() => setShowDonateForm(true)}
                      >
                        Donate Now
                      </Button>
                    )}
                    {showDonateForm && (
                      <DonateFormUI
                        projectName={project.title}
                        projectId={project.id}
                        onClose={() => setShowDonateForm(false)}
                      />
                    )}
                    {auth?.roleId == "DONOR" && (
                      <>
                        {isSubscribed ? (
                          <Button
                            className="rounded-sm text-white hover:bg-red-700"
                            onClick={handleCancelSubscription}
                          >
                            Cancel Subscription
                          </Button>
                        ) : (
                          <Button
                            className="rounded-sm text-white hover:bg-emerald-900"
                            onClick={() => setShowSubscriptionForm(true)}
                          >
                            Subscribe Monthly Donation
                          </Button>
                        )}
                      </>
                    )}
                    {showSubscriptionForm && (
                      <SubscriptionForm
                        projectId={projectId ?? ""}
                        projectName={project.title}
                        onClose={() => setShowSubscriptionForm(false)}
                      />
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">
                        Project Progress
                      </span>
                      <span className="text-2xl font-medium">
                        {Math.round(
                          (project.currentDonation / project.goal) * 100
                        )}
                        %
                      </span>
                    </div>

                    <Progress
                      value={project.currentDonation}
                      className="h-2 bg-gray-100"
                    />
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-medium">
                        Raised: $
                        {project.currentDonation?.toLocaleString("en-Us")}
                      </span>
                      <span className="text-lg font-medium">
                        Goal: ${project.goal?.toLocaleString("en-Us")}
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-bold mb-4">
                        Project Description
                      </h2>
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                    </section>

                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <Card className="bg-teal-600/10 text-primary">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Project Period</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Start Date:</span>
                        <span className="text-gray-600">
                          {project.startTime
                            ? new Date(project.startTime).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">End Date:</span>
                        <span className="text-gray-600">
                          {project.endTime
                            ? new Date(project.endTime).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary Documents */}
                <Card className="bg-teal-600/10 text-primary">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Charity Information
                      {/* {project.charityId} */}
                    </h2>
                    {charityInfo ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-semibold">Organization:</span>
                          <span className="text-gray-600">
                            {charityInfo.companyName || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Type:</span>
                          <span className="text-gray-600">
                            {charityInfo.organizationType || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Address:</span>
                          <span className="text-gray-600">
                            {charityInfo.address || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Tax Code:</span>
                          <span className="text-gray-600">
                            {charityInfo.taxCode || "N/A"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-600">
                        Loading charity information...
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export { ProjectDetailPage };
