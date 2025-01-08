import React from "react";
import clsx from "clsx";

interface SlideInButtonProps {
  bgColor?: string;
  title?: string;
  onClick?: () => void;
  className?: string;
  link?: string;
}

const SlideInButton: React.FC<SlideInButtonProps> = ({
  bgColor = "bg-primary",
  title,
  onClick,
  className,
  link,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative h-[50px] w-40 overflow-hidden border border-primary bg-primary px-3 text-white shadow-lg transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-white before:transition-all before:duration-300 hover:text-primary hover:before:left-0 hover:before:w-full font-montserrat",
        bgColor,
        className
      )}
    >
      <a href={link} className="relative z-10">
        {title}
      </a>
    </button>
  );
};

export default SlideInButton;
