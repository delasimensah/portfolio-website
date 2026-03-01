"use client";

import { Box, Title } from "@mantine/core";
import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/utils";

const MotionBox = motion.div;

interface AppTypeCardProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
  /** Gradient class for the icon box; icon should be white when set. */
  iconBoxGradient?: string;
}

const AppTypeCard: React.FC<AppTypeCardProps> = ({ icon, title, className, iconBoxGradient }) => {
  return (
    <MotionBox
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-xl border border-gray-800 bg-bg-surface p-6 transition-colors duration-200 hover:border-accent-primary/50",
        className
      )}
    >
      <Box
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl",
          iconBoxGradient ?? "bg-accent-primary/20"
        )}
      >
        {icon}
      </Box>
      <Title order={3} className="text-lg font-semibold text-text-primary">
        {title}
      </Title>
    </MotionBox>
  );
};

export default AppTypeCard;
