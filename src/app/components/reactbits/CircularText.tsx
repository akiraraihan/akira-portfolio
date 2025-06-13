import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const [currentRotation, setCurrentRotation] = useState(0);

  useEffect(() => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: {
        duration: spinDuration,
        ease: "linear",
      },
    });
  }, [spinDuration, controls, onHover, text, currentRotation]);

  const handleHoverStart = () => {
    if (!onHover) return;
    switch (onHover) {
      case "slowDown":
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: {
            duration: spinDuration * 2,
            ease: "linear",
          },
        });
        break;
      case "speedUp":
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: {
            duration: spinDuration / 4,
            ease: "linear",
          },
        });
        break;
      case "pause":
        controls.start({
          rotate: currentRotation,
          scale: 1,
          transition: {
            type: "spring",
            damping: 20,
            stiffness: 300,
          },
        });
        break;
      case "goBonkers":
        controls.start({
          rotate: currentRotation + 360,
          scale: 0.8,
          transition: {
            duration: spinDuration / 20,
            ease: "linear",
          },
        });
        break;
      default:
        break;
    }
  };

  const handleHoverEnd = () => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: {
        duration: spinDuration,
        ease: "linear",
      },
    });
  };

  return (
    <motion.div
      initial={{ rotate: 0 }}
      className={`mx-auto rounded-full w-[40px] h-[40px] text-white font-black text-center cursor-pointer origin-center text-sm ${className}`}
      animate={controls}
      onUpdate={(latest) => setCurrentRotation(Number(latest.rotate))}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotation = (360 / letters.length) * i;
        const factor = Number((Math.PI / letters.length).toFixed(0));
        const x = factor * i;
        const y = factor * i;
        const transform = `rotateZ(${rotation}deg) translate3d(${x}px, ${y}px, 0)`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-[8px] transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
