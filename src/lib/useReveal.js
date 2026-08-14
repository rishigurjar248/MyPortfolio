import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Fades + rises every element matching `selector` inside `containerRef`
 * once it scrolls into view. Attach `data-reveal` to whatever should animate.
 */
export function useReveal(containerRef, selector = "[data-reveal]", options = {}) {
  const { y = 36, duration = 0.9, stagger = 0.12, start = "top 78%" } = options;

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const els = root.querySelectorAll(selector);
    if (!els.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [containerRef, selector, y, duration, stagger, start]);
}
