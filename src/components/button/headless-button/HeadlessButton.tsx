import React from "react";
import { Button } from "@/components/ui/button";

const HeadlessButton = ({
  title,
  color = "blue",
  text = "white",
  buttonClassName,
  children,
  onClick,
}: {
  title?: string;
  color?: string;
  text?: string;
  buttonClassName?: string;
  children?: React.ReactNode;
  onClick?: any;
}) => {
  let colorClassName;
  if (color === "blue") {
    colorClassName = "bg-blue-500";
  } else if (color === "red") {
    colorClassName = "bg-red-500";
  } else if (color === "green") {
    colorClassName = "bg-green-500";
  }

  let textClassName;
  if (text === "white") {
    textClassName = "text-white";
  } else if (text === "black") {
    textClassName = "text-black";
  }
  return (
    <Button
      className={`min-w-20 min-h-10 ${colorClassName} ${textClassName} ${buttonClassName}`}
      onClick={() => onClick}
    >
      {children ? children : title}
    </Button>
  );
};

export default HeadlessButton;
