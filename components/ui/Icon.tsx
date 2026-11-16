import React from "react";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

export type IconName = keyof typeof Icons;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
  className?: string;
  size?: number;
}

export function Icon({ name, className = "", size = 20, ...props }: IconProps) {
  const LucideIcon = (Icons[name] as React.ComponentType<LucideProps>) || Icons.HelpCircle;

  return (
    <LucideIcon
      size={size}
      strokeWidth={1.5}
      className={`inline-block shrink-0 ${className}`}
      {...props}
    />
  );
}
