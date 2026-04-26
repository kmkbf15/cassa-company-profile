const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "100+", label: "Projects Completed" },
  { value: "50+", label: "Skilled Craftspeople" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-sm uppercase tracking-widest text-accent mb-4 font-sans">About Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-snug">
            A home is more than a finished space.
          </h2>
          <p className="text-muted font-sans leading-relaxed mb-4">
            Cassa Interior was founded on the belief that a home is where life unfolds. Every corner,
            every material, every light source is chosen with intention — to make your space feel
            personal, functional, and timeless.
          </p>
          <p className="text-muted font-sans leading-relaxed">
            Based in Gading Serpong, Tangerang, we work closely with homeowners to bring their
            vision to life — from initial concept to the final detail.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-accent-light rounded-2xl p-8">
              <p className="font-display text-4xl font-semibold text-accent mb-2">{s.value}</p>
              <p className="text-sm text-muted font-sans">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
