import { ShinyButton } from "@/components/magicui/shiny-button";
import type { Certificate } from "@/data/certificates";

interface CertificateCardProps {
  cert: Certificate;
}

export default function CertificateCard({ cert }: CertificateCardProps) {
  return (
    <div className="flex flex-col items-center bg-black rounded-2xl p-6 shadow-sm h-full">
      <div className="w-20 h-20 mb-4 rounded-xl flex items-center justify-center overflow-hidden">
        <img src={cert.imgSrc} alt={cert.alt} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col flex-grow w-full">
        <h3 className="font-semibold text-lg text-center mb-1 min-h-[48px] text-white">{cert.title}</h3>
        <p className="text-gray-200 text-sm mb-1 text-center">{cert.issuer}</p>
        <p className="text-gray-400 text-xs mb-1 text-center">Issued {cert.issued} · Expires {cert.expires}</p>
        <p className="text-gray-400 text-xs mb-3 text-center">Credential ID {cert.credentialId}</p>
        <div className="flex-grow" />
        {cert.credentialUrl && (
          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center mt-auto mb-1.5 block">
            <ShinyButton className="w-full !bg-white !text-black !border-white">Show Credential</ShinyButton>
          </a>
        )}
      </div>
    </div>
  );
}
