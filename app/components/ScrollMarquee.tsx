"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const STRIP =
  "CASSA INTERIOR\u00a0\u00a0•\u00a0\u00a0BESPOKE DESIGN\u00a0\u00a0•\u00a0\u00a0JEPARA CRAFTSMANSHIP\u00a0\u00a0•\u00a0\u00a0RESIDENTIAL SPACES\u00a0\u00a0•\u00a0\u00a0CUSTOM FURNITURE\u00a0\u00a0•\u00a0\u00a0";

export default function ScrollMarquee() {
  const { scrollYProgress } = useScroll();
  // Slide left as you scroll down the page
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <div className="overflow-hidden bg-hero-bg py-7 border-y border-white/[0.06]">
      <motion.p
        style={{ x }}
        className="whitespace-nowrap font-display text-[2.5rem] md:text-[4rem] font-semibold text-white/[0.055] leading-none select-none"
      >
        {STRIP.repeat(5)}
      </motion.p>
    </div>
  );
}
