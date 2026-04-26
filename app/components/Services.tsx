const services = [
  {
    name: "Bedroom",
    description: "Calm, functional, and intimate retreats designed around how you rest and recharge.",
  },
  {
    name: "Bathroom",
    description: "Practical spaces that balance beauty with long-term maintainability.",
  },
  {
    name: "Kitchen",
    description: "The heart of the home — designed for how your family actually lives and cooks.",
  },
  {
    name: "Living Room",
    description: "A space where life happens. We design for comfort, flow, and lasting character.",
  },
  {
    name: "Entrance",
    description: "The first impression of your home, designed to welcome and set the tone.",
  },
  {
    name: "External Works",
    description: "Seamless transitions between interior and exterior for a cohesive whole.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-accent-light">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-widest text-accent mb-4 font-sans">Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-snug">
            What we do best.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.name} className="bg-background rounded-2xl p-8 flex flex-col gap-4">
              <h3 className="font-display text-2xl font-semibold text-foreground">{s.name}</h3>
              <p className="text-sm text-muted font-sans leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
