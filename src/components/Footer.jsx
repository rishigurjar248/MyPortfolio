import { buildWhatsAppLink, SOCIALS } from "../lib/contact.js";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "intro" },
  { label: "Work", id: "work" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];
const MARQUEE_WORDS = ["CREATE", "DESIGN", "DEVELOP", "INSPIRE"];

export default function Footer() {
  return (
    <footer className="relative w-full bg-signal text-black overflow-hidden pt-24 pb-10">
      {/* layered marquee background */}
      <div className="absolute inset-0 flex flex-col justify-between py-6 pointer-events-none select-none">
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="overflow-hidden whitespace-nowrap"
            style={{ opacity: 0.06 + row * 0.02 }}
          >
            <div
              className={
                row % 2 === 0
                  ? "flex animate-marquee-left"
                  : "flex animate-marquee-right"
              }
              style={{
                animationDuration: `${40 - row * 4}s`,
                width: "max-content",
              }}
            >
              {Array(6)
                .fill(MARQUEE_WORDS[row % MARQUEE_WORDS.length])
                .map((w, i) => (
                  <span
                    key={i}
                    className="font-black uppercase tracking-tight mr-10"
                    style={{ fontSize: "8vw" }}
                  >
                    {w}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-zinc-900 shadow-2xl flex items-center justify-center mb-8 overflow-hidden">
          <img
            src="/images/profile-headshot.png"
            alt="Rishi"
            className="h-full w-full object-cover object-[68%_center]"
          />
        </div>

        <div className="flex gap-4 mb-14">
          {SOCIALS[1] && (
            <a
              href={SOCIALS[1].href}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold uppercase tracking-wide hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300"
            >
              Follow
            </a>
          )}
          <a
            href={buildWhatsAppLink("Hi Rishi 👋")}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-full bg-white text-black font-semibold uppercase tracking-wide hover:-translate-y-1 transition-all duration-300 shadow-md"
          >
            Message
          </a>
        </div>

        <h2 className="font-black uppercase tracking-tight text-4xl md:text-6xl mb-2">
          Rishi<span className="text-white">.dev</span>
        </h2>
        <p className="text-black/60 mb-10 text-sm md:text-base">
          Building beyond possible, one release at a time.
        </p>

        <nav className="flex flex-wrap justify-center gap-6 mb-10">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-xs md:text-sm uppercase tracking-widest font-semibold hover:opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="w-full max-w-3xl h-px bg-black/15 rounded-full mb-8" />

        <div className="flex flex-col md:flex-row items-center gap-2 text-xs uppercase tracking-widest font-bold text-black/70">
          <span>
            &copy; {new Date().getFullYear()} Rishi.dev — All rights reserved.
          </span>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:opacity-60 transition-opacity">
            Privacy
          </a>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:opacity-60 transition-opacity">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
