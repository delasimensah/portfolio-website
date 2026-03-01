"use client";

import { Box, Group, Title } from "@mantine/core";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { type CaseStudy } from "@/utils";

import Button from "../../ui/Button/Button";
import Text from "../../ui/Text/Text";

const MotionBox = motion.div;

interface CaseStudyListCardProps {
  study: CaseStudy;
}

const CaseStudyListCard: React.FC<CaseStudyListCardProps> = ({ study }) => {
  return (
    <MotionBox
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-xl border border-gray-800 bg-bg-surface transition-colors duration-300 hover:border-accent-primary/30"
    >
      <Box className="p-8 lg:p-12">
        <Box className="mb-6">
          <Title
            order={2}
            className="mb-2 text-3xl font-bold text-text-primary"
          >
            {study.title}
          </Title>
          <Text className="text-text-secondary">{study.tagline}</Text>
        </Box>

        <Box className="mb-8 overflow-hidden rounded-xl bg-bg-primary">
          <Image
            src={study.webImageSrc}
            alt={study.webImageAlt}
            width={640}
            height={360}
            className="h-auto w-full object-cover"
            unoptimized
          />
        </Box>

        <Box className="mb-8 grid grid-cols-2 gap-4">
          <Box className="rounded-xl bg-bg-primary p-4">
            <Text className="mb-1 text-sm text-text-secondary">Timeline</Text>
            <Text className="text-xl font-bold text-text-primary">
              {study.timeline}
            </Text>
          </Box>
          <Box className="rounded-xl bg-bg-primary p-4">
            <Text className="mb-1 text-sm text-text-secondary">
              Project Value
            </Text>
            <Text className="text-xl font-bold text-accent-primary">
              {study.value}
            </Text>
          </Box>
        </Box>

        <Box className="mb-8 space-y-3">
          {study.techList.map((item) => (
            <Group key={item} gap={12}>
              <Box className="h-2 w-2 shrink-0 rounded-full bg-accent-primary" />
              <Text component="span" className="text-text-secondary">
                {item}
              </Text>
            </Group>
          ))}
        </Box>

        <Link href={`/case-studies/${study.id}`} className="block">
          <Button size="md" className="w-full justify-center">
            View Project
          </Button>
        </Link>
      </Box>
    </MotionBox>
  );
};

export default CaseStudyListCard;
