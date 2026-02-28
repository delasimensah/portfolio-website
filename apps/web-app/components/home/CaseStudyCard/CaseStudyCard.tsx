"use client";

import { Box } from "@mantine/core";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CaseStudyCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
}) => {
  const content = (
    <>
      <h3 className="mb-4 text-2xl font-bold text-text-primary">{title}</h3>
      <p className="mb-6 text-text-secondary">{description}</p>
      <Box className="overflow-hidden rounded-xl bg-bg-primary">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={640}
          height={360}
          className="h-auto w-full object-cover"
          unoptimized
        />
      </Box>
    </>
  );

  const wrapperClassName =
    "rounded-xl border border-gray-800 bg-bg-surface p-8 transition-colors duration-200 hover:border-accent-primary/50 block";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={wrapperClassName}
    >
      {href ? (
        <Link href={href} className="text-inherit no-underline">
          {content}
        </Link>
      ) : (
        content
      )}
    </motion.div>
  );
};

export default CaseStudyCard;
