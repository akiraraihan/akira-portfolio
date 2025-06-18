import { ShinyButton } from "@/components/magicui/shiny-button";
import { motion } from "framer-motion";
import type { Certificate } from "@/data/certificates";
import Image from "next/image";

interface CertificateCardProps {
  cert: Certificate;
  small?: boolean;
}

export default function CertificateCard({ cert, small }: CertificateCardProps) {
  // Fade up animasi sederhana
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  };
  return (
    <div className={`flex flex-col items-center bg-black rounded-2xl ${small ? 'p-3' : 'p-6'} h-full`}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: 60 }}
        className={`${small ? 'w-14 h-14 mb-2' : 'w-20 h-20 mb-4'} rounded-xl flex items-center justify-center overflow-hidden`}
      >
        <Image src={cert.imgSrc} alt={cert.alt} className="w-full h-full object-contain" width={400} height={300} />
      </motion.div>
      <div className="flex flex-col flex-grow w-full">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.08, duration: 0.5, type: "spring", stiffness: 60 }}
          className={`font-semibold ${small ? 'text-base min-h-[32px]' : 'text-lg tracking-tight min-h-[48px]'} text-center mb-1 text-white`}
        >
          {cert.title}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.16, duration: 0.5, type: "spring", stiffness: 60 }}
          className={`text-gray-200 ${small ? 'text-xs' : 'text-sm'} mb-1 text-center`}
        >{cert.issuer}</motion.p>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.24, duration: 0.5, type: "spring", stiffness: 60 }}
          className={`text-gray-400 ${small ? 'text-[10px]' : 'text-xs'} mb-1 text-center`}
        >Issued {cert.issued} · Expires {cert.expires}</motion.p>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.32, duration: 0.5, type: "spring", stiffness: 60 }}
          className={`text-gray-400 ${small ? 'text-[10px]' : 'text-xs'} mb-2 text-center`}
        >Credential ID {cert.credentialId}</motion.p>
        <div className="flex-grow" />
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center mt-auto mb-1.5 block"
          >
            <ShinyButton className={`w-full !bg-white !text-black !border-white ${small ? 'text-xs py-1' : ''}`}>Show Credential</ShinyButton>
          </a>
        )}
      </div>
    </div>
  );
}
