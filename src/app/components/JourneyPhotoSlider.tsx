import Image from "next/image";
import { useState } from "react";

export function useJourneyPhotoSlider() {
  const images = [
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/refs/heads/main/IMG_0992.JPEG.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/refs/heads/main/WA98638.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/refs/heads/main/IMG_0992.JPEG.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/refs/heads/main/WA98638.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/refs/heads/main/IMG_0992.JPEG.jpg",
    "https://raw.githubusercontent.com/akiraraihaan/self-sources/refs/heads/main/WA98638.jpg",
  ];
  const [current, setCurrent] = useState(0);
  const max = images.length - 1;
  const goLeft = () => setCurrent((prev) => (prev === 0 ? max : prev - 1));
  const goRight = () => setCurrent((prev) => (prev === max ? 0 : prev + 1));
  return { images, current, setCurrent, goLeft, goRight };
}

export function JourneyPhotoSlider() {
  const { images, current, setCurrent, goLeft, goRight } = useJourneyPhotoSlider();
  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full max-w-2xl mx-auto aspect-video bg-neutral-900 rounded-2xl overflow-hidden shadow-lg">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center">
              <Image
                src={src}
                alt={`Journey ${idx + 1}`}
                width={960}
                height={540}
                className="w-full h-full object-cover object-center select-none"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        {/* Left Arrow */}
        <button onClick={goLeft} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow transition z-20">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        {/* Right Arrow */}
        <button onClick={goRight} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow transition z-20">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="flex gap-2 mt-4 justify-center">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? 'bg-black' : 'bg-gray-300'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
