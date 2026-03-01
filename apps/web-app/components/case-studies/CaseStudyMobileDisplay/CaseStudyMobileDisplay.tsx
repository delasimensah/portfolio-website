"use client";

import { Box } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";

import { type CaseStudyScreenshot } from "@/utils";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import Button from "../../ui/Button/Button";
import Text from "../../ui/Text/Text";
import ScreenshotCarouselModal from "../ScreenshotCarouselModal/ScreenshotCarouselModal";

interface CaseStudyMobileDisplayProps {
  imageSrc: string;
  imageAlt: string;
  screenshots: CaseStudyScreenshot[];
}

const CaseStudyMobileDisplay: React.FC<CaseStudyMobileDisplayProps> = ({
  imageSrc,
  imageAlt,
  screenshots,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <section className="py-20">
      <Box className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="bg-bg-surface rounded-xl border border-gray-800 p-8 lg:p-12">
            <Box className="mb-6 flex items-center justify-between">
              <Text className="text-text-secondary text-sm uppercase tracking-wider">
                Mobile Experience
              </Text>

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

            <Box className="flex justify-center">
              <Box className="bg-bg-primary w-[55%] overflow-hidden rounded-xl">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={800}
                  height={600}
                  className="h-auto w-full object-contain"
                  unoptimized
                />
              </Box>
            </Box>
          </Box>
        </FadeInSection>
      </Box>

      <ScreenshotCarouselModal
        title="Mobile Screenshots"
        screenshots={screenshots}
        opened={opened}
        onClose={() => setOpened(false)}
      />
    </section>
  );
};

export default CaseStudyMobileDisplay;
