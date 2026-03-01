"use client";

import { Box, Title } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";

import { type CaseStudy, type CaseStudyScreenshot } from "@/utils";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Button from "../../ui/Button/Button";
import Text from "../../ui/Text/Text";
import ScreenshotCarouselModal from "../ScreenshotCarouselModal/ScreenshotCarouselModal";

interface CaseStudyWebExperienceProps {
  study: Pick<
    CaseStudy,
    | "webSectionTitle"
    | "webSectionLabel"
    | "webSectionText"
    | "webImageSrc"
    | "webImageAlt"
  >;
  screenshots: CaseStudyScreenshot[];
}

const CaseStudyWebExperience: React.FC<CaseStudyWebExperienceProps> = ({
  study,
  screenshots,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <section className="bg-bg-surface/50 py-20">
      <Box className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12 flex items-center justify-between">
            <Box>
              <Title
                order={2}
                className="mb-6 text-3xl font-bold text-text-primary lg:text-4xl"
              >
                {study.webSectionTitle}
              </Title>
              <Box className="h-1 w-20 rounded-full bg-accent-primary" />
            </Box>

            {screenshots.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setOpened(true)}
              >
                <Box className="flex items-center gap-2">
                  <Box className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-hover">
                    <IconPhoto size={14} className="text-white" />
                  </Box>
                  View Screenshots
                </Box>
              </Button>
            )}
          </Box>

          <Box className="mb-8 rounded-xl border border-gray-800 bg-bg-surface p-8 lg:p-12">
            <Text className="mb-6 text-center text-sm uppercase tracking-wider text-text-secondary">
              {study.webSectionLabel}
            </Text>
            <Box className="overflow-hidden rounded-xl bg-bg-primary">
              <Image
                src={study.webImageSrc}
                alt={study.webImageAlt}
                width={1200}
                height={700}
                className="h-auto w-full object-cover"
                unoptimized
              />
            </Box>
          </Box>

          <Box className="space-y-4">
            {study.webSectionText.map((paragraph, i) => (
              <Text key={i} className="text-lg text-text-secondary">
                {paragraph}
              </Text>
            ))}
          </Box>
        </FadeInSection>
      </Box>

      <ScreenshotCarouselModal
        title="Web Screenshots"
        screenshots={screenshots}
        opened={opened}
        onClose={() => setOpened(false)}
        variant="web"
      />
    </section>
  );
};

export default CaseStudyWebExperience;
