"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";

const stats = [
  { value: 12, suffix: "", label: "Years Experience", desc: "Improving homes with expert craftsmanship for years" },
  { value: 150, suffix: "", label: "Projects Completed", desc: "Over 100 successful projects delivered with quality and care" },
  { value: 15, suffix: "", label: "Skilled Craftsman", desc: "Designed with Care. Built by Experts." },
  { value: 99, suffix: "%", label: "Client Satisfaction", desc: "All of our clients are satisfied with our work and service" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2.0,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 1.0, ease: EASE },
  },
});

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Text column rises slower, stats column rises faster → depth illusion
  const textY = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const statsY = useTransform(scrollYProgress, [0, 1], [100, -60]);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Text column */}
        <motion.div style={{ y: textY }}>
          <motion.p
            className="text-sm uppercase tracking-widest text-accent mb-4 font-sans"
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            About Us
          </motion.p>

          <motion.h2
            className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-snug"
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            Built on Experience. Designed for Living.
          </motion.h2>

          <motion.p
            className="text-muted font-sans leading-relaxed mb-4"
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            Cassa Interior was founded on the belief that a home is more than a finished space,
            it is where life unfolds.
          </motion.p>

          <motion.p
            className="text-muted font-sans leading-relaxed"
            variants={fadeUp(0.3)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            With over 12 years of experience in interior design, we focus on creating interiors
            that feel personal, functional, and timeless. Every project is approached as a custom
            journey, shaped by how our clients live, work, and grow.
          </motion.p>
        </motion.div>

        {/* Stats grid */}
        <motion.div className="grid grid-cols-2 gap-8" style={{ y: statsY }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="bg-accent-light rounded-2xl p-8"
              variants={fadeUp(i * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="font-display text-4xl font-semibold text-accent mb-2">
                <CountUp target={s.value} suffix={s.suffix} />
              </p>
              <p className="font-sans font-semibold text-foreground text-sm mb-1">{s.label}</p>
              <p className="text-xs text-accent font-sans leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
