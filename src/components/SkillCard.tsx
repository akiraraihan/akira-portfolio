// src/components/SkillCard.tsx
import React from "react";
import Image from "next/image";

export interface SkillCardProps {
  imgSrc: string;
  alt: string;
  label: string;
  isSvg?: boolean;
  svgContent?: React.ReactNode;
}

const SkillCard: React.FC<SkillCardProps> = ({ imgSrc, alt, label, isSvg, svgContent }) => (
  <div className="mx-1 flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-2 py-1.5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
    {isSvg && svgContent ? (
      <span className="w-4 h-4 flex items-center">{svgContent}</span>
    ) : (
      <Image src={imgSrc} alt={alt} className="w-4 h-4" width={16} height={16} />
    )}
    <span className="text-black text-sm font-medium">{label}</span>
  </div>
);

export default SkillCard;
