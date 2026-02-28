import { Text as MantineText, type TextProps } from "@mantine/core";
import React from "react";
import { cn } from "shared";

interface TextComponentProps extends TextProps {
  className?: string;
  children?: React.ReactNode;
  component?: React.ElementType;
  htmlFor?: string;
}

const Text = ({ className, children, ...props }: TextComponentProps) => {
  return (
    <MantineText
      className={cn("font-appFont text-base text-darkGrey", className)}
      {...(props as TextProps)}
    >
      {children}
    </MantineText>
  );
};

export default Text;
