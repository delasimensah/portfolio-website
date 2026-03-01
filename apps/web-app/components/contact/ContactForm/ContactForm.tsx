"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Group, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { COLORS } from "@/constants";

import Button from "../../ui/Button/Button";
import Text from "../../ui/Text/Text";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().optional(),
  whatBuilding: z
    .string()
    .min(10, "Please describe your product (at least 10 characters)"),
  whoFor: z.string().min(5, "Please describe your target audience"),
  problemSolving: z
    .string()
    .min(10, "Please describe the problem being solved"),
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
});

type ContactFormData = z.infer<typeof schema>;

const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP (3–4 weeks)" },
  { value: "flexible", label: "Flexible (4–6 weeks)" },
  { value: "still-planning", label: "Still Planning (6+ weeks)" },
  { value: "exploring", label: "Just Exploring" },
];

const BUDGET_OPTIONS = [
  { value: "1500-3000", label: "$1,500 – $3,000" },
  { value: "3000-4500", label: "$3,000 – $4,500" },
  { value: "4500-6000", label: "$4,500 – $6,000" },
  { value: "6000-plus", label: "$6,000+" },
  { value: "not-sure", label: "Not Sure Yet" },
];

const INPUT_CLASSNAMES = {
  input:
    "bg-bg-surface border-gray-700 text-text-primary placeholder:text-text-secondary focus:border-accent-primary rounded-xl px-6 py-4",
  label: "text-base font-medium text-text-primary mb-2",
  error: "text-red-400 text-sm mt-1",
};

const SELECT_CLASSNAMES = {
  ...INPUT_CLASSNAMES,
  dropdown: "border border-gray-700 shadow-xl",
  option: "rounded-md",
};

const SELECT_STYLES = {
  dropdown: {
    backgroundColor: COLORS.bgSurface,
    borderColor: "#374151",
  },
  option: {
    "--combobox-option-hover-bg": `${COLORS.accentPrimary}1a`,
    "--combobox-option-hover-color": COLORS.textPrimary,
  } as React.CSSProperties,
};

type SubmitStatus = "idle" | "success" | "error";

const ContactForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    setSubmitStatus("idle");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company ?? "N/A",
        whatBuilding: data.whatBuilding,
        whoFor: data.whoFor,
        problemSolving: data.problemSolving,
        timeline:
          TIMELINE_OPTIONS.find((o) => o.value === data.timeline)?.label ??
          data.timeline,
        budget:
          BUDGET_OPTIONS.find((o) => o.value === data.budget)?.label ??
          data.budget,
      }),
    });

    if (response.ok) {
      setSubmitStatus("success");
    } else {
      setSubmitStatus("error");
    }
  };

  return (
    <section className="py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <Stack gap={32}>
            <Group grow gap={32} align="flex-start">
              <TextInput
                label="Name"
                placeholder="Your full name"
                classNames={INPUT_CLASSNAMES}
                error={errors.name?.message}
                {...register("name")}
              />

              <TextInput
                label="Email"
                type="email"
                placeholder="your@email.com"
                classNames={INPUT_CLASSNAMES}
                error={errors.email?.message}
                {...register("email")}
              />
            </Group>

            <TextInput
              label="Company (optional)"
              placeholder="Your company name"
              classNames={INPUT_CLASSNAMES}
              error={errors.company?.message}
              {...register("company")}
            />

            <Textarea
              label="What are you building?"
              placeholder="Describe your product or application"
              rows={4}
              classNames={INPUT_CLASSNAMES}
              error={errors.whatBuilding?.message}
              {...register("whatBuilding")}
            />

            <Textarea
              label="Who is it for?"
              placeholder="Who is your target audience?"
              rows={3}
              classNames={INPUT_CLASSNAMES}
              error={errors.whoFor?.message}
              {...register("whoFor")}
            />

            <Textarea
              label="What problem does it solve?"
              placeholder="What specific problem are you solving?"
              rows={3}
              classNames={INPUT_CLASSNAMES}
              error={errors.problemSolving?.message}
              {...register("problemSolving")}
            />

            <Group grow gap={32} align="flex-start">
              <Controller
                name="timeline"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Desired launch timeline"
                    placeholder="Select a timeline"
                    data={TIMELINE_OPTIONS}
                    classNames={SELECT_CLASSNAMES}
                    styles={SELECT_STYLES}
                    error={errors.timeline?.message}
                    value={field.value ?? null}
                    onChange={(value) => field.onChange(value ?? "")}
                  />
                )}
              />

              <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Budget range"
                    placeholder="Select your budget range"
                    data={BUDGET_OPTIONS}
                    classNames={SELECT_CLASSNAMES}
                    styles={SELECT_STYLES}
                    error={errors.budget?.message}
                    value={field.value ?? null}
                    onChange={(value) => field.onChange(value ?? "")}
                  />
                )}
              />
            </Group>

            {submitStatus === "success" && (
              <Box className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-4">
                <IconCheck size={20} className="shrink-0 text-green-400" />
                <Text className="text-green-400">
                  Sent! I&apos;ll review your details and get back to you within 1–2 business days.
                </Text>
              </Box>
            )}

            {submitStatus === "error" && (
              <Box className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-4">
                <IconX size={20} className="shrink-0 text-red-400" />
                <Text className="text-red-400">
                  Something went wrong. Please try again or email me directly at mensadelasi@gmail.com.
                </Text>
              </Box>
            )}

            <Box className="pt-4 text-center">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || submitStatus === "success"}
              >
                {isSubmitting ? "Sending..." : "Request Project Review"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </section>
  );
};

export default ContactForm;
