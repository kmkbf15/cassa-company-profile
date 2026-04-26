export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-sm uppercase tracking-widest text-accent mb-4 font-sans">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-snug">
            Let's build something beautiful together.
          </h2>
          <a
            href="https://wa.me/628121286666"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white text-sm px-8 py-4 rounded-full hover:bg-accent/90 transition-colors"
          >
            Free Consult Now
          </a>
        </div>

        <div className="flex flex-col gap-6 font-sans">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-1">Email</p>
            <a href="mailto:contact@cassa.com" className="text-foreground hover:text-accent transition-colors">
              contact@cassa.com
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-1">WhatsApp</p>
            <a
              href="https://wa.me/628121286666"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              +62 812-2128-6666
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-1">Location</p>
            <p className="text-foreground">Gading Serpong, Tangerang, Indonesia</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-accent-light flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg font-semibold text-foreground">Cassa Interior</p>
        <p className="text-sm text-muted font-sans">
          © {new Date().getFullYear()} Cassa Interior. All rights reserved.
        </p>
      </div>
    </section>
  );
}
