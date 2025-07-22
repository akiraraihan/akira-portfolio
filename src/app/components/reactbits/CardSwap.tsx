import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  className?: string; // allow custom className
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  className = "",
  children,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Get responsive values
  const getResponsiveValues = () => {
    const numWidth = typeof width === 'number' ? width : 500;
    const numHeight = typeof height === 'number' ? height : 400;
    
    if (windowWidth < 480) {
      return {
        width: Math.min(numWidth * 0.7, 250),
        height: Math.min(numHeight * 0.7, 180),
        cardDistance: cardDistance * 0.6,
        verticalDistance: verticalDistance * 0.6,
        skewAmount: skewAmount * 0.7
      };
    } else if (windowWidth < 768) {
      return {
        width: Math.min(numWidth * 0.8, 350),
        height: Math.min(numHeight * 0.8, 240),
        cardDistance: cardDistance * 0.8,
        verticalDistance: verticalDistance * 0.8,
        skewAmount: skewAmount * 0.8
      };
    }
    return { width: numWidth, height: numHeight, cardDistance, verticalDistance, skewAmount };
  };

  const responsiveValues = getResponsiveValues();
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 1.2,
          durMove: 1.8,
          durReturn: 1.5,
          promoteOverlap: 0.7,
          returnDelay: 0.1,
        }
      : {
          ease: "power2.inOut",
          durDrop: 0.8,
          durMove: 1.0,
          durReturn: 0.8,
          promoteOverlap: 0.5,
          returnDelay: 0.2,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr]
  );

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize positions
  useEffect(() => {
    const total = refs.length;
    if (total === 0 || windowWidth === 0) return;

    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(
          r.current,
          makeSlot(i, responsiveValues.cardDistance, responsiveValues.verticalDistance, total),
          responsiveValues.skewAmount
        );
      }
    });
    
    setIsInitialized(true);
  }, [windowWidth, responsiveValues.cardDistance, responsiveValues.verticalDistance, responsiveValues.skewAmount, refs]);

  // Animation loop
  useEffect(() => {
    if (!isInitialized || refs.length < 2) return;

    // Clear any existing intervals/timelines
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (tlRef.current) {
      tlRef.current.kill();
    }

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;      // Drop the front card
      tl.to(elFront, {
        y: "+=400",
        opacity: 0.3,
        duration: config.durDrop,
        ease: config.ease,
      });

      // Promote other cards
      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = makeSlot(i, responsiveValues.cardDistance, responsiveValues.verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.1}`
        );
      });

      // Return the front card to the back
      const backSlot = makeSlot(
        refs.length - 1,
        responsiveValues.cardDistance,
        responsiveValues.verticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");      tl.to(
        elFront,
        {
          y: backSlot.y,
          opacity: 1,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      // Update order
      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // Start the animation loop
    const startAnimation = () => {
      swap();
      intervalRef.current = window.setInterval(swap, delay);
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(startAnimation, 100);

    // Pause on hover functionality
    let pauseListeners: (() => void) | null = null;
    
    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        if (tlRef.current) tlRef.current.pause();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = undefined;
        }
      };
      const resume = () => {
        if (tlRef.current) tlRef.current.play();
        if (!intervalRef.current) {
          intervalRef.current = window.setInterval(swap, delay);
        }
      };
      
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      
      pauseListeners = () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
      };
    }

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      if (pauseListeners) {
        pauseListeners();
      }
    };
  }, [isInitialized, delay, pauseOnHover, refs, responsiveValues.cardDistance, responsiveValues.verticalDistance, config.durDrop, config.durMove, config.durReturn, config.ease, config.promoteOverlap, config.returnDelay]);
  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { 
            width: responsiveValues.width, 
            height: responsiveValues.height, 
            ...(child.props.style ?? {}) 
          },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );  return (
    <div
      ref={container}
      className={
        className ||
        "relative w-full h-full flex items-center justify-center [transform-style:preserve-3d] [perspective:900px]"
      }
      style={{ 
        width: responsiveValues.width, 
        height: responsiveValues.height,
        minHeight: responsiveValues.height,
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
