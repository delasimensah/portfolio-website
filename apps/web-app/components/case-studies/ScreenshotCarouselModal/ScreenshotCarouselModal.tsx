"use client";

import { ActionIcon, Box, Group, Modal } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import { Skeleton } from "@/components";
import { type CaseStudyScreenshot } from "@/utils";

import Text from "../../ui/Text/Text";

interface ScreenshotCarouselModalProps {
  title: string;
  screenshots: CaseStudyScreenshot[];
  opened: boolean;
  onClose: () => void;
  variant?: "mobile" | "web";
}

const IMAGE_CONTAINER_CLASS =
  "relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl bg-bg-primary";
const IMAGE_CONTAINER_CLASS_WEB = "max-h-[65vh]";
const IMAGE_CONTAINER_CLASS_MOBILE = "max-h-[60vh]";

const IMAGE_CLASS_BASE =
  "w-full object-contain transition-opacity duration-300";

const ScreenshotCarouselModal: React.FC<ScreenshotCarouselModalProps> = ({
  title,
  screenshots,
  opened,
  onClose,
  variant = "mobile",
}) => {
  const isWeb = variant === "web";
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (opened) {
      setActiveIndex(0);
      setImageLoaded(false);
    }
  }, [opened]);

  useEffect(() => {
    if (!opened || screenshots.length === 0) return;
    const prevIndex =
      (activeIndex - 1 + screenshots.length) % screenshots.length;
    const nextIndex = (activeIndex + 1) % screenshots.length;
    [prevIndex, nextIndex].forEach((i) => {
      if (i !== activeIndex) {
        const img = new window.Image();
        img.src = screenshots[i].src;
      }
    });
  }, [opened, activeIndex, screenshots]);

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
    setImageLoaded(false);
  }, [screenshots.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % screenshots.length);
    setImageLoaded(false);
  }, [screenshots.length]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleDotClick = useCallback(
    (i: number) => {
      if (i === activeIndex) return;
      setActiveIndex(i);
      setImageLoaded(false);
    },
    [activeIndex]
  );

  const current = screenshots[activeIndex];
  const showSkeleton = !imageLoaded;

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
        title: {
          color: "var(--color-text-primary)",
          fontWeight: 700,
          fontSize: "1.125rem",
        },
        close: { color: "var(--color-text-secondary)" },
        content: {
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        className={`${IMAGE_CONTAINER_CLASS} ${isWeb ? IMAGE_CONTAINER_CLASS_WEB : IMAGE_CONTAINER_CLASS_MOBILE}`}
      >
        {showSkeleton && (
          <Skeleton
            className={`absolute inset-0 z-0 rounded-xl ${isWeb ? "max-h-[65vh]" : "max-h-[60vh]"}`}
            radius="xl"
          />
        )}
        <Image
          key={activeIndex}
          src={current.src}
          alt={current.alt}
          width={1200}
          height={800}
          className={`${IMAGE_CLASS_BASE} ${isWeb ? "max-h-[65vh]" : "max-h-[60vh]"} relative z-10 ${!imageLoaded ? "opacity-0" : "opacity-100"}`}
          unoptimized
          onLoad={handleImageLoad}
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
              className="rounded-xl bg-gradient-to-br from-accent-primary to-accent-hover text-white opacity-90 hover:opacity-100"
            >
              <IconChevronLeft size={20} />
            </ActionIcon>

            <Group gap={8} align="center">
              {screenshots.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => handleDotClick(i)}
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
              className="rounded-xl bg-gradient-to-br from-accent-primary to-accent-hover text-white opacity-90 hover:opacity-100"
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
