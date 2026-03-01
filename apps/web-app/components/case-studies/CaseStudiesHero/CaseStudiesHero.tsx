"use client";

import { Box, Title } from "@mantine/core";
import { motion } from "framer-motion";
import React from "react";

import Text from "../../ui/Text/Text";

const MotionBox = motion.div;

const CaseStudiesHero: React.FC = () => {
  return (
    <section className="flex h-[400px] items-center lg:h-[500px]">
      <Box className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Box className="mx-auto max-w-4xl text-center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Title
              order={1}
              className="text-4xl font-bold text-text-primary lg:text-6xl"
            >
              My Work
            </Title>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Text className="text-xl text-text-secondary">
              Selected projects.
            </Text>
          </MotionBox>
        </Box>
      </Box>
    </section>
  );
};

export default CaseStudiesHero;
