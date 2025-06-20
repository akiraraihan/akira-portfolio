import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export function useJourneyPhotoSlider() {
  const images = [
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/IMG_0992.JPEG.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/rpl.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/IMG_7687.JPG",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/all-2.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/cu23.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/FGRI5728.JPG",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/IMG_0492.JPG",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/gedungbaru.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/kemejaputih.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/mfq-perisma24.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/openhouse-cs.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/sic-batch5.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/panit-mif.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/main/usability-test.jpg",
  ];
  return { images };
}

export function JourneyPhotoSlider() {
  const { images } = useJourneyPhotoSlider();
  const [current, setCurrent] = useState(1); // start at 1 (first real image)
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const total = images.length;
  const autoSlideInterval = 3500; // ms
  // Duplicate first and last for infinite effect
  const displayImages = [images[total - 1], ...images, images[0]];

  const goLeft = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => prev - 1);
  };
  const goRight = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((prev) => prev + 1);
  };
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (current === 0) {
      // Jump to last real image (no animation)
      setCurrent(total);
      if (sliderRef.current) {
        sliderRef.current.style.transition = "none";
        sliderRef.current.style.transform = `translateX(-${total * 100}%)`;
        // Force reflow, then restore transition
        void sliderRef.current.offsetWidth;
        sliderRef.current.style.transition = "";
      }
    } else if (current === total + 1) {
      // Jump to first real image (no animation)
      setCurrent(1);
      if (sliderRef.current) {
        sliderRef.current.style.transition = "none";
        sliderRef.current.style.transform = `translateX(-100%)`;
        void sliderRef.current.offsetWidth;
        sliderRef.current.style.transition = "";
      }
    }
  };
  // When current changes, update transform
  const getTransform = () => `translateX(-${current * 100}%)`;

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrent((prev) => prev + 1);
      }
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full max-w-2xl mx-auto aspect-video bg-neutral-900 rounded-2xl overflow-hidden shadow-lg">
        <div
          ref={sliderRef}
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: getTransform(),
            transition: isTransitioning
              ? "transform 0.7s cubic-bezier(0.4,0,0.2,1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayImages.map((src, idx) => (
            <div
              key={idx}
              className="w-full h-full flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={src}
                alt={`Journey ${((idx - 1 + total) % total) + 1}`}
                width={960}
                height={540}
                className="w-full h-full object-cover object-center select-none"
                priority={idx === 1}
              />
            </div>
          ))}
        </div>
        {/* Left Arrow */}
        <button
          onClick={goLeft}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow transition z-20"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Right Arrow */}
        <button
          onClick={goRight}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow transition z-20"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex gap-2 mt-4 justify-center">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === idx + 1 ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrent(idx + 1);
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
