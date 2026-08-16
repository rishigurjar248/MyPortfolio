import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "../lib/SmoothScroll.jsx";
import { buildWhatsAppLink } from "../lib/contact.js";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#intro" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const RESUME_FILE_ID = "1n73Xv0NDbArelBLO2q0uk8Vph6yl3hLX";
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

function BrandMark({ className = "" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M19 5.5H8.5L18 12L5 12L15.5 18.5H5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default function Navbar() {
  const { scrollTo, lenisRef } = useSmoothScroll();
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (mobileOpen || feedbackOpen) {
        lastY = y;
        return;
      }
      setHidden(y > lastY && y > 140);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen, feedbackOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    lenisRef.current?.start();
    scrollTo(href, { offset: -16 });
  };

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    if (next) lenisRef.current?.stop();
    else lenisRef.current?.start();
  };

  const closeFeedback = () => {
    setFeedbackOpen(false);
    setSent(false);
    lenisRef.current?.start();
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    if (!feedback.name.trim() || !feedback.message.trim()) return;

    const payload = {
      name: feedback.name.trim(),
      email: feedback.email.trim(),
      role: feedback.role.trim(),
      message: feedback.message.trim(),
      source: "portfolio",
      submittedAt: new Date().toISOString(),
    };

    const text = `New testimonial from ${payload.name}${
      payload.role ? ` (${payload.role})` : ""
    }\n\n"${payload.message}"`;

    window.open(buildWhatsAppLink(text), "_blank", "noopener,noreferrer");

    setSent(true);
    setTimeout(() => {
      setFeedback({ name: "", email: "", role: "", message: "" });
      closeFeedback();
    }, 1500);
  };

  const navSurfaceClass = scrolled
    ? "border border-slate-200/80 bg-white/75 text-slate-900 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
    : "border border-transparent bg-transparent text-slate-900 dark:text-white";

  const navLinkClass =
    "group relative text-sm font-medium tracking-[0.02em] text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white";

  const actionButtonClass =
    "rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-medium tracking-wide text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:text-white";

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary"
        className={[
          "fixed left-0 right-0 top-0 z-[100] transition-transform duration-500 ease-out",
          hidden ? "-translate-y-[120%]" : "translate-y-0",
        ].join(" ")}
      >
        <div
          className={[
            "mx-3 mt-3 flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:mx-6 sm:mt-4 sm:px-5",
            navSurfaceClass,
          ].join(" ")}
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 text-sm font-semibold tracking-[0.08em] text-current outline-none"
          >
            <BrandMark className="text-current" />
            <span>RISHI</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={navLinkClass}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => {
                setFeedbackOpen(true);
                lenisRef.current?.stop();
              }}
              className={actionButtonClass}
            >
              + Feedback
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="rounded-full bg-signal px-5 py-2.5 text-xs font-semibold tracking-wide text-slate-900 transition-transform hover:scale-[1.04]"
            >
              Let&rsquo;s talk
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobile}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="relative flex h-11 w-11 flex-col items-center justify-center gap-[6px]"
            >
              <span
                className={[
                  "block h-[1.5px] w-6 transition-all duration-300",
                  mobileOpen ? "bg-slate-900 dark:bg-white" : "bg-current",
                  mobileOpen ? "translate-y-[3.75px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-[1.5px] w-6 transition-all duration-300",
                  mobileOpen ? "bg-slate-900 dark:bg-white" : "bg-current",
                  mobileOpen ? "-translate-y-[3.75px] -rotate-45" : "",
                ].join(" ")}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={[
          "fixed inset-0 z-[90] flex flex-col justify-center bg-slate-950/95 px-8 backdrop-blur-2xl transition-all duration-500 md:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <ul className="flex flex-col gap-2">
          {LINKS.map((item, i) => (
            <li
              key={item.href}
              className={[
                "overflow-hidden transition-all duration-500",
                mobileOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              ].join(" ")}
              style={{
                transitionDelay: mobileOpen ? `${i * 60 + 100}ms` : "0ms",
              }}
            >
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block py-2 text-4xl font-semibold uppercase tracking-tight text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            setMobileOpen(false);
            lenisRef.current?.start();
            setFeedbackOpen(true);
            lenisRef.current?.stop();
          }}
          className="mt-10 w-fit rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white/70"
        >
          + Leave feedback
        </button>
        <a
          href={RESUME_DOWNLOAD_URL}
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="mt-4 w-fit rounded-full border border-white/20 px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white/70"
          download
        >
          Resume
        </a>
      </div>

      <div
        className={[
          "fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm transition-opacity duration-300",
          feedbackOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={closeFeedback}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={[
            "w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/90 p-7 shadow-2xl backdrop-blur-xl transition-all duration-300",
            feedbackOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
          ].join(" ")}
        >
          {sent ? (
            <p className="py-10 text-center text-white/80">
              Thanks — opening WhatsApp so you can send that over. 🙌
            </p>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-white">
                Add a testimonial
              </h3>
              <p className="mt-1 text-sm text-white/50">
                Worked together? Tell me how it went — I read every one.
              </p>
              <form
                onSubmit={submitFeedback}
                className="mt-6 flex flex-col gap-3"
              >
                <input
                  required
                  placeholder="Your name"
                  value={feedback.name}
                  onChange={(e) =>
                    setFeedback({ ...feedback, name: e.target.value })
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/30"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={feedback.email}
                  onChange={(e) =>
                    setFeedback({ ...feedback, email: e.target.value })
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/30"
                />
                <input
                  placeholder="Role / company (optional)"
                  value={feedback.role}
                  onChange={(e) =>
                    setFeedback({ ...feedback, role: e.target.value })
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/30"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Your message"
                  value={feedback.message}
                  onChange={(e) =>
                    setFeedback({ ...feedback, message: e.target.value })
                  }
                  className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/30"
                />
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-signal py-3 text-sm font-semibold text-slate-900 transition-transform hover:scale-[1.02]"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={closeFeedback}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm text-white/60 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
