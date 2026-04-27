"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our work", href: "#portfolio" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
          className={`font-display text-lg font-semibold tracking-widest uppercase transition-colors duration-500 ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          CASS
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors duration-500 hover:opacity-70 ${
                scrolled ? "text-foreground" : "text-white/80"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden transition-colors duration-500 ${scrolled ? "text-foreground" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1.5" />
          <span className="block w-5 h-0.5 bg-current mb-1.5" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-hero-bg border-t border-white/10 px-8 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
