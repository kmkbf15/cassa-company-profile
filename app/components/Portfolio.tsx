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

const featured = {
  title: "Residential Interior Design",
  tag: "Full Service",
  timeline: "4 weeks",
  description:
    "Full interior design and execution for residential spaces — from mood board to move-in ready.",
};

const projects = [
  {
    id: "01",
    type: "Residential Interior Design",
    timeline: "4 weeks",
    description:
      "Full interior design and execution for residential spaces — from mood board to move-in ready.",
  },
  {
    id: "02",
    type: "Custom Furniture & Built-Ins",
    timeline: "6 weeks",
    description:
      "Bespoke furniture crafted by Jepara artisans, built to fit your space and stand the test of time.",
  },
  {
    id: "03",
    type: "Design & Build",
    timeline: "4 weeks",
    description:
      "End-to-end service from initial concept through construction, finishing, and handover.",
  },
];

export default function Portfolio() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const { scrollYProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!galleryRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - galleryRef.current.getBoundingClientRect().left;
    startScrollLeft.current = galleryRef.current.scrollLeft;
    galleryRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !galleryRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.getBoundingClientRect().left;
    galleryRef.current.scrollLeft = startScrollLeft.current - (x - startX.current) * 1.5;
  };

  const onPointerUp = () => { isDragging.current = false; };

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div className="mb-14" {...fadeUp(0)}>
          <p className="text-sm uppercase tracking-widest text-accent mb-4 font-sans">Our Work</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-snug">
            Projects we are proud of.
          </h2>
        </motion.div>

        {/* Featured project */}
        <motion.div
          ref={featuredRef}
          className="relative h-[500px] rounded-2xl overflow-hidden mb-8"
          {...fadeUp(0.05)}
        >
          {/* Parallax image layer */}
          <motion.div className="absolute inset-[-15%]" style={{ y: imageY }}>
            <div className="w-full h-full bg-accent-light flex items-center justify-center text-accent/30 text-sm font-sans">
              Photo coming soon
            </div>
          </motion.div>

          {/* Gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-hero-bg/85 via-hero-bg/10 to-transparent" />

          {/* Overlay text */}
          <motion.div className="absolute bottom-8 left-8 right-8" {...fadeUp(0.15)}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-widest text-accent font-sans border border-accent/50 px-3 py-1 rounded-full">
                {featured.tag}
              </span>
              <span className="text-xs text-white/40 font-sans">{featured.timeline}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2">
              {featured.title}
            </h3>
            <p className="text-sm text-white/60 font-sans max-w-lg leading-relaxed">
              {featured.description}
            </p>
          </motion.div>
        </motion.div>

        {/* Horizontal scroll gallery */}
        <div
          ref={galleryRef}
          className="overflow-x-auto cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div className="flex gap-5 pb-2" style={{ width: "max-content" }}>
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                className="w-72 shrink-0 flex flex-col gap-4"
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.0, delay: i * 0.1, ease: EASE }}
                whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: EASE } }}
              >
                <div className="aspect-[3/4] bg-accent-light rounded-2xl flex items-center justify-center text-accent/30 text-sm font-sans relative overflow-hidden">
                  <span className="absolute top-4 left-4 font-display text-6xl font-semibold text-accent/15 leading-none">
                    {p.id}
                  </span>
                  Photo coming soon
                </div>
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
                      {p.type}
                    </h3>
                    <span className="shrink-0 text-xs text-accent font-sans border border-accent/60 rounded-full px-3 py-1 mt-0.5">
                      {p.timeline}
                    </span>
                  </div>
                  <p className="text-sm text-muted font-sans leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
