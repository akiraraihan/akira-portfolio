import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform, MotionValue, Transition } from "framer-motion";

export interface JourneyPhotoCarouselProps {
  images: string[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function JourneyPhotoCarousel({
  images,
  baseWidth = 480,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  loop = true,
  round = false,
}: JourneyPhotoCarouselProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive width calculation
  const getResponsiveWidth = () => {
    if (windowWidth < 640) return Math.min(windowWidth - 32, 320); // Mobile: max 320px with 16px margin each side
    if (windowWidth < 768) return Math.min(windowWidth - 64, 400); // Tablet: max 400px
    return baseWidth; // Desktop: use baseWidth
  };

  const responsiveWidth = getResponsiveWidth();
  const containerPadding = windowWidth < 640 ? 8 : 16; // Smaller padding on mobile
  const itemWidth = responsiveWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  // Adaptasi dari Carousel.tsx: duplikasi item hanya di akhir
  const carouselItems = loop ? [...images, images[0]] : images;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === images.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, images.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setTimeout(() => {
        setIsResetting(true);
        x.set(0); // Instantly reset position without animation
        setCurrentIndex(0);
        setTimeout(() => setIsResetting(false), 50); // Re-enable animation after reset
      }, 50); // Delay to allow smooth transition before reset
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setTimeout(() => {
          setIsResetting(true);
          x.set(-trackItemOffset * (images.length)); // Instantly move to the duplicated last image
          setCurrentIndex(images.length - 1);
          setTimeout(() => setIsResetting(false), 50); // Re-enable animation after reset
        }, 50);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  // Komponen child agar useTransform dipanggil di top-level function
  interface CarouselItemMotionProps {
    x: MotionValue<number>;
    index: number;
    trackItemOffset: number;
    itemWidth: number;
    src: string;
    round: boolean;
    effectiveTransition: Transition;
  }
  function CarouselItemMotion({
    x,
    index,
    trackItemOffset,
    itemWidth,
    src,
    round,
    effectiveTransition,
  }: CarouselItemMotionProps) {
    const range = [
      -(index + 1) * trackItemOffset,
      -index * trackItemOffset,
      -(index - 1) * trackItemOffset,
    ];
    const outputRange = [90, 0, -90];
    const rotateY = useTransform(x, range, outputRange, { clamp: false });
    return (
      <motion.div
        className={`relative shrink-0 flex flex-col ${
          round
            ? "items-center justify-center text-center bg-[#060010] border-0"
            : "items-center justify-center bg-[#222] shadow-xl rounded-[12px]"
        } overflow-hidden cursor-grab active:cursor-grabbing`}        style={{
          width: itemWidth,
          height: round ? itemWidth : windowWidth < 640 ? "200px" : windowWidth < 768 ? "250px" : "320px",
          rotateY: rotateY,
          ...(round && { borderRadius: "50%" }),
        }}
        transition={effectiveTransition}
      >
        <Image
          src={src}
          alt={`Journey ${index + 1}`}
          width={960}
          height={540}
          className="w-full h-full object-cover object-center select-none pointer-events-none"
          priority={index === 0}
        />
      </motion.div>
    );
  }
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${
        round
          ? "rounded-full border border-white"
          : "rounded-[12px] sm:rounded-[24px] border mx-auto"
      }`}
      style={{
        width: `${responsiveWidth}px`,
        padding: `${containerPadding}px`,
        ...(round && { height: `${responsiveWidth}px` }),
      }}
    >
      <div className="w-full flex justify-center mb-2 sm:mb-4">
        <span className="text-xs text-neutral-500 select-none text-center px-2">
          {windowWidth < 640 ? "Swipe to see more" : "Swipe, Slide or drag horizontally to see more photos"}
        </span>
      </div>
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          minWidth: `${trackItemOffset * carouselItems.length}px`,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((src, index) => (
          <CarouselItemMotion
            key={index}
            x={x}
            index={index}
            trackItemOffset={trackItemOffset}
            itemWidth={itemWidth}
            src={src}
            round={round}
            effectiveTransition={effectiveTransition}
          />
        ))}
      </motion.div>      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div className="mt-2 sm:mt-4 flex w-full max-w-[480px] justify-center gap-2 sm:gap-4 px-2">
          {images.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % images.length === index
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                    ? "bg-[#555]"
                    : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{
                scale: currentIndex % images.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    
    </div>
  );
}
