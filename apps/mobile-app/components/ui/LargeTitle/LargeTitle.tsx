import React from "react";
import { cn } from "shared";

import Text from "../Text/Text";

export interface LargeTitleProps {
  title: string;
  className?: string;
}

const LargeTitle: React.FC<LargeTitleProps> = ({ title, className }) => {
  return (
    <Text className={cn("font-app-black text-3xl text-black", className)}>
      {title}
    </Text>
  );
};

export default LargeTitle;
