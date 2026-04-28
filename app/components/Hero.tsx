"use client";

import { motion } from "framer-motion";
import Button from "./ui/Button";

const headingParts = [
  { text: "We believe good design is ", italic: false },
  { text: "felt", italic: true },
  { text: ", not just seen.", italic: false },
];

// Split into words, preserving which part each word/char came from
type Word = { chars: string[]; italic: boolean };

const words: Word[] = [];
for (const { text, italic } of headingParts) {
  // Split on spaces but keep the space as a separate token
  const tokens = text.split(/(\s+)/);
  for (const token of tokens) {
    if (!token) continue;
    if (/^\s+$/.test(token)) {
      // space between words — attach as trailing space to last word
      if (words.length > 0) words[words.length - 1].chars.push(" ");
    } else {
      words.push({ chars: token.split(""), italic });
    }
  }
}

const charVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-hero-bg grid lg:grid-cols-[55%_45%]">
      {/* Left — content */}
      <div className="flex flex-col justify-center px-10 md:px-16 pt-16 pb-12">

        {/* Label */}
        <motion.div
          className="flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.55, ease: "easeOut" }}
        >
          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
          <p className="text-xs text-white/50 font-sans tracking-widest uppercase">
            Specially built for every home
          </p>
        </motion.div>

        {/* Heading — letter by letter, words stay intact */}
        <motion.h1
          className="font-display text-4xl md:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.1] mb-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.028 } } }}
        >
          {words.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.chars.map((char, ci) => (
                <motion.span
                  key={ci}
                  className={`inline-block${word.italic ? " italic" : ""}`}
                  variants={charVariants}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-white/50 font-sans text-sm leading-relaxed max-w-xs mb-12"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.55, ease: "easeOut" }}
        >
          Thoughtfully crafted interiors where everyday moments turn into
          lasting memories.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.55, ease: "easeOut" }}
        >
          <Button
            href="https://wa.me/628121286666"
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
          >
            Free Consult Now
          </Button>
        </motion.div>
      </div>

      {/* Right — image with rounded card */}
      <div className="hidden lg:block relative p-5 pl-3">
        <div className="relative h-full rounded-2xl overflow-hidden bg-accent-light">
          {/* Placeholder — replace with <Image> once assets are ready */}
          <div className="absolute inset-0 flex items-center justify-center text-muted/30 text-sm font-sans">
            Hero photo
          </div>

          {/* Social proof card */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#9B7E5A">
                    <path d="M6 1l1.3 2.6L10 4l-2 1.9.5 2.7L6 7.3 3.5 8.6 4 5.9 2 4l2.7-.4L6 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-foreground font-sans leading-snug">
                Based in Gading Serpong,
                <br />
                Tangerang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
