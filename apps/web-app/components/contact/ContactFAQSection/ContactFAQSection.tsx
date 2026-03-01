"use client";

import { Box, Title } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import FadeInSection from "../../shared/FadeInSection/FadeInSection";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";
import Text from "../../ui/Text/Text";

const FAQS = [
  {
    question: "How much does a project cost?",
    answer:
      "Projects start at $1,500. The final price depends on scope, web only, mobile only, or both. After a scoping call I'll give you a fixed price with no surprises.",
  },
  {
    question: "How long does it take to build?",
    answer:
      "Most projects are delivered in 4 to 8 weeks. The timeline is agreed upfront and locked in. Week 1 is discovery and design, weeks 2 to 4 are development, week 5 is testing, and week 6 is launch.",
  },
  {
    question: "What do I need to have ready before we start?",
    answer:
      "A clear idea of what you want to build, who it's for, and what problem it solves. You don't need designs, a technical spec, or any existing code.",
  },
  {
    question: "Do you work with non-technical founders?",
    answer:
      "Yes. Most clients aren't technical. I'll translate requirements into a clear build plan and keep communication jargon-free throughout.",
  },
  {
    question: "Will I own the code and the product?",
    answer:
      "Yes, fully. You get the source code, retain ownership of all production accounts and infrastructure, and can take it anywhere after handoff.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "Every project includes 2 weeks of post-launch support for fixes and small adjustments. Larger changes after that are scoped and priced separately.",
  },
  {
    question: "Do you use AI to build the product?",
    answer:
      "I use modern tooling, including AI-assisted development, to move faster. But I write, review, and take full responsibility for all code. You're not getting auto-generated output, you're getting a structured product built by a developer who owns the result.",
  },
  {
    question: "Can you only build an MVP, or full products too?",
    answer:
      "Both. Whether you need a focused MVP to validate quickly or a more complete product for launch, I'll scope it to match where you are.",
  },
  {
    question: "How does payment work?",
    answer: "50% upfront to begin work, 50% upon delivery. No surprises.",
  },
  {
    question: "How do I get started?",
    answer:
      "Fill out the contact form above with details about what you're building. I'll review it and respond within 1 to 2 business days. If it's a good fit, we'll book a scoping call to define the project.",
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const answerTransition = {
  type: "tween" as const,
  duration: 0.3,
  ease: "easeInOut" as const,
};

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <Box
      className="cursor-pointer rounded-xl border border-gray-800 bg-bg-surface transition-colors duration-200 hover:border-accent-primary/40"
      onClick={onToggle}
    >
      <Box className="flex items-center justify-between px-6 py-5">
        <Title
          order={3}
          className="pr-6 text-base font-semibold text-text-primary"
        >
          {question}
        </Title>
        <motion.div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-hover text-white"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={answerTransition}
        >
          <span className="text-lg font-light leading-none">+</span>
        </motion.div>
      </Box>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={answerTransition}
            className="overflow-hidden border-t border-gray-800"
          >
            <Box className="px-6 py-5">
              <Text className="text-text-secondary">{answer}</Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const ContactFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20">
      <Box className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <Box className="mb-12 text-center">
            <SectionTitle className="mb-6">
              Frequently Asked Questions
            </SectionTitle>
            <Box className="mx-auto h-1 w-20 rounded-full bg-accent-primary" />
          </Box>

          <Box className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </Box>
        </FadeInSection>
      </Box>
    </section>
  );
};

export default ContactFAQSection;
