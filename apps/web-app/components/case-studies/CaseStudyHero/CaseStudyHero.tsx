"use client";

import { Box, Title } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import Text from "../../ui/Text/Text";

const MotionBox = motion.div;

interface CaseStudyHeroProps {
  title: string;
  tagline: string;
  websiteUrl?: string;
}

const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({ title, tagline, websiteUrl }) => {
  return (
    <section className="flex h-[500px] items-center lg:h-[600px]">
      <Box className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Box className="mx-auto max-w-4xl text-center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-block rounded-full border border-accent-primary/30 bg-accent-primary/10 px-6 py-2"
          >
            <Text component="span" className="font-medium text-accent-primary">
              Project
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6"
          >
            <Title order={1} className="text-4xl font-bold text-text-primary lg:text-6xl">
              {title}
            </Title>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Text className="text-xl text-text-secondary">{tagline}</Text>
          </MotionBox>

          {websiteUrl && (
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 flex justify-center"
            >
              <Link
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-accent-primary/30 bg-gradient-to-br from-accent-primary/10 to-accent-hover/5 px-6 py-3 text-sm font-medium text-accent-primary transition-all duration-200 hover:from-accent-primary/20 hover:to-accent-hover/10"
              >
                Visit Website
                <Box className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-hover">
                  <IconExternalLink size={14} className="text-white" />
                </Box>
              </Link>
            </MotionBox>
          )}
        </Box>
      </Box>
    </section>
  );
};

export default CaseStudyHero;
