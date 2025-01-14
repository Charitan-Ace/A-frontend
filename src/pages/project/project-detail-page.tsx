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

const ProjectDetailPage = () => {
  const projectId = useParams<{ id: string }>().id;
  const [searchParams] = useSearchParams();
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

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
        toast.success("Subscription canceled successfully.")
      } else {
        toast.error("Failed to cancel subscription. Please try again.");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error("An error occurred while canceling your subscription.");
    }
  };

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
                    {(auth?.roleId !== "CHARITY" || !auth) && <DonateForm />}
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
                    <div className="text-sm">Donate</div>
                    <Progress
                      value={project.currentDonation}
                      className="h-2 bg-gray-100"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        Raised: $
                        {project.currentDonation?.toLocaleString("en-US")}
                      </span>
                      <span>
                        Goal: ${project.goal?.toLocaleString("en-US")}
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-8">
                    <section>
                      <h2 className="text-2xl font-bold mb-4">
                        Donate For Poor Peoples Treatment And Medicine.
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Flyingfish Kafue Pike Cow Shark California Smoothtongue
                        Golden Loach Temperate Ocean-Bass Gulper Sailbearer
                        Kafue Porcupinefish Kafue Pike Opah Sunfish Gudgeon Boga
                        Asiatic Glassfish Tadpole Fish Alewife, Poacher
                        Airbreathing Catfish, Zebra Tilapia Northern Pearleye
                        Naked-Back Knifefish Pupfish Dojo Loach. "Snake Mackerel
                        Bonyfish Chub Arowana Honefish Weever Shark."
                      </p>
                      <p className="text-gray-600 mb-4">
                        Asian Carps Sailback Scorpionfish Dragon Goby Lemon Sole
                        Triplefin Blenny Hog Sucker. Smelt Sleeper Shovelnose
                        Sturgeon Merluccid Hake Cow Shark Herring Smelt
                        Trout-Perch Barbeled Houndshark.
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-bold mb-4">Challenge</h2>
                      <p className="text-gray-600">
                        Best Quality Only Happens When You Care Enough To Do
                        Your Best. Steer Companies Away From Risky Denounce With
                        Righteous Indignation Who Are So Beguiled And
                        Demoralized By Pleasure Of The.
                      </p>
                    </section>

                    {/* Bottom Image */}
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src="/placeholder.jpg"
                        alt="Challenge section image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Categories */}
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Category</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Education</span>
                        <span className="text-gray-500">(3)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Food</span>
                        <span className="text-gray-500">(2)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Medical</span>
                        <span className="text-gray-500">(4)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Home</span>
                        <span className="text-gray-500">(5)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Water</span>
                        <span className="text-gray-500">(4)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Summary Documents */}
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Summary Documents
                    </h2>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Documents.pdf
                    </Button>
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
