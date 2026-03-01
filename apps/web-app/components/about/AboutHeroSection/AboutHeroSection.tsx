"use client";

import { Box, Title } from "@mantine/core";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { ASSETS } from "@/constants";

import Text from "../../ui/Text/Text";

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative flex min-h-[600px] items-center lg:min-h-[700px]">
      <Box className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Box className="space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={heroVariants}
            className="inline-block rounded-xl border border-accent-primary/30 bg-accent-primary/10 px-6 py-2"
          >
            <Text component="span" className="font-medium text-accent-primary">
              About
            </Text>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={heroVariants}
          >
            <Title
              order={1}
              className="text-4xl font-bold leading-tight text-text-primary lg:text-5xl"
            >
              I build structured web and mobile products for founders and
              businesses that value{" "}
              <span className="bg-gradient-to-r from-accent-primary to-accent-hover bg-clip-text text-transparent">
                clarity, predictable execution, and a product that&apos;s ready
                to ship.
              </span>
            </Title>
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center"
        >
          <Box className="rounded-full border-[6px] border-white">
            <Box className="overflow-hidden rounded-full">
              <Image
                src={ASSETS.images.profile}
                alt="Delasi Mensah"
                width={340}
                height={340}
                className="h-[340px] w-[340px] object-cover object-top"
                priority
                unoptimized
              />
            </Box>
          </Box>
        </motion.div>
      </Box>
    </section>
  );
};

export default AboutHeroSection;
