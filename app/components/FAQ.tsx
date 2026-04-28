"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

const faqs = [
  {
    q: "What areas do you serve?",
    a: "We primarily serve Gading Serpong, Tangerang, and surrounding regions. Contact us to confirm if your location is covered.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines vary based on scope. Residential design projects typically take 4 weeks, while custom furniture and build projects can take 4–6 weeks.",
  },
  {
    q: "Is the initial consultation free?",
    a: "Yes. We offer a free initial consultation to understand your needs, budget, and vision before any commitment.",
  },
  {
    q: "Do I need planning permission?",
    a: "For most interior works, planning permission is not required. We will advise you during the consultation if your project has any exceptions.",
  },
  {
    q: "What does the warranty cover?",
    a: "We offer lifetime coverage on hardware components such as hinges and drawer rails. Our aftercare team is available for any issues that arise post-handover.",
  },
  {
    q: "Can I stay in my home during the work?",
    a: "In most cases, yes. We plan our work schedules to minimise disruption, and will discuss the best approach for your specific project.",
  },
  {
    q: "How do I get started?",
    a: "Simply reach out via WhatsApp or email. We will schedule a free consultation and walk you through the process from there.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faqs" className="py-24 bg-accent-light">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div className="mb-14" {...fadeUp(0)}>
          <p className="text-sm uppercase tracking-widest text-accent mb-4 font-sans">FAQs</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-snug">
            Common questions.
          </h2>
        </motion.div>

        <div className="flex flex-col divide-y divide-accent/20">
          {faqs.map((faq, i) => (
            <motion.div key={i} {...fadeUp(i * 0.05)}>
              <button
                className="w-full flex items-center justify-between gap-4 text-left py-5"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-sans font-medium text-foreground">{faq.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="shrink-0 text-accent text-xl leading-none"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="pb-5 text-sm text-muted font-sans leading-relaxed border-l-2 border-accent pl-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
