"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const links = [
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Our work", href: "#portfolio", id: "portfolio" },
  { label: "FAQs", href: "#faqs", id: "faqs" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-accent-light"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <a
          href="#"
          className={`font-display text-lg font-semibold tracking-[0.12em] transition-colors duration-500 ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          Cassa
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors duration-300 ${
                active === l.id
                  ? "text-accent"
                  : scrolled
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger → X */}
        <button
          className={`md:hidden relative w-5 h-[14px] transition-colors duration-500 ${
            scrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="absolute left-0 top-0 w-5 h-0.5 bg-current origin-center"
            animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
          <motion.span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-current"
            animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute left-0 bottom-0 w-5 h-0.5 bg-current origin-center"
            animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-x-0 bottom-0 bg-hero-bg/60 backdrop-blur-sm"
              style={{ top: "4rem" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute left-0 right-0 top-full bg-hero-bg border-t border-white/10 px-8 py-6 flex flex-col z-10"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: EASE }}
                  className={`py-3 text-sm border-b border-white/5 last:border-0 transition-colors ${
                    active === l.id ? "text-accent" : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
