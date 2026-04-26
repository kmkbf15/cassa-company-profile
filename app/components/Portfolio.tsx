const projects = [
  {
    type: "Residential Interior Design",
    timeline: "4 weeks",
    description:
      "Full interior design and execution for residential spaces — from mood board to move-in ready.",
  },
  {
    type: "Custom Furniture & Built-Ins",
    timeline: "6 weeks",
    description:
      "Bespoke furniture crafted by Jepara artisans, built to fit your space and stand the test of time.",
  },
  {
    type: "Design & Build",
    timeline: "4 weeks",
    description:
      "End-to-end service from initial concept through construction, finishing, and handover.",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-widest text-accent mb-4 font-sans">Our Work</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-snug">
            Projects we are proud of.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.type} className="group flex flex-col gap-4">
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-accent-light rounded-2xl flex items-center justify-center text-accent/40 text-sm font-sans">
                Photo coming soon
              </div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-foreground">{p.type}</h3>
                <span className="shrink-0 text-xs text-accent font-sans border border-accent rounded-full px-3 py-1">
                  {p.timeline}
                </span>
              </div>
              <p className="text-sm text-muted font-sans leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
