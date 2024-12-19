import { toAbsoluteUrl } from "@/utils/assets";

const HomePage = () => {
  return (
    <div className="w-screen">
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
            We Seek out world changers and difference makers around the
            globe,and equip them to fulfill their unique purpose.
          </p>
          <div className="flex gap-10">
            <button className="relative h-[50px] w-40 overflow-hidden border border-primary bg-primary px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-300 hover:text-primary hover:before:left-0 hover:before:w-full font-montserrat">
              <span className="relative z-10">Donate Now</span>
            </button>
            <button className="relative h-[50px] w-40 overflow-hidden border border-primary bg-transparent px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-300 hover:text-primary hover:before:left-0 hover:before:w-full font-montserrat">
              <span className="relative z-10">Know about us</span>
            </button>{" "}
          </div>
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

export { HomePage };
