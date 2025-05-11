"use client"

import { useSprings, animated, SpringValue, SpringConfig } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  easing?: string | ((t: number) => number);
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "initial" | "inherit";
  onLetterAnimationComplete?: () => void;
}

// Fungsi untuk mengkonversi string easing ke fungsi easing
const getEasingFunction = (easing: string | ((t: number) => number)): ((t: number) => number) => {
  if (typeof easing === 'function') {
    return easing;
  }
  
  // Daftar fungsi easing yang umum digunakan
  const easingFunctions: Record<string, (t: number) => number> = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => (--t) * t * t + 1,
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  };
  
  return easingFunctions[easing] || ((t) => t); // Default ke linear jika tidak ditemukan
};

const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = (t) => t,
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const words = text.split(" ").map((w) => w.split(""));
  const letters = words.flat();

  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  // Effect untuk menandai komponen sudah di-mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !mounted) return;

    // Periksa apakah elemen sudah terlihat saat halaman dimuat
    const checkInitialVisibility = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const isVisible = rect.top <= windowHeight && rect.bottom >= 0;
        
        if (isVisible) {
          setInView(true);
          return true;
        }
      }
      return false;
    };

    // Jika elemen sudah terlihat, tidak perlu observer
    if (checkInitialVisibility()) {
      return;
    }

    // Jika tidak terlihat, gunakan IntersectionObserver
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin, mounted]);

  const easingFunction = getEasingFunction(easing);

  const springConfig: SpringConfig = {
    tension: 170,
    friction: 26,
    easing: easingFunction
  };

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async (
            next: (step: Record<string, string | number>) => Promise<void>
          ) => {
            await next(animationTo);
            animatedCount.current += 1;
            if (
              animatedCount.current === letters.length &&
              onLetterAnimationComplete
            ) {
              onLetterAnimationComplete();
            }
          }
        : animationFrom,
      delay: i * delay,
      config: springConfig,
    }))
  );

  const AnimatedSpan = animated.span as React.FC<{
    children: React.ReactNode;
    style: Record<string, SpringValue | string | number>;
  }>;

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline ${className}`}
      style={{ textAlign: textAlign }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.map((letter, lIdx) => {
            const index =
              words.slice(0, wIdx).reduce((acc, w) => acc + w.length, 0) + lIdx;

            return (
              <AnimatedSpan
                key={index}
                style={{
                  ...springs[index],
                  display: "inline-block",
                  willChange: "transform, opacity",
                }}
              >
                {letter}
              </AnimatedSpan>
            );
          })}
          <span className="inline-block w-[0.3em]">&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

export default SplitText;
