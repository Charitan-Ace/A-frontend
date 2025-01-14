import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toAbsoluteUrl } from "@/utils/assets.ts";
import { Button } from "@/components/ui/button.tsx";
import useAuth from "@/hooks/use-auth";
import { LogOut } from "lucide-react";

const UserIndicator = () => {
  const { logout, auth } = useAuth();

  return (
    <div className="flex shrink-0 gap-2 items-center justify-center">
      {auth?.email && (
        <>
          <div className="flex items-center gap-2 rounded-full py-2 px-3 shadow-md bg-black/50">
            <Avatar>
              <AvatarImage
                src={toAbsoluteUrl("/media/test/logo-test.jpg")}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-white">{auth?.email?.split("@")[0]}</p>

            <Button className="bg-transparent rounded-full p-2" onClick={logout}>
              <LogOut />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export { UserIndicator };
