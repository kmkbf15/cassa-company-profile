"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./ui/Button";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1.0, delay, ease: EASE },
});

const contactItems = [
  {
    label: "Email",
    value: "contact@cassa.com",
    href: "mailto:contact@cassa.com",
  },
  {
    label: "WhatsApp",
    value: "+62 812-1286-666",
    href: "https://wa.me/628121286666",
  },
  {
    label: "Location",
    value: "Gading Serpong, Tangerang",
    href: undefined,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [100, -60]);

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-hero-bg">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Top area */}
        <motion.p
          className="text-sm uppercase tracking-widest text-accent mb-6 font-sans"
          {...fadeUp(0)}
        >
          Contact
        </motion.p>

        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-5xl md:text-6xl font-semibold text-white leading-tight mb-6"
            style={{ y: headingY }}
            {...fadeUp(0)}
          >
            Let&apos;s build something beautiful together.
          </motion.h2>
        </div>

        <motion.p
          className="text-white/50 font-sans mb-10 max-w-sm mx-auto"
          {...fadeUp(0.15)}
        >
          Start with a free consultation. No commitment.
        </motion.p>

        <motion.div className="flex justify-center" {...fadeUp(0.25)}>
          <Button href="https://wa.me/628121286666" variant="light" target="_blank" rel="noopener noreferrer">
            Free Consult Now
          </Button>
        </motion.div>

        {/* Divider */}
        <div className="overflow-hidden my-16">
          <motion.div
            className="h-px bg-white/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.0, delay: 0.4, ease: EASE }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Contact items */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
          {contactItems.map((item, i) => (
            <motion.div key={item.label} className="text-center" {...fadeUp(0.5 + i * 0.1)}>
              <p className="text-xs uppercase tracking-widest text-accent font-sans mb-1">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-white/80 font-sans hover:text-white transition-colors text-sm"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-white/80 font-sans text-sm">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className="max-w-4xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg font-semibold text-white tracking-[0.08em]">Cassa</p>
        <p className="text-sm text-white/30 font-sans">
          © {new Date().getFullYear()} Cassa Interior. All rights reserved.
        </p>
      </div>
    </section>
  );
}
