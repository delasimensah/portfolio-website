"use client";

import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className }) => {
  return (
    <h2
      className={`text-center text-3xl font-bold text-text-primary lg:text-4xl ${className ?? ""}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
