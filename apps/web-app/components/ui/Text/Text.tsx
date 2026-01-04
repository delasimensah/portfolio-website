import {
  Text as MantineText,
  TextProps as MantineTextProps,
} from "@mantine/core";
import React from "react";
import { cn } from "shared";

interface TextProps extends MantineTextProps {
  className?: string;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <MantineText
      className={cn("font-appFont text-base text-white", className)}
      {...props}
    >
      {children}
    </MantineText>
  );
};

export default Text;
