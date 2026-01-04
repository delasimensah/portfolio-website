import { cn } from "shared";
import { Box } from "@mantine/core";
import React from "react";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: "sm" | "md" | "xl" | number | string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  radius = "md",
  className,
}) => {
  const radiusMap: Record<string, string> = {
    sm: "rounded-sm",
    md: "rounded-md",
    xl: "rounded-full",
  };

  const radiusClass =
    typeof radius === "number"
      ? `rounded-[${radius}px]`
      : radiusMap[radius] || "";

  // For dynamic width/height, use inline styles (Tailwind doesn't support arbitrary values in all cases)
  const dynamicStyle: React.CSSProperties = {};
  if (width) {
    dynamicStyle.width = typeof width === "number" ? `${width}px` : width;
  }
  if (height) {
    dynamicStyle.height = typeof height === "number" ? `${height}px` : height;
  }

  return (
    <Box
      className={cn("animate-pulse bg-shimmerLight", radiusClass, className)}
      style={dynamicStyle}
    />
  );
};

export default Skeleton;
