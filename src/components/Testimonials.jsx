// Sample testimonials — swap these for real client/collaborator quotes
// once you have them. Structure: { name, role, text }.
const TESTIMONIALS = [
  { name: "Ariana Cole", role: "Founder, Studio Nine", text: "Rishi turned our idea into a site that feels alive." },
  { name: "Marcus Reed", role: "Product Lead", text: "Cinematic, fast, and genuinely original design work." },
  { name: "Sana Iyer", role: "Creative Director", text: "Every scroll interaction felt intentional and premium." },
  { name: "Theo Park", role: "Founder, Nordlys", text: "The best developer collaboration we've had this year." },
  { name: "Priya Nair", role: "Marketing Head", text: "Our conversion rate jumped after the redesign launched." },
];

function TestimonialCard({ t }) {
  return (
    <div className="shrink-0 w-[320px] mx-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-signal/20 flex items-center justify-center text-signal font-bold">
          {t.name[0]}
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{t.name}</p>
          <p className="text-white/40 text-xs">{t.role}</p>
        </div>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">{t.text}</p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full overflow-hidden bg-void py-24 sm:py-28">
      <div className="text-center mb-12 px-6">
        <p className="text-signal uppercase tracking-widest text-sm mb-2 font-mono">
          Client Love
        </p>
        <h3 className="text-white text-3xl md:text-5xl font-black">
          What people are saying
        </h3>
      </div>

      <div className="overflow-hidden no-scrollbar mb-6">
        <div
          className="flex animate-marquee-left"
          style={{ animationDuration: "25s", width: "max-content" }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      <div className="overflow-hidden no-scrollbar">
        <div
          className="flex animate-marquee-right"
          style={{ animationDuration: "25s", width: "max-content" }}
        >
          {[...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()].map(
            (t, i) => (
              <TestimonialCard key={i} t={t} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
