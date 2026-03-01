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
                className="text-text-primary mb-6 text-3xl font-bold lg:text-4xl"
              >
                {study.webSectionTitle}
              </Title>
              <Box className="bg-accent-primary h-1 w-20 rounded-full" />
            </Box>

            {screenshots.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setOpened(true)}
              >
                <Box className="flex items-center gap-2">
                  <IconPhoto size={16} />
                  View Screenshots
                </Box>
              </Button>
            )}
          </Box>

          <Box className="bg-bg-surface mb-8 rounded-xl border border-gray-800 p-8 lg:p-12">
            <Text className="text-text-secondary mb-6 text-center text-sm uppercase tracking-wider">
              {study.webSectionLabel}
            </Text>
            <Box className="bg-bg-primary overflow-hidden rounded-xl">
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
              <Text key={i} className="text-text-secondary text-lg">
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
