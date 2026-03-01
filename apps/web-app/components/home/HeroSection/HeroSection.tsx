"use client";

import { Box } from "@mantine/core";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { Button } from "@/components";
import { ASSETS } from "@/constants";

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex min-h-[600px] items-center lg:min-h-[800px]">
      <Box className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Box className="space-y-8">
          <Box className="space-y-6">
            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0}
              variants={heroVariants}
              className="text-4xl font-bold leading-tight text-text-primary lg:text-6xl"
            >
              Web and Mobile Products Delivered in 4–8 Weeks
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="visible"
              custom={1}
              variants={heroVariants}
              className="max-w-lg text-xl text-text-secondary"
            >
              Clear scope. Transparent pricing. Structured delivery.
              <br />
              Projects start at $1,500.
            </motion.p>
          </Box>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={heroVariants}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/contact" size="md">
              Start Your Project
            </Button>
            <Button href="/case-studies" variant="secondary" size="md">
              View Case Studies
            </Button>
          </motion.div>
        </Box>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative flex justify-center"
        >
          <Box className="flex justify-center overflow-hidden rounded-xl bg-transparent">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center"
            >
              <Image
                src={ASSETS.images.heroAriaIos}
                alt="Aria app on iOS"
                width={368}
                height={797}
                className="w-full max-w-[368px] object-contain"
                priority
              />
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default HeroSection;
