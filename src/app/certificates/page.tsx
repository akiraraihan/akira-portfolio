"use client";
import { useCertificates } from "@/data/certificates";
import CertificateCard from "@/components/CertificateCard";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import ScrollFloat from "../components/reactbits/ScrollFloat";

export default function CertificatesPage() {
  const { certificates } = useCertificates();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-2 sm:px-6">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            textClassName="font-bold tracking-tighter text-center text-2xl sm:text-3xl mb-2"
          >
            All Licenses & Certifications
          </ScrollFloat>
          <PulsatingButton href="/" className="mt-2 text-sm font-medium">
            ← Back to Home
          </PulsatingButton>
        </div>
        <div className="bg-white rounded-3xl shadow-xl py-8 px-2 sm:px-8 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {certificates.map((cert, idx) => (
              <CertificateCard key={cert.credentialId + idx} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
