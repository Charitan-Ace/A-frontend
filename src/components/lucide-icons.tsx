import { icons, LucideProps } from "lucide-react";

export interface IconProps extends LucideProps {
  name: keyof typeof icons;
}

const LucideIcon = ({ name, ...props }: Readonly<IconProps>) => {
  const CustomIcon = icons[name];

  return <CustomIcon {...props} />;
};

export { LucideIcon };
