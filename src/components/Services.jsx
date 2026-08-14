import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import services from "../data/services.js";

function ServiceCard({ service }) {
  return (
    <div
      className="group relative w-[82vw] shrink-0 snap-center rounded-3xl border border-line bg-surface/60 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 sm:w-[380px]"
      style={{ boxShadow: `0 0 0 1px transparent` }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: service.color }}
      />
      <span
        className="relative inline-block rounded-full border px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest"
        style={{ borderColor: `${service.color}55`, color: service.color }}
      >
        {service.tag}
      </span>
      <h3 className="relative mt-6 text-2xl font-semibold text-white">{service.title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-white/50">
        {service.description}
      </p>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 96),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + (track.scrollWidth - window.innerWidth + 96),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-void py-32 sm:h-screen sm:py-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
      >
        <span className="whitespace-nowrap text-[20vw] font-black leading-none tracking-tighter text-white/[0.035]">
          SERVICES
        </span>
      </div>

      <div className="relative flex h-full flex-col justify-center gap-10 sm:gap-14">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-reveal">
            What I Do
          </span>
          <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Six ways to work together.
          </h2>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 sm:snap-none sm:gap-6 sm:overflow-visible sm:px-8 md:pl-8"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          <div className="w-px shrink-0 sm:hidden" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
