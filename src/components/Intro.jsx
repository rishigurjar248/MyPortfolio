import { Github, Instagram, Linkedin, Trophy } from "lucide-react";
import { useRef, useState } from "react";
import { SOCIALS } from "../lib/contact.js";
import { useReveal } from "../lib/useReveal.js";

const ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  LeetCode: Trophy,
};

function PortraitImage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-950">
        <span className="select-none text-[7rem] font-black tracking-tighter text-white/10 sm:text-[9rem]">
          RG
        </span>
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/30">
          Portrait
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-950">
      <img
        src="/images/8251afc1-a102-43f1-9311-ff482c7f24c3.png"
        alt="Rishi"
        className="h-full w-full object-cover object-center"
        onError={() => setHasError(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

export default function Intro() {
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-28 sm:py-36"
    >
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 sm:px-8 md:grid-cols-2 md:gap-10">
        {/* Portrait */}
        <div
          data-reveal
          className="mx-auto aspect-[3/4] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:mx-0"
        >
          <PortraitImage />
        </div>

        {/* Copy */}
        <div>
          <span
            data-reveal
            className="font-mono text-xs uppercase tracking-[0.3em] text-reveal"
          >
            Intro
          </span>
          <h2
            data-reveal
            className="mt-4 select-none text-[4rem] font-black uppercase italic leading-[0.85] tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)] sm:text-[6rem]"
          >
            Intro
          </h2>

          <div
            data-reveal
            className="mt-8 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-6 leading-relaxed text-white/70 backdrop-blur-sm sm:p-8"
          >
            <p>
              Hey, I'm <strong className="text-white">Rishi</strong>. An
              early-career software engineer who loves building full-stack
              products end to end. I turn ideas into working apps using{" "}
              <strong className="text-white">React</strong>,{" "}
              <strong className="text-white">Node.js</strong>, and{" "}
              <strong className="text-white">MongoDB</strong>, and I'm always
              picking up new tools — from AI-assisted workflows to whatever
              breaks my setup next. I always strive to keep learning and
              shipping.
            </p>
          </div>

          <div data-reveal className="mt-7 flex flex-wrap items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = ICONS[social.name];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white"
                >
                  {Icon && <Icon size={17} strokeWidth={1.75} />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
