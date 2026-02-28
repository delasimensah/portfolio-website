"use client";

import { Box } from "@mantine/core";
import { motion } from "framer-motion";
import React from "react";

interface WhatYouGetCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhatYouGetCard: React.FC<WhatYouGetCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-gray-800 bg-bg-surface p-8 transition-colors duration-200 hover:border-accent-primary/50"
    >
      <Box className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/20">
        {icon}
      </Box>
      <h3 className="mb-3 text-xl font-semibold text-text-primary">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </motion.div>
  );
};

export default WhatYouGetCard;
