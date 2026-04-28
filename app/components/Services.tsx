"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";

const services = [
  {
    id: "01",
    name: "Bedroom",
    description:
      "A personal retreat designed for rest and balance. We create bedrooms that feel calm, functional, and intimate. Carefully considering layout, storage, lighting, and material choices to support comfort and everyday living.",
  },
  {
    id: "02",
    name: "Bathroom",
    description:
      "Thoughtfully designed bathrooms that balance practicality and comfort. From layout planning to material selection, we focus on durability, ease of maintenance, and a clean aesthetic that elevates daily routines.",
  },
  {
    id: "03",
    name: "Kitchen",
    description:
      "The heart of the home, designed to work beautifully. We design and build custom kitchens tailored to your habits and needs. Combining smart storage, durable materials, and precise craftsmanship to support everyday use and family moments.",
  },
  {
    id: "04",
    name: "Living Room",
    description:
      "A space where life happens. We design living rooms that bring people together. Balancing openness, comfort, and functionality while reflecting your lifestyle and how you use the space day to day.",
  },
  {
    id: "05",
    name: "Entrance",
    description:
      "The first impression of your home, designed to feel welcoming and refined. We create entrance areas that balance aesthetics and function.",
  },
  {
    id: "06",
    name: "External Works",
    description:
      "Designed to connect interior and exterior seamlessly. From built-in elements to supporting structures, our external works focus on durability, harmony, and extending the comfort of your home beyond its walls.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const TOTAL = services.length.toString().padStart(2, "0");

export default function Services() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-hero-bg">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 44 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <p className="text-sm uppercase tracking-widest text-accent mb-4 font-sans">Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-snug mb-4">
            We believe good design is felt, not just seen.
          </h2>
          <p className="text-white/50 font-sans text-sm leading-relaxed max-w-xl">
            At Cassa, we design spaces that adapt to our clients. Spaces that support daily routines,
            family moments, and the stories yet to come.
          </p>
        </motion.div>

        {/* Room selector tabs */}
        <motion.div
          className="flex gap-8 border-b border-white/10 overflow-x-auto scrollbar-none mb-0"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="relative pb-4 shrink-0 cursor-pointer"
            >
              <span
                className={`font-display text-base font-semibold transition-colors duration-300 ${
                  active === i ? "text-white" : "text-white/35 hover:text-white/60"
                }`}
              >
                {s.name}
              </span>
              {active === i && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Large image panel */}
        <motion.div
          className="relative h-[420px] md:h-[580px] rounded-b-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
        >
          {/* Parallax image layer */}
          <motion.div className="absolute inset-[-12%]" style={{ y: imageY }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${active}`}
                className="absolute inset-0 bg-white/[0.04] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {/* Replace with <Image fill className="object-cover"> when photos are ready */}
                <span className="text-white/10 text-sm font-sans">
                  {services[active].name} — photo
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Gradient scrim — only bottom quarter so most of the image stays clear */}
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#1E1510] via-[#1E1510]/60 to-transparent pointer-events-none z-10" />

          {/* Text overlay */}
          <div className="absolute inset-x-0 bottom-0 px-8 py-7 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${active}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="font-sans text-[11px] tracking-widest text-accent uppercase mb-2">
                  {services[active].id} / {TOTAL}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-2">
                  {services[active].name}
                </h3>
                <p className="text-white/60 font-sans text-sm leading-relaxed max-w-xl">
                  {services[active].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
