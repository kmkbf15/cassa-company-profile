export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-accent-light pt-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-accent mb-6 font-sans">
          Interior Design Studio
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground leading-tight mb-6">
          We believe good design
          <br />
          is <em>felt</em>, not just seen.
        </h1>
        <p className="text-lg text-muted max-w-xl mx-auto mb-10 font-sans leading-relaxed">
          Thoughtfully crafted interiors where everyday moments turn into lasting memories.
        </p>
        <a
          href="https://wa.me/628121286666"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-white text-sm px-8 py-4 rounded-full hover:bg-accent/90 transition-colors"
        >
          Free Consult Now
        </a>
      </div>
    </section>
  );
}
