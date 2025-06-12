export interface Certificate {
  imgSrc: string;
  alt: string;
  title: string;
  issuer: string;
  issued: string;
  expires: string;
  credentialId: string;
  credentialUrl?: string;
}

export const certificates: Certificate[] = [
  {
    imgSrc: "https://api.badgr.io/public/assertions/HauI9sNWR5-xTMS1S9yLRQ/image",
    alt: "Badge IoT Hardware",
    title: "Internet of Things (IoT) - Hardware (Gold)",
    issuer: "Skilvul",
    issued: "Jul 2024",
    expires: "Jul 2026",
    credentialId: "HauI9sNWR5-xTMS1S9yLRQ",
    credentialUrl: "https://badgr.com/public/assertions/HauI9sNWR5-xTMS1S9yLRQ?identity__email=raihanakirar@gmail.com"
  },
  {
    imgSrc: "https://api.badgr.io/public/assertions/lcqZMuGzRfu9v3zQ50Qx-g/image",
    alt: "Badge IoT Software",
    title: "Internet of Things (IoT) - Software and Platforms (Gold)",
    issuer: "Skilvul",
    issued: "Jul 2024",
    expires: "Jul 2026",
    credentialId: "lcqZMuGzRfu9v3zQ50Qx-g",
    credentialUrl: "https://badgr.com/public/assertions/lcqZMuGzRfu9v3zQ50Qx-g?identity__email=raihanakirar@gmail.com"
  },
  {
    imgSrc: "https://api.badgr.io/public/assertions/F3DXgr2ASo6gKsehTTwGNA/image",
    alt: "Badge IoT Project",
    title: "Internet of Things (IoT) Project - Building Health Monitoring System (Gold)",
    issuer: "Skilvul",
    issued: "Jul 2024",
    expires: "Jul 2026",
    credentialId: "HauI9sNWR5-xTMS1S9yLRQ",
    credentialUrl: "https://badgr.com/public/assertions/F3DXgr2ASo6gKsehTTwGNA?identity__email=raihanakirar@gmail.com"
  },
  {
    imgSrc: "https://api.badgr.io/public/assertions/9nCwzkSnSbS1Ou4CREIXqw/image",
    alt: "Badge ESP32",
    title: "IoT Development with ESP32 (Gold)",
    issuer: "Skilvul",
    issued: "Jul 2024",
    expires: "Jul 2026",
    credentialId: "9nCwzkSnSbS1Ou4CREIXqw",
    credentialUrl: "https://badgr.com/public/assertions/9nCwzkSnSbS1Ou4CREIXqw?identity__email=raihanakirar@gmail.com"
  },
  {
    imgSrc: "https://api.badgr.io/public/assertions/URCNVBe3Tf6N5QhpHltJyw/image",
    alt: "Badge IoT Fundamental",
    title: "Internet of Things (IoT) - Fundamentals (Gold)",
    issuer: "Skilvul",
    issued: "Apr 2024",
    expires: "Apr 2026",
    credentialId: "URCNVBe3Tf6N5QhpHltJyw",
    credentialUrl: "https://badgr.com/public/assertions/URCNVBe3Tf6N5QhpHltJyw?identity__email=raihanakirar@gmail.com"
  },
  {
    imgSrc: "https://api.badgr.io/public/assertions/VeaBDw2ATxuXqmU1Eh_ksw/image",
    alt: "Badge Algo Python",
    title: "Algorithm & Data Structures with Python (Gold)",
    issuer: "Skilvul",
    issued: "Mar 2024",
    expires: "Mar 2026",
    credentialId: "VeaBDw2ATxuXqmU1Eh_ksw",
    credentialUrl: "https://badgr.com/public/assertions/VeaBDw2ATxuXqmU1Eh_ksw?identity__email=raihanakirar@gmail.com"
  },
  {
    imgSrc: "https://api.badgr.io/public/assertions/hlO0oJqHSvqThwLi_mgN0Q/image",
    alt: "Badge Python Dasar",
    title: "Python Dasar (Gold)",
    issuer: "Skilvul",
    issued: "Mar 2024",
    expires: "Mar 2026",
    credentialId: "hlO0oJqHSvqThwLi_mgN0Q",
    credentialUrl: "https://badgr.com/public/assertions/hlO0oJqHSvqThwLi_mgN0Q?identity__email=raihanakirar@gmail.com"
  },
  {
    imgSrc: "https://api.badgr.io/public/assertions/2K-EC9L7QcyOlK4nxI19Bw/image",
    alt: "Badge Python Lanjutan",
    title: "Python Lanjutan (Gold)",
    issuer: "Skilvul",
    issued: "Mar 2024",
    expires: "Mar 2026",
    credentialId: "2K-EC9L7QcyOlK4nxI19Bw",
    credentialUrl: "https://badgr.com/public/assertions/2K-EC9L7QcyOlK4nxI19Bw?identity__email=raihanakirar@gmail.com"
  }
];

export function useCertificates() {
  return { certificates };
}
