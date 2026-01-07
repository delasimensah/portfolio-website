import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { cn } from "shared";

interface TextProps extends RNTextProps {
  className?: string;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <RNText
      className={cn("font-app-regular text-base text-white", className)}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
