"use client";

import { Box, Title } from "@mantine/core";
import { motion } from "framer-motion";
import React from "react";

import Text from "../../ui/Text/Text";

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const ContactHeroSection: React.FC = () => {
  return (
    <section className="relative flex min-h-[500px] items-center">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0}
          variants={heroVariants}
          className="mb-6 inline-block rounded-xl border border-accent-primary/30 bg-accent-primary/10 px-6 py-2"
        >
          <Text component="span" className="font-medium text-accent-primary">
            Build Your Product
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
            className="mb-8 text-4xl font-bold leading-tight text-text-primary lg:text-6xl"
          >
            Let&apos;s Build Together.
          </Title>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={heroVariants}
        >
          <Text className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-text-secondary">
            Planning a web or mobile product? Share the details below and I&apos;ll review them within 1–2 business days.
          </Text>
          <Text className="text-2xl font-semibold text-accent-primary">
            Projects start at $1,500 and are delivered in 4–8 weeks.
          </Text>
        </motion.div>
      </Box>
    </section>
  );
};

export default ContactHeroSection;
