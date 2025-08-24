"use client"
import { useRef, useEffect, useState, ReactNode } from "react";
import { useSpring, animated, SpringValue } from "@react-spring/web";

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  config?: Record<string, unknown>;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
}

type AnimatedDivProps = {
  children: ReactNode;
  style: {
    transform: SpringValue<string>;
    opacity: SpringValue<number>;
  };
};

const AnimatedDiv = animated.div as unknown as React.FC<AnimatedDivProps>;

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  config = { tension: 50, friction: 25 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Langsung check apakah element sudah visible (untuk threshold=0 cases)
    const rect = element.getBoundingClientRect();
    const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (threshold === 0 && isAlreadyVisible) {
      // Jika threshold=0 dan sudah visible, langsung trigger
      setTimeout(() => {
        setInView(true);
      }, delay);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(element);
          setTimeout(() => {
            setInView(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, delay]);

  const directions: Record<"vertical" | "horizontal", string> = {
    vertical: "Y",
    horizontal: "X",
  };

  const springProps = useSpring({
    from: {
      transform: `translate${directions[direction]}(${
        reverse ? `-${distance}px` : `${distance}px`
      }) scale(${scale})`,
      opacity: animateOpacity ? initialOpacity : 1,
    },
    to: inView
      ? {
          transform: `translate${directions[direction]}(0px) scale(1)`,
          opacity: 1,
        }
      : undefined,
    config,
  });

  return (
    <div ref={ref}>
      <AnimatedDiv style={springProps}>
        {children}
      </AnimatedDiv>
    </div>
  );
};

export default AnimatedContent;
