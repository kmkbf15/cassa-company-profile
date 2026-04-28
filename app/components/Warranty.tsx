"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1.0, delay, ease: EASE },
});

const points = [
  {
    title: "Lifetime Hardware Coverage",
    desc: "All hinges, drawer rails, and mechanical hardware are covered for life.",
  },
  {
    title: "Post-Handover Support",
    desc: "Our team is available after the project is done — no abandoned clients.",
  },
  {
    title: "Jepara Craftsmanship Guarantee",
    desc: "Every piece of furniture is built by skilled Jepara artisans to last decades.",
  },
];

export default function Warranty() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Left column rises slower → creates depth against the right column
  const leftY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const rightY = useTransform(scrollYProgress, [0, 1], [120, -80]);

  return (
    <section ref={sectionRef} className="py-24 bg-hero-bg overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <motion.div style={{ y: leftY }}>
          <motion.p
            className="text-sm uppercase tracking-widest text-accent mb-4 font-sans"
            {...fadeUp(0)}
          >
            Our Promise
          </motion.p>
          <motion.h2
            className="font-display text-4xl md:text-5xl font-semibold text-white mb-6 leading-snug"
            {...fadeUp(0.08)}
          >
            Lifetime Warranty & Aftercare
          </motion.h2>
          <motion.p
            className="text-white/60 font-sans leading-relaxed"
            {...fadeUp(0.16)}
          >
            Every project we complete carries a promise that extends well beyond handover day. We
            build things that last — and we stand behind them.
          </motion.p>
        </motion.div>

        {/* Right */}
        <motion.div className="flex flex-col gap-8 md:pt-2" style={{ y: rightY }}>
          {points.map((p, i) => (
            <div key={p.title} className="flex items-start gap-5">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.12 + 0.1, ease: EASE }}
                className="shrink-0 w-7 h-7 rounded-full border border-accent flex items-center justify-center text-accent text-xs mt-0.5"
              >
                ✓
              </motion.span>
              <motion.div {...fadeUp(i * 0.12)}>
                <h3 className="font-display text-lg font-semibold text-white mb-1">{p.title}</h3>
                <p className="text-sm text-white/60 font-sans leading-relaxed">{p.desc}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
