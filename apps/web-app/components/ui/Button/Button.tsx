"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/utils";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  href?: string;
  disabled?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-accent-primary to-accent-hover text-white shadow-sm hover:opacity-95 hover:shadow-md transition-all duration-200",
  secondary:
    "border border-gray-600 bg-gradient-to-br from-bg-surface to-gray-800/80 text-text-primary hover:border-accent-primary hover:from-accent-primary/10 hover:to-accent-hover/5 hover:text-accent-primary transition-all duration-200",
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 rounded-lg text-sm",
  md: "px-8 py-4 rounded-xl font-semibold",
  lg: "px-12 py-6 rounded-xl text-xl font-semibold",
};

const MotionButton = motion.button;
const MotionLink = motion.a;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  href,
  disabled,
}) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center font-semibold",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <MotionLink
        href={href}
        className={baseClasses}
        {...motionProps}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <MotionButton
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </MotionButton>
  );
};

export default Button;
