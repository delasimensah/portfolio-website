"use client";

import { Box } from "@mantine/core";
import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/utils";

interface WhatYouGetCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  /** Gradient class for the icon box (e.g. bg-gradient-to-br from-accent-primary to-accent-hover). Icon will be white. */
  iconBoxGradient?: string;
}

const WhatYouGetCard: React.FC<WhatYouGetCardProps> = ({
  icon,
  title,
  description,
  iconBoxGradient,
}) => {
  const hasGradient = Boolean(iconBoxGradient);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-gray-800 bg-bg-surface p-8 transition-colors duration-200 hover:border-accent-primary/40"
    >
      <Box
        className={cn(
          "mb-6 flex h-12 w-12 items-center justify-center rounded-xl",
          hasGradient ? iconBoxGradient : "bg-accent-primary/20"
        )}
      >
        {icon}
      </Box>
      <h3 className="mb-3 text-xl font-semibold text-text-primary">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </motion.div>
  );
};

export default WhatYouGetCard;
