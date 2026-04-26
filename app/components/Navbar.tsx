"use client";

import { useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#portfolio" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/90 backdrop-blur-sm border-b border-accent-light">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-semibold tracking-wide text-foreground">
          Cassa Interior
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/628121286666"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-accent text-white px-5 py-2 rounded-full hover:bg-accent/90 transition-colors"
          >
            Free Consult
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-background border-t border-accent-light px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/628121286666"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-accent text-white px-5 py-2 rounded-full text-center hover:bg-accent/90 transition-colors"
          >
            Free Consult
          </a>
        </nav>
      )}
    </header>
  );
}
