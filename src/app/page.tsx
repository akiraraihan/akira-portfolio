"use client"
import Image from "next/image";
import Link from "next/link";
import { Home, User, Briefcase, Mail, Menu, X as XIconLucide } from "lucide-react";
import { useState, useEffect } from "react";
import ScrollFloat from "./components/reactbits/ScrollFloat";
import SplitText from "./components/reactbits/SplitText";
import AnimatedContent from "./components/reactbits/AnimatedContent";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { cn } from "@/lib/utils";
import ShinyText from "./components/reactbits/ShinyText";
import CircularText from "./components/reactbits/CircularText";
import RotatingText from "./components/reactbits/RotatingText";
import BlurText from "./components/reactbits/BlurText";
import Aurora from './components/reactbits/Aurora';
import { Marquee } from "@/components/magicui/marquee";
import SkillCard from "@/components/SkillCard";
import { skills } from "@/data/skills";
import { useTimelineData } from "@/data/useTimelineData";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { useCertificates } from "@/data/certificates";
import CertificateCard from "@/components/CertificateCard";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { XIcon, DATA, handleAnimationComplete, handleAnimationComplete2 } from "./components/pageHooks";

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { orgExperiences, workExperiences, notableAchievements } = useTimelineData();
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const { certificates } = useCertificates();
  const [isMobile, setIsMobile] = useState(false);
  const [headerLoaded, setHeaderLoaded] = useState(false);

  // Collapsible state for all timelines
  const [openOrgz, setOpenOrgz] = useState<number | null>(null);
  const [openWork, setOpenWork] = useState<number | null>(null);
  const [openNotable, setOpenNotable] = useState<number | null>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Check if window is defined (client-side)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind sm breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Splash screen hides when header is loaded
  useEffect(() => {
    if (headerLoaded) {
      document.body.style.overflow = '';
      document.body.style.position = '';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
    };
  }, [headerLoaded]);

  return (
    <>
      {!headerLoaded && (
        <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center bg-black text-white transition-opacity duration-700 h-screen w-screen min-h-screen min-w-screen overflow-hidden m-0 p-0">
          <div className="flex flex-col items-center gap-4">
            <Image src="/images/logo-porto.png" alt="AR Logo" width={60} height={60} className="rounded-full bg-white" />
            <span className="text-xl tracking-wide animate-pulse">Finding for miracle...</span>
          </div>
        </div>
      )}
      <AnimatedContent
        distance={100}
        direction="vertical"
        animateOpacity
        threshold={0.2}
      >
        <div className="relative mx-2 my-3">
          {/* header bar */}
          <div className="sticky top-0 w-full h-[64px] bg-black flex flex-row items-center justify-between px-4 sm:px-8 z-50 rounded-3xl">
            <div className="flex flex-row items-center gap-4">
              <Image
                src="/images/logo-porto.png"
                alt="AR Logo"
                width={40}
                height={40}
                className="rounded-full bg-white"
                priority
                onLoad={() => setHeaderLoaded(true)}
              />
              <ShinyText 
                text="Akira Raihan's Property" 
                disabled={false}
                speed={5}
              />
            </div>
            <div>
              <CircularText
                text="*EST*2025"
                onHover="pause"
                spinDuration={20}
              />
            </div>
          </div>
        </div>
      </AnimatedContent>
      <AnimatedContent distance={100} direction="vertical" animateOpacity threshold={0.2}>
        {/* hero sec */}
        <div className="relative flex justify-center mt-2 sm:mt-4 md:mt-8 h-auto min-h-[500px] sm:h-[350px] md:h-[300px]">
          <div className="block sm:hidden w-full px-4 overflow-hidden">
            {/* Mobile layout */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center mb-6">
                <div className="inline-flex items-center flex-wrap justify-center">
                  <SplitText
                    text="Welcome, My Honored"
                    className="text-2xl sm:text-3xl text-black font-bold tracking-tight"
                    delay={150}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                    onLetterAnimationComplete={handleAnimationComplete}
                  />
                  <RotatingText
                    texts={['Guests!', 'Visitors!', 'Friends!', 'Viewers!']}
                    mainClassName="text-2xl sm:text-3xl text-white font-bold tracking-tight px-2 bg-black overflow-hidden py-0.5 justify-center rounded-lg ml-1"
                    staggerFrom={"last"}
                    initial={{ y: "-100%" }}  
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3000}
                  />
                </div>
              </div>
              
              <AnimatedContent
                distance={250}
                direction="horizontal"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
              >
                <Image 
                  src="https://raw.githubusercontent.com/akiraraihaan/self-sources/refs/heads/main/WA98638.jpg" 
                  alt="logo" 
                  width={180} 
                  height={180} 
                  priority
                  className="rounded-full h-[180px] w-[180px] object-cover border-4 border-black" 
                />
              </AnimatedContent>
              
              <div className="mt-6 w-full px-4 max-w-full">
                <BlurText
                  text="&emsp;I'm Raihan Akira Rahmaputra. A computer science student with a lifelong passion for technology and innovation. From leading national-scale digital events to developing real-world systems and competing in design and AI challenges — I thrive in the intersection between creativity, logic, and leadership. I aspire to grow into a tech leader who not only builds solutions, but also empowers others to build with purpose."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete2}
                  className="text-sm mb-20 text-gray-700 text-balance"
                />
              </div>
            </div>
          </div>
          
          {/* Tablet and Desktop Layout - improved responsive flex, centered */}
          <div className="hidden sm:flex w-full max-w-6xl mx-auto items-center justify-center px-8 gap-8 md:gap-16">
            <div className="flex-1 min-w-0 max-w-xl">
              <div className="inline-flex items-center flex-wrap">
                <SplitText
                  text="Welcome, My Honored"
                  className="text-3xl md:text-4xl text-black font-bold tracking-tight"
                  delay={150}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  easing="easeOutCubic"
                  threshold={0.2}
                  rootMargin="-50px"
                  onLetterAnimationComplete={handleAnimationComplete}
                />
                <RotatingText
                  texts={['Guests!', 'Visitors!', 'Friends!', 'Viewers!']}
                  mainClassName="text-3xl md:text-4xl text-white font-bold tracking-tight px-2 bg-black overflow-hidden py-0.5 justify-center rounded-lg ml-1"
                  staggerFrom={"last"}
                  initial={{ y: "-100%" }}  
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
              </div>
              <div className="mt-6 max-w-[600px]">
                <BlurText
                  text="&emsp;I'm Raihan Akira Rahmaputra. A computer science student with a lifelong passion for technology and innovation. From leading national-scale digital events to developing real-world systems and competing in design and AI challenges — I thrive in the intersection between creativity, logic, and leadership. I aspire to grow into a tech leader who not only builds solutions, but also empowers others to build with purpose."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete2}
                  className="text-md mb-8 text-gray-700 text-balance"
                />
              </div>
            </div>
            <div className="flex-shrink-0 flex justify-center items-center">
              <AnimatedContent
                distance={250}
                direction="horizontal"
                reverse={false}
                config={{ tension: 80, friction: 20 }}
                initialOpacity={0.2}
                animateOpacity
                scale={1.1}
                threshold={0.2}
              >
                <Image 
                  src="https://raw.githubusercontent.com/akiraraihaan/self-sources/refs/heads/main/WA98638.jpg" 
                  alt="logo" 
                  width={256} 
                  height={256} 
                  priority
                  className="rounded-[80px] shadow-2xl h-[220px] w-[220px] md:h-[256px] md:w-[256px] object-cover" 
                />
              </AnimatedContent>
            </div>
          </div>
        </div>
      </AnimatedContent>
      <AnimatedContent distance={100} direction="vertical" animateOpacity threshold={0.2}>
        {/* Desktop Dock Navigation - hidden on small screens */}
        <div className="sticky top-0 z-20 mt-2 sm:mt-4 md:mt-8 hidden sm:block">
          <AnimatedContent
            distance={250}
            direction="vertical"
            reverse={true}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
          >        
            <div className="relative flex justify-center">
              <TooltipProvider>
                <Dock direction="top" className="bottom-0">
                  {DATA.navbar.map((item) => (
                    <DockIcon key={item.label}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            aria-label={item.label}
                            className={cn(
                              buttonVariants({ variant: "ghost", size: "icon" }),
                              "size-10 sm:size-12 rounded-full"
                            )}
                          >
                            <item.icon className="size-4" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </DockIcon>
                  ))}
                  <Separator orientation="vertical" className="h-6 sm:h-8" />
                  {Object.entries(DATA.contact.social).map(([name, social]) => (
                    <DockIcon key={name}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className={cn(
                              buttonVariants({ variant: "ghost", size: "icon" }),
                              "size-10 sm:size-12 rounded-full"
                            )}
                          >
                            <social.icon className="size-4" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </DockIcon>
                  ))}
                </Dock>
              </TooltipProvider>
            </div>
          </AnimatedContent>
        </div>      
      </AnimatedContent>
      <AnimatedContent distance={100} direction="vertical" animateOpacity threshold={0.2}>
        {/* Skills Marquee Section */}
        <div className="relative mt-8 sm:mt-12 mb-8 overflow-hidden">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 tracking-tight">Tech Stack & Tools</h2>
            <p className="text-gray-600 text-sm sm:text-base">I work with</p>
          </div>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            {/* Single Row Marquee for All Skills */}
            <Marquee pauseOnHover className="[--duration:60s] mb-2">
              {skills.map((skill, idx) => (
                <SkillCard key={skill.label + idx} imgSrc={skill.imgSrc} alt={skill.alt} label={skill.label} />
              ))}
              {/* Custom SVG/ReactNode skills can be added here if needed */}
            </Marquee>
            {/* Gradient overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
          </div>
        </div>
      </AnimatedContent>
      <AnimatedContent distance={100} direction="vertical" animateOpacity threshold={0.2}>
        <div className="relative mt-4 sm:mt-20 mb-10 sm:mb-20 flex flex-col items-center">
          {/* Flex container for experiences and certifications */}
          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-6 items-stretch justify-center px-0 md:px-4">
            {/* Experiences section: 2/3 on desktop */}
            <div id="experiences" className="w-full md:w-2/3">
              {/* Header khusus experiences */}
              <div className="flex justify-center">
                <ScrollFloat
                  animationDuration={1}
                  ease="back.inOut(2)"
                  scrollStart="center bottom+=50%"
                  scrollEnd="bottom bottom-=40%"
                  stagger={0.03}
                  textClassName="font-extrabold tracking-tight text-center text-2xl md:text-3xl lg:text-4xl mb-4" // lebih kecil
                >
                  Organizations and Experiences
                </ScrollFloat>
              </div>
              <div className="w-full relative mt-1 sm:mt-2 mb-8 sm:mb-12 px-2"> {/* margin dan padding lebih kecil */}
                {/* Simple rounded card design with Aurora */}
                <div className="w-full bg-black text-white relative overflow-hidden shadow-xl rounded-2xl"> {/* rounded dan shadow lebih kecil */}
                  {/* Aurora effect with responsive opacity */}
                  <div className="absolute inset-0 opacity-30 sm:opacity-30">
                    <Aurora
                      colorStops={["#97FFA4", "#83DDCB", "#67AEFF"]}
                      blend={0.3}
                      amplitude={0.8}
                      speed={0.4}
                    />
                  </div>
                  <div className="max-w-3xl mx-auto px-2 relative z-10 pt-6 pb-8 sm:pt-8 sm:pb-10"> {/* max-w, padding, dan spacing lebih kecil */}
                    <p className="text-base mt-1 mb-6 text-white text-center"> {/* font lebih kecil */}
                      My journey through organizations, experiences, and professional growth
                    </p>
                    
                    {/* Timeline Container */}
                    <div className="relative">
                      {/* Section: Organizational Experiences */}
                      <div className="mb-10"> {/* mb lebih kecil */}
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#97FFA4] mb-1 text-center">Organizational Experiences</h3>
                        <p className="text-center text-gray-300 mb-4 text-xs">Leadership, teamwork, and organizational growth</p>
                        <div className="relative flex w-full max-w-md mx-auto"> {/* max-w lebih kecil */}
                          {/* Vertical line */}
                          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#97FFA4] via-[#83DDCB] to-[#67AEFF] z-0" style={{borderRadius: '9999px'}}></div>
                          <div className="flex flex-col gap-2 w-full pl-12"> {/* gap dan padding lebih kecil */}
                            {orgExperiences.map((exp, idx) => (
                              <div key={idx} className="relative flex items-center min-h-[64px]"> {/* min-h lebih kecil */}
                                {/* Dot perfectly centered vertically, always above card using z-20 */}
                                <div className="absolute -left-9 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-0 z-20"> {/* ukuran dot lebih kecil */}
                                  <div className={`w-3 h-3 bg-gradient-to-r ${exp.color} rounded-full border-2 border-black shadow-lg animate-pulse-timeline`}></div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow transition-all w-full z-10"> {/* rounded dan shadow lebih kecil */}
                                  <button
                                    className="w-full flex items-center justify-between px-4 py-2 focus:outline-none group text-xs" // font dan padding lebih kecil
                                    onClick={() => setOpenOrgz(openOrgz === idx ? null : idx)}
                                    aria-expanded={openOrgz === idx}
                                  >
                                    <div className="flex flex-col text-left">
                                      <span className={`text-xs font-semibold text-black bg-gradient-to-r ${exp.color} px-1.5 py-0.5 rounded mb-1 w-fit`}>{exp.date}</span>
                                      <span className="text-base font-bold text-[#97FFA4]">{exp.title}</span>
                                      <span className="text-[#67AEFF] text-xs font-medium">{exp.org}</span>
                                    </div>
                                    <span className={`ml-2 transition-transform ${openOrgz === idx ? 'rotate-90' : ''}`}>▶</span>
                                  </button>
                                  <div
                                    className={`overflow-hidden transition-all duration-300 px-4 ${openOrgz === idx ? 'max-h-32 py-1' : 'max-h-0 py-0'}`}
                                    style={{color: '#e5e7eb'}}>
                                    <p className="text-xs text-gray-200">{exp.desc}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Section: Work Experiences */}
                      <div className="mb-10">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#97FFA4] mb-1 text-center">Work Experiences</h3>
                        <p className="text-center text-gray-300 mb-4 text-xs">Professional and teaching roles</p>
                        <div className="relative flex w-full max-w-md mx-auto">
                          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#97FFA4] via-[#83DDCB] to-[#67AEFF] z-0" style={{borderRadius: '9999px'}}></div>
                          <div className="flex flex-col gap-2 w-full pl-12">
                            {workExperiences.map((exp, idx) => (
                              <div key={idx} className="relative flex items-center min-h-[64px]">
                                {/* Dot perfectly centered vertically, always above card using z-20 */}
                                <div className="absolute -left-9 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-0 z-20">
                                  <div className={`w-3 h-3 bg-gradient-to-r ${exp.color} rounded-full border-2 border-black shadow-lg animate-pulse-timeline`}></div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow transition-all w-full z-10">
                                  <button
                                    className="w-full flex items-center justify-between px-4 py-2 focus:outline-none group text-xs"
                                    onClick={() => setOpenWork(openWork === idx ? null : idx)}
                                    aria-expanded={openWork === idx}
                                  >
                                    <div className="flex flex-col text-left">
                                      <span className={`text-xs font-semibold text-black bg-gradient-to-r ${exp.color} px-1.5 py-0.5 rounded mb-1 w-fit`}>{exp.date}</span>
                                      <span className="text-base font-bold text-[#97FFA4]">{exp.title}</span>
                                      <span className="text-[#67AEFF] text-xs font-medium">{exp.org}</span>
                                    </div>
                                    <span className={`ml-2 transition-transform ${openWork === idx ? 'rotate-90' : ''}`}>▶</span>
                                  </button>
                                  <div
                                    className={`overflow-hidden transition-all duration-300 px-4 ${openWork === idx ? 'max-h-32 py-1' : 'max-h-0 py-0'}`}
                                    style={{color: '#e5e7eb'}}>
                                    <p className="text-xs text-gray-200">{exp.desc}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Section: Notable Projects & Achievements */}
                      <div className="mb-2">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#83DDCB] mb-1 text-center">Notable Projects & Achievements</h3>
                        <p className="text-center text-gray-300 mb-4 text-xs">Highlights and recognitions</p>
                        <div className="relative flex w-full max-w-md mx-auto">
                          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#97FFA4] via-[#83DDCB] to-[#67AEFF] z-0" style={{borderRadius: '9999px'}}></div>
                          <div className="flex flex-col gap-2 w-full pl-12">
                            {notableAchievements.map((exp, idx) => (
                              <div key={idx} className="relative flex items-center min-h-[64px]">
                                {/* Dot perfectly centered vertically, always above card using z-20 */}
                                <div className="absolute -left-9 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-0 z-20">
                                  <div className={`w-3 h-3 bg-gradient-to-r ${exp.color} rounded-full border-2 border-black shadow-lg animate-pulse-timeline`}></div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow transition-all w-full z-10">
                                  <button
                                    className="w-full flex items-center justify-between px-4 py-2 focus:outline-none group text-xs"
                                    onClick={() => setOpenNotable(openNotable === idx ? null : idx)}
                                    aria-expanded={openNotable === idx}
                                  >
                                    <div className="flex flex-col text-left">
                                      <span className={`text-xs font-semibold text-black bg-gradient-to-r ${exp.color} px-1.5 py-0.5 rounded mb-1 w-fit`}>{exp.date}</span>
                                      <span className="text-base font-bold text-[#83DDCB]">{exp.title}</span>
                                    </div>
                                    <span className={`ml-2 transition-transform ${openNotable === idx ? 'rotate-90' : ''}`}>▶</span>
                                  </button>
                                  <div
                                    className={`overflow-hidden transition-all duration-300 px-4 ${openNotable === idx ? 'max-h-32 py-1' : 'max-h-0 py-0'}`}
                                    style={{color: '#e5e7eb'}}>
                                    <p className="text-xs text-gray-200">{exp.desc}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Certifications section: 1/3 on desktop */}
            <div id="licenses" className="w-full md:w-1/3 flex flex-col justify-start">
              <div className="relative w-full max-w-2xl mx-auto px-2 mb-16 md:mb-0"> {/* max-w-2xl & px-2, mb-16 lebih kecil */}
                <div className="bg-white rounded-3xl shadow-xl py-4 px-2 border sm:px-4 h-full flex flex-col"> {/* py-4 px-2 sm:px-4 lebih kecil */}
                  {/* Header khusus licence & certi, font lebih kecil dan ScrollFloat */}
                  <div className="flex justify-center">
                    <div className="flex justify-center items-center gap-2">
                      <ScrollFloat
                        animationDuration={1}
                        ease="back.inOut(2)"
                        scrollStart="center bottom+=50%"
                        scrollEnd="bottom bottom-=40%"
                        stagger={0.03}
                        textClassName="font-bold tracking-tight text-center text-lg sm:text-xl mb-1"
                      >
                        Licenses & Certifications
                      </ScrollFloat>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4"> {/* gap-4 lebih kecil */}
                    {(showAllCertificates || certificates.length <= (isMobile ? 2 : 3)
                      ? certificates
                      : certificates.slice(0, isMobile ? 2 : 6)
                    ).map((cert, idx) => (
                      <CertificateCard key={cert.credentialId + idx} cert={cert} small={true} />
                    ))}
                  </div>
                  {certificates.length > (isMobile ? 2 : 3) && !showAllCertificates && (
                    <div className="flex justify-center mt-4"> {/* mt-4 lebih kecil */}
                      <PulsatingButton href="/certificates">
                        Show More
                      </PulsatingButton>
                    </div>
                  )}
                  {certificates.length > (isMobile ? 2 : 3) && showAllCertificates && (
                    <div className="flex justify-center mt-2"> {/* mt-2 lebih kecil */}
                      <button
                        className="px-4 py-1.5 rounded-lg bg-neutral-200 text-neutral-900 font-semibold shadow hover:bg-neutral-300 transition text-sm" // font dan padding lebih kecil
                        onClick={() => setShowAllCertificates(false)}
                      >
                        Show Less
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedContent>
      {/* END Certification Section */}
      {/* Mobile Menu Button - visible only on small screens */}
      <div className="fixed bottom-4 right-4 z-50 sm:hidden">
        <button 
          onClick={toggleMobileMenu}
          className="bg-black text-white p-3 rounded-full shadow-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <XIconLucide size={24} /> : <Menu size={24} />}
        </button>
        {/* Mobile Menu as a small modal with animation */}
        <div 
          className={`absolute bottom-0 right-0 bg-[#F8F8FF] rounded-lg shadow-xl w-64 overflow-hidden transition-all duration-300 ease-in-out transform ${
            mobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
          style={{
            transformOrigin: 'bottom right',
            maxHeight: mobileMenuOpen ? '80vh' : '0',
            marginBottom: '64px' // agar menu muncul tepat di atas tombol burger
          }}
        >
          <div className="flex flex-col">
            {DATA.navbar.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center space-x-3 p-4 hover:bg-gray-100 border-b border-gray-100"
                onClick={toggleMobileMenu}
              >
                <item.icon className="size-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">Connect with me:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(DATA.contact.social).map(([name, social]) => (
                  <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={toggleMobileMenu}
                  >
                    <social.icon className="size-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
