"use client";

import { motion } from "framer-motion";
import React from "react";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const StaggerItem: React.FC<StaggerItemProps> = ({ children, className }) => {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

export default StaggerItem;
