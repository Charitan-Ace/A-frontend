import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toAbsoluteUrl } from "@/utils/assets.ts";
import { Button } from "@/components/ui/button.tsx";
import { LucideIcon } from "@/components/lucide-icons.tsx";

const UserIndicator = () => {
  return (
    <div className="flex shrink-0 gap-2 items-center">
      <LucideIcon name="Search" />
      <Button>Contact Us</Button>
      <div className="flex items-center gap-2 rounded-full py-2 px-3 shadow-md bg-black/50">
        <Avatar>
          <AvatarImage
            src={toAbsoluteUrl("/media/test/logo-test.jpg")}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-primary-foreground">TrungNgoNe</p>
      </div>
    </div>
  );
};

export { UserIndicator };
