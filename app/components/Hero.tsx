import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-hero-bg grid lg:grid-cols-[55%_45%]">
      {/* Left — content */}
      <div className="flex flex-col justify-center px-10 md:px-16 pt-16 pb-12">
        {/* Label */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
          <p className="text-xs text-white/50 font-sans tracking-widest uppercase">
            Specially built for every home
          </p>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl md:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.1] mb-6">
          We believe good design is <em>felt</em>, not just seen.
        </h1>

        {/* Subtext */}
        <p className="text-white/50 font-sans text-sm leading-relaxed max-w-xs mb-12">
          Thoughtfully crafted interiors where everyday moments turn into lasting memories.
        </p>

        {/* Button */}
        <div>
          <Button
            href="https://wa.me/628121286666"
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
          >
            Free Consult Now
          </Button>
        </div>
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
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#9B7E5A">
                    <path d="M6 1l1.3 2.6L10 4l-2 1.9.5 2.7L6 7.3 3.5 8.6 4 5.9 2 4l2.7-.4L6 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-foreground font-sans leading-snug">
                Based in Gading Serpong,<br />Tangerang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
