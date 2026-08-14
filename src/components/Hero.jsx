import { useEffect, useRef } from "react";

const DESKTOP_RADIUS = 235;
const MOBILE_RADIUS = 150;

// Google Drive resume file
const RESUME_FILE_ID = "13sUM7vr52MsrOtdEU4bS2mBL_NWPwyDf";
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

/**
 * Ported from the uploaded liquid-glass hero build. Logic is unchanged —
 * a single requestAnimationFrame loop drives CSS custom properties, so
 * pointer movement never triggers a React re-render.
 */
export default function Hero() {
  const sectionRef = useRef(null);

  const rawPos = useRef({ x: -999, y: -999 });
  const smoothPos = useRef({ x: -999, y: -999 });
  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const isTouching = useRef(false);
  const rafId = useRef(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = media.matches;
    const onMediaChange = (e) => {
      reducedMotion.current = e.matches;
    };
    media.addEventListener("change", onMediaChange);

    const setPointFromEvent = (clientX, clientY) => {
      const rect = el.getBoundingClientRect();
      rawPos.current.x = clientX - rect.left;
      rawPos.current.y = clientY - rect.top;
    };

    const onPointerEnter = (e) => {
      if (e.pointerType !== "mouse") return;
      setPointFromEvent(e.clientX, e.clientY);
      targetRadius.current = DESKTOP_RADIUS;
    };

    const onPointerMove = (e) => {
      if (e.pointerType !== "mouse") return;
      setPointFromEvent(e.clientX, e.clientY);
    };

    const onPointerLeave = (e) => {
      if (e.pointerType !== "mouse") return;
      targetRadius.current = 0;
    };

    const onTouchStart = (e) => {
      isTouching.current = true;
      const t = e.touches[0];
      if (t) setPointFromEvent(t.clientX, t.clientY);
      targetRadius.current = MOBILE_RADIUS;
    };

    const onTouchMove = (e) => {
      if (!isTouching.current) return;
      const t = e.touches[0];
      if (t) setPointFromEvent(t.clientX, t.clientY);
    };

    const onTouchEnd = () => {
      isTouching.current = false;
      targetRadius.current = 0;
    };

    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    const tick = () => {
      const posFactor = reducedMotion.current ? 1 : 0.14;
      const radiusFactor = reducedMotion.current ? 1 : 0.12;

      smoothPos.current.x +=
        (rawPos.current.x - smoothPos.current.x) * posFactor;
      smoothPos.current.y +=
        (rawPos.current.y - smoothPos.current.y) * posFactor;
      currentRadius.current +=
        (targetRadius.current - currentRadius.current) * radiusFactor;

      el.style.setProperty("--reveal-x", `${smoothPos.current.x}px`);
      el.style.setProperty("--reveal-y", `${smoothPos.current.y}px`);
      el.style.setProperty("--reveal-radius", `${currentRadius.current}px`);

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      media.removeEventListener("change", onMediaChange);
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-paper"
      style={{
        "--reveal-x": "-999px",
        "--reveal-y": "-999px",
        "--reveal-radius": "0px",
      }}
    >
      {/* Layer 1 — base portrait */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[10] motion-safe:[animation:portrait-in_1.1s_cubic-bezier(0.16,1,0.3,1)_forwards]"
        style={{
          backgroundImage: "url(/images/Base_image_desktop.png)",
          backgroundPosition: "74% center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      {/* Layer 2 — reveal portrait, masked to the cursor/touch point */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[20]"
        style={{
          backgroundImage: "url(/images/Reveal_image_desktop.png)",
          backgroundPosition: "74% center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          WebkitMaskImage:
            "radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(circle var(--reveal-radius) at var(--reveal-x) var(--reveal-y), #000 60%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      {/* Layer 3 — technical grid + large circle, decorative */}
      <div aria-hidden="true" className="absolute inset-0 z-[30]">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.14]"
          preserveAspectRatio="none"
          viewBox="0 0 1600 900"
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={(i + 1) * 160}
              y1={0}
              x2={(i + 1) * 160}
              y2={900}
              stroke="#0c1116"
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={(i + 1) * 150}
              x2={1600}
              y2={(i + 1) * 150}
              stroke="#0c1116"
              strokeWidth={1}
            />
          ))}
          <circle
            cx="1180"
            cy="470"
            r="330"
            fill="none"
            stroke="#0c1116"
            strokeWidth={1}
          />
        </svg>
      </div>

      {/* Layer 3.5 — soft scrim so headline copy stays legible on every screen */}
      <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[32]" />

      {/* Layer 4 — headline and copy */}
      <header className="relative z-[40] h-full w-full">
        <h1
          aria-label="Building Beyond Possible."
          className="hero-copy-glow absolute left-[max(5.6vw,1.5rem)] top-[34%] font-sans font-light text-ink"
          style={{
            fontSize: "clamp(3.4rem, 6.2vw, 6.8rem)",
            lineHeight: 0.93,
            letterSpacing: "-0.05em",
          }}
        >
          <span aria-hidden="true" className="block overflow-hidden">
            <span className="block motion-safe:animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_0.35s_both]">
              Building
            </span>
          </span>
          <span aria-hidden="true" className="block overflow-hidden">
            <span className="block motion-safe:animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_0.48s_both]">
              Beyond
            </span>
          </span>
          <span aria-hidden="true" className="block overflow-hidden">
            <span className="block motion-safe:animate-[rise-in_0.8s_cubic-bezier(0.16,1,0.3,1)_0.61s_both]">
              Possible.
            </span>
          </span>
        </h1>

        <div className="absolute bottom-[9%] left-[max(5.6vw,1.5rem)] max-w-[26rem] motion-safe:animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.85s_both]">
          <p className="hero-copy-glow text-[1.05rem] leading-relaxed text-ink/80">
            I build useful products, experiment with emerging technology, and
            turn the process into stories worth sharing.
          </p>
          <div className="mt-6 inline-flex min-h-[44px] items-center gap-3">
            <a
              href="#work"
              className="inline-flex min-h-[44px] items-center rounded-full bg-white px-6 text-sm font-medium text-ink shadow-sm outline-none transition transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              Explore my work
            </a>
            <a
              href={RESUME_DOWNLOAD_URL}
              rel="noopener noreferrer"
              download
              className="inline-flex min-h-[44px] items-center rounded-full border border-ink/15 bg-transparent px-6 text-sm font-medium text-ink shadow-sm outline-none transition-colors hover:bg-signal hover:text-ink hover:shadow-md focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              Resume
            </a>
          </div>
        </div>

        <p className="absolute bottom-[9%] right-[max(1.8vw,1rem)] hidden max-w-[13rem] text-right font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.12em] text-ink/70 motion-safe:animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.95s_both] sm:block">
          Building the
          <br />
          next version
          <br />
          in public
        </p>
      </header>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-[40] hidden -translate-x-1/2 flex-col items-center gap-2 text-ink/50 motion-safe:animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_1.1s_both] sm:flex">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <span className="h-8 w-px bg-ink/30" />
      </div>
    </section>
  );
}
