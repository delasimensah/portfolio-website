"use client";

import { ActionIcon, Box, Group, Modal } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { type CaseStudyScreenshot } from "@/utils";

import Text from "../../ui/Text/Text";

interface ScreenshotCarouselModalProps {
  title: string;
  screenshots: CaseStudyScreenshot[];
  opened: boolean;
  onClose: () => void;
  variant?: "mobile" | "web";
}

const ScreenshotCarouselModal: React.FC<ScreenshotCarouselModalProps> = ({
  title,
  screenshots,
  opened,
  onClose,
  variant = "mobile",
}) => {
  const isWeb = variant === "web";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (opened) setActiveIndex(0);
  }, [opened]);

  const handlePrev = () =>
    setActiveIndex((i) => (i - 1 + screenshots.length) % screenshots.length);

  const handleNext = () =>
    setActiveIndex((i) => (i + 1) % screenshots.length);

  const current = screenshots[activeIndex];

  if (!current) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size={isWeb ? "90%" : "lg"}
      centered
      styles={{
        header: { backgroundColor: "var(--color-bg-surface)" },
        body: { backgroundColor: "var(--color-bg-surface)", padding: "24px" },
        title: { color: "var(--color-text-primary)", fontWeight: 700, fontSize: "1.125rem" },
        close: { color: "var(--color-text-secondary)" },
        content: { maxHeight: "90vh", display: "flex", flexDirection: "column" },
      }}
    >
      <Box
        className={`flex items-center justify-center overflow-hidden rounded-xl bg-bg-primary ${isWeb ? "max-h-[65vh]" : "max-h-[60vh]"}`}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={1200}
          height={800}
          className={`w-full object-contain ${isWeb ? "max-h-[65vh]" : "max-h-[60vh]"}`}
          unoptimized
        />
      </Box>

      {screenshots.length > 1 && (
        <Box className="mt-6">
          <Group justify="center" align="center" gap={16}>
            <ActionIcon
              variant="subtle"
              onClick={handlePrev}
              aria-label="Previous screenshot"
              size="lg"
              className="text-text-secondary hover:text-text-primary"
            >
              <IconChevronLeft size={20} />
            </ActionIcon>

            <Group gap={8} align="center">
              {screenshots.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 cursor-pointer rounded-full transition-all ${
                    i === activeIndex
                      ? "w-6 bg-accent-primary"
                      : "w-2 bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </Group>

            <ActionIcon
              variant="subtle"
              onClick={handleNext}
              aria-label="Next screenshot"
              size="lg"
              className="text-text-secondary hover:text-text-primary"
            >
              <IconChevronRight size={20} />
            </ActionIcon>
          </Group>

          <Text className="mt-3 text-center text-sm text-text-secondary">
            {activeIndex + 1} / {screenshots.length}
          </Text>
        </Box>
      )}
    </Modal>
  );
};

export default ScreenshotCarouselModal;
