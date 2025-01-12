import SlideInButton from "@/components/button/slide-in-button/SlideInButton";
import { toAbsoluteUrl } from "@/utils/assets";
import React from "react";

const LongBanner = () => {
  return (
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
          We seek out world changers and difference makers around the globe,and
          equip them to fulfill their unique purpose.
        </p>
        <div className="flex gap-10">
          <SlideInButton
            title="Donate Now"
            bgColor="bg-primary"
            link="/auth/login"
          />
          <SlideInButton
            title="Know about us"
            bgColor="bg-transparent"
            link="/about"
          />
        </div>
      </div>

      <img
        src={toAbsoluteUrl("/media/home/homeBG-deco.png")}
        alt="scroll-down"
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default LongBanner;
