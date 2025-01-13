import { toAbsoluteUrl } from "@/utils/assets";

const Footer = () => {
  return (
    <div className="w-full">
      <div
        className="relative mt-24 h-[4rem] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('${toAbsoluteUrl("/media/home/homeBG.png")}')`,
        }}
      >
        <div className="text-center">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Charitan. All rights reserved.
          </p>
        </div>
        {/* <img
          src={toAbsoluteUrl("/media/home/homeBG-deco.png")}
          alt="scroll-down"
          className="absolute bottom-0 right-0"
        /> */}
      </div>
    </div>
  );
};

export default Footer;
