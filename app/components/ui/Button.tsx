"use client";

import { useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"a">, "variants"> {
  variant?: "light" | "dark";
}

export default function Button({ children, variant = "light", className = "", ...props }: ButtonProps) {
  const [hovered, setHovered] = useState(false);
  const isLight = variant === "light";

  const springConfig = {
    type: "spring" as const,
    stiffness: 265,
    damping: 45,
    mass: 3,
    restDelta: 0.0005,
    restSpeed: 0.0005,
  };

  const springConfigReturn = {
    type: "spring" as const,
    stiffness: 235,
    damping: 45,
    mass: 3,
    restDelta: 0.0005,
    restSpeed: 0.0005,
  };

  return (
    <motion.a
      {...props}
      animate={hovered ? "hover" : "idle"}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ transform: "translateZ(0)" }}
      className={`relative overflow-hidden inline-flex items-center gap-6 border rounded-full pl-6 pr-2 py-2 cursor-pointer select-none ${
        isLight ? "border-white" : "border-foreground"
      } ${className}`}
    >
      {/* Text */}
      <motion.span
        className="relative z-10 text-sm font-sans whitespace-nowrap"
        variants={{
          idle: {
            color: isLight ? "#ffffff" : "#1C1917",
            transition: { duration: 0.5, ease: "easeOut" },
          },
          hover: {
            color: isLight ? "#1E1510" : "#FAFAF8",
            transition: { delay: 0.25, duration: 0.3, ease: "easeOut" },
          },
        }}
      >
        {children}
      </motion.span>

      {/* Circle + Arrow wrapper — takes layout space */}
      <span className="relative w-10 h-10 flex-shrink-0">
        {/* Expanding circle */}
        <motion.span
          className={`absolute inset-0 rounded-full ${isLight ? "bg-white" : "bg-foreground"}`}
          style={{ willChange: "transform", backfaceVisibility: "hidden" }}
          variants={{
            idle: { scale: 1, transition: springConfigReturn },
            hover: { scale: 8.6, transition: springConfig },
          }}
        />

        {/* Arrow — rotates, stays same size */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center z-10"
          variants={{
            idle: {
              rotate: -45,
              transition: springConfigReturn,
            },
            hover: {
              rotate: 0,
              transition: springConfig,
            },
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
              stroke={isLight ? "#1E1510" : "#FAFAF8"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </span>
    </motion.a>
  );
}
