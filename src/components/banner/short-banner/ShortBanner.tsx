import React from "react";
import { toAbsoluteUrl } from "@/utils/assets";

const ShortBanner = ({ title }: { title: string }) => {
  return (
    <div className="w-full">
      <div
        className="relative h-[18rem] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('${toAbsoluteUrl("/media/home/homeBG.png")}')`,
        }}
      >
        <div className="flex flex-col justify-center items-center w-full h-full text-center gap-5 mt-5">
          <h1 className="text-3xl font-semibold text-primary-foreground tracking-wide w-1/2">
            {title}
          </h1>
        </div>

        <img
          src={toAbsoluteUrl("/media/home/homeBG-deco.png")}
          alt="scroll-down"
          className="absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
};

export default ShortBanner;
