import { ShinyButton } from "@/components/magicui/shiny-button";
import type { Certificate } from "@/data/certificates";
import Image from "next/image";

interface CertificateCardProps {
  cert: Certificate;
  small?: boolean;
}

export default function CertificateCard({ cert, small }: CertificateCardProps) {
  return (
    <div className={`flex flex-col items-center bg-black rounded-2xl ${small ? 'p-3' : 'p-6'} shadow-sm h-full`}>
      <div className={`${small ? 'w-14 h-14 mb-2' : 'w-20 h-20 mb-4'} rounded-xl flex items-center justify-center overflow-hidden`}>
        <Image src={cert.imgSrc} alt={cert.alt} className="w-full h-full object-contain" width={400} height={300} />
      </div>
      <div className="flex flex-col flex-grow w-full">
        <h3 className={`font-semibold ${small ? 'text-base min-h-[32px]' : 'text-lg tracking-tight min-h-[48px]'} text-center mb-1 text-white`}>
          {cert.title}
        </h3>
        <p className={`text-gray-200 ${small ? 'text-xs' : 'text-sm'} mb-1 text-center`}>{cert.issuer}</p>
        <p className={`text-gray-400 ${small ? 'text-[10px]' : 'text-xs'} mb-1 text-center`}>Issued {cert.issued} · Expires {cert.expires}</p>
        <p className={`text-gray-400 ${small ? 'text-[10px]' : 'text-xs'} mb-2 text-center`}>Credential ID {cert.credentialId}</p>
        <div className="flex-grow" />
        {cert.credentialUrl && (
          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center mt-auto mb-1.5 block">
            <ShinyButton className={`w-full !bg-white !text-black !border-white ${small ? 'text-xs py-1' : ''}`}>Show Credential</ShinyButton>
          </a>
        )}
      </div>
    </div>
  );
}
