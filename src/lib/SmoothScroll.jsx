import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: !media.matches,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const scrollTo = (target, opts = {}) => {
    lenisRef.current?.scrollTo(target, { offset: 0, duration: 1.4, ...opts });
  };

  return (
    <LenisContext.Provider value={{ scrollTo, lenisRef }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useSmoothScroll() {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }
  return ctx;
}
