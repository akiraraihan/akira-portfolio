"use client"
import Image from "next/image";
import Link from "next/link";
import { Menu, X as XIconLucide } from "lucide-react";
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
import { useCertificates } from "@/data/certificates";
import CertificateCard from "@/components/CertificateCard";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { DATA, handleAnimationComplete, handleAnimationComplete2 } from "./components/pageHooks";
import { Particles } from "@/components/magicui/Particles";
import JourneyPhotoCarousel from "./components/JourneyPhotoCarousel";

import CardSwap, { Card } from "./components/reactbits/CardSwap";
import { githubProjects } from "@/data/githubProjects";
import Footer from "@/components/Footer";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

// Helper function to get skill icon by tech name
const getTechIcon = (techName: string) => {
  // Exact match only - case insensitive
  const skill = skills.find(skill => {
    return skill.label.toLowerCase() === techName.toLowerCase();
  });
  return skill;
};

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { orgExperiences, workExperiences, notableAchievements } = useTimelineData();
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const { certificates } = useCertificates();
  const [isMobile, setIsMobile] = useState(false);
  const [headerLoaded, setHeaderLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Collapsible state for all timelines
  const [openOrgz, setOpenOrgz] = useState<number | null>(null);
  const [openWork, setOpenWork] = useState<number | null>(null);
  const [openNotable, setOpenNotable] = useState<number | null>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    if (elementId === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const element = document.getElementById(elementId);
    if (element) {
      // Use getBoundingClientRect for more accurate positioning with complex layouts
      const rect = element.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = Math.max(0, rect.top + currentScrollY - 120);
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
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

  useEffect(() => { setIsClient(true); }, []);


  // Build Masonry items from GitHub projects
  const masonryItems = githubProjects.map((proj) => ({
    id: proj.id,
    img: proj.img,
    url: proj.repo,
    height: proj.height,
    content: (
      <div className="flex flex-col h-full justify-between p-3">
        <div>
          <h3 className="text-lg font-bold text-black mb-1">{proj.name}</h3>
          <p className="text-xs text-gray-700 mb-2 line-clamp-3">{proj.description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {proj.techStack.map((tech) => (
              <span key={tech} className="bg-gray-200 text-gray-800 text-[10px] px-2 py-0.5 rounded-full font-semibold">{tech}</span>
            ))}
          </div>
        </div>
        <a
          href={proj.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block px-3 py-1 bg-black text-white text-xs rounded-lg font-semibold shadow hover:bg-gray-800 transition"
        >
          View Repo
        </a>
      </div>
    ),
  }));

  return (
    <>
      {!headerLoaded && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white transition-opacity duration-700 w-screen h-screen overflow-hidden m-0 p-0">
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
                className="z-50 relative"
              />
            </div>
          </div>
        </div>
      </AnimatedContent>
      <AnimatedContent distance={100} direction="vertical" animateOpacity threshold={0.2}>
        {/* hero sec */}
        <div id="about" className="relative flex justify-center mt-2 sm:mt-4 md:mt-8 h-auto min-h-[480px] sm:h-[320px] md:h-[280px]">
          {/* Particles background for hero section */}
          <div className="absolute inset-x-0 top-0 bottom-0 w-full h-full min-h-full pointer-events-none hidden sm:block z-10">
            {/*
              Particles component props:
              - className: string | undefined
              - quantity: number (default: 100)
              - staticity: number (default: 50)
              - ease: number (default: 50)
              - size: number (default: 0.4)
              - refresh: boolean (default: false)
              - color: string (default: #ffffff)
              - vx: number (default: 0)
              - vy: number (default: 0)
            */}
            <Particles
              quantity={100}
              staticity={25}
              ease={30}
              size={0.8}
              refresh={false}
              color="#000000"
              vx={0}
              vy={0}
            />
          </div>
          <div className="block sm:hidden w-full px-4 overflow-hidden z-10">
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
                  src="/images/formal-square-2.png" 
                  alt="logo" 
                  width={180} 
                  height={180} 
                  priority
                  className="rounded-[80px] shadow-2xl h-[180px] w-[180px] object-cover" 
                />
              </AnimatedContent>
              
              <div className="mt-6 w-full px-4 max-w-full mb-6">
                <BlurText
                  text="&emsp;I'm Raihan Akira Rahmaputra, a Computer Science student with a lifelong passion for technology and innovation. Whether organizing nationwide digital events, building practical systems, or engaging in design and AI competitions, I thrive at the intersection of creativity, logic, and leadership. My aspiration is to become a tech leader who not only develops impactful solutions but also inspires others to create meaningful change."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete2}
                  className="text-sm text-gray-700 text-balance"
                />
              </div>
            </div>
          </div>
          
          {/* Tablet and Desktop Layout - improved responsive flex, centered */}
          <div className="hidden sm:flex w-full max-w-6xl mx-auto items-center justify-center px-8 gap-8 md:gap-16 z-10">
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
                  text="&emsp;I'm Raihan Akira Rahmaputra, a Computer Science student with a lifelong passion for technology and innovation. Whether organizing nationwide digital events, building practical systems, or engaging in design and AI competitions, I thrive at the intersection of creativity, logic, and leadership. My aspiration is to become a tech leader who not only develops impactful solutions but also inspires others to create meaningful change."
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
                  src="/images/formal-square-2.png" 
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
        {/* Shimmer Buttons Row - Centered, below hero section */}
        <div className="flex justify-center items-center gap-6">
          <a href="https://drive.google.com/file/d/1C1bXqz-QyDVXaEBxuLL82UqExvM2Bz5N/view?usp=sharing" className="block">
            <ShimmerButton>CV Here</ShimmerButton>
          </a>
          <p className="text-xl text-gray-400">|</p>
          <a href="https://drive.google.com/drive/folders/1TYJYP6Cre_EhiWT8WvqheMTBRSjVt5N_?usp=sharing" className="block">
            <ShimmerButton>Portfolio Here</ShimmerButton>
          </a>
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
                          {item.href.startsWith('#') ? (
                            <button
                              onClick={() => smoothScrollTo(item.href.substring(1))}
                              aria-label={item.label}
                              className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "size-10 sm:size-12 rounded-full"
                              )}
                            >
                              <item.icon className="size-4" />
                            </button>
                          ) : (
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
                          )}
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
        <div id="tech-stack" className="relative mt-2 sm:mt-12 mb-8 overflow-hidden">
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
          {/* Flex container for photos, experiences, and certifications */}
          <div className="w-full flex flex-col md:flex-row gap-2 md:gap-4 items-stretch justify-center px-0 md:px-4">
            {/* Left empty column */}
            <div className="hidden md:block md:w-1/8"></div>
            {/* Experiences section: 4/8 on desktop */}
            <div id="experiences" className="w-full md:w-4/8">
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
                  Orgz and Experiences
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
                              <AnimatedContent
                                key={idx}
                                distance={40}
                                direction="vertical"
                                animateOpacity
                                threshold={0.2}
                                delay={idx * 80}
                              >
                                <div className="relative flex items-center min-h-[64px]">
                                  {/* Dot dan Card */}
                                  <div className="absolute -left-9 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-0 z-20">
                                    <div className={`w-3 h-3 bg-gradient-to-r ${exp.color} rounded-full border-2 border-black shadow-lg animate-pulse-timeline`}></div>
                                  </div>
                                  <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow transition-all w-full z-10">
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
                                      <span className={`ml-2 transition-transform duration-300 ${openOrgz === idx ? 'rotate-90' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline align-middle">
                                          <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                      </span>
                                    </button>
                                    <div
                                      className={`overflow-hidden transition-all duration-300 px-4 ${openOrgz === idx ? 'max-h-32 py-1' : 'max-h-0 py-0'}`}
                                      style={{color: '#e5e7eb'}}>
                                      <p className="text-xs text-gray-200">{exp.desc}</p>
                                    </div>
                                  </div>
                                </div>
                              </AnimatedContent>
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
                              <AnimatedContent
                                key={idx}
                                distance={40}
                                direction="vertical"
                                animateOpacity
                                threshold={0.2}
                                delay={idx * 80}
                              >
                                <div className="relative flex items-center min-h-[64px]">
                                  {/* Dot dan Card */}
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
                                      <span className={`ml-2 transition-transform duration-300 ${openWork === idx ? 'rotate-90' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline align-middle">
                                          <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                      </span>
                                    </button>
                                    <div
                                      className={`overflow-hidden transition-all duration-300 px-4 ${openWork === idx ? 'max-h-32 py-1' : 'max-h-0 py-0'}`}
                                      style={{color: '#e5e7eb'}}>
                                      <p className="text-xs text-gray-200">{exp.desc}</p>
                                    </div>
                                  </div>
                                </div>
                              </AnimatedContent>
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
                              <AnimatedContent
                                key={idx}
                                distance={40}
                                direction="vertical"
                                animateOpacity
                                threshold={0.2}
                                delay={idx * 80}
                              >
                                <div className="relative flex items-center min-h-[64px]">
                                  {/* Dot dan Card */}
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
                                      <span className={`ml-2 transition-transform duration-300 ${openNotable === idx ? 'rotate-90' : ''}`}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline align-middle">
                                          <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                      </span>
                                    </button>
                                    <div
                                      className={`overflow-hidden transition-all duration-300 px-4 ${openNotable === idx ? 'max-h-32 py-1' : 'max-h-0 py-0'}`}
                                      style={{color: '#e5e7eb'}}>
                                      <p className="text-xs text-gray-200">{exp.desc}</p>
                                    </div>
                                  </div>
                                </div>
                              </AnimatedContent>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Certifications section: 2/8 on desktop */}
            <div id="licenses" className="w-full md:w-2/8 flex flex-col justify-start">
              <div className="relative w-full max-w-2xl mx-auto px-2 mb-16 md:mb-0"> {/* max-w-2xl & px-2, mb-16 lebih kecil */}
                <div className="bg-white rounded-3xl py-4 px-2 border sm:px-4 h-full flex flex-col"> {/* py-4 px-2 sm:px-4 lebih kecil */}
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
            {/* Right empty column */}
            <div className="hidden md:block md:w-1/8"></div>
          </div>
        </div>
      </AnimatedContent>
      {/* END Certification Section */}      {/* Journey & Showcase Section */}
      <section className="w-full max-w-6xl mx-auto mt-12 sm:mt-24 px-2 sm:px-4">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-start sm:mb-24">
          {/* Kiri: Slider Foto Journey */}
          <div className="w-full md:w-1/2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 tracking-tight text-black text-center md:text-left w-fit mx-auto">Journey Documentations</h2>
            <JourneyPhotoCarousel
              images={[
                "/images/IMG_0992.JPEG.jpg",
                "/images/rpl.jpg",
                "/images/IMG_7687.JPG",
                "/images/all-2.jpg",
                "/images/cu23.jpg",
                "/images/FGRI5728.JPG",
                "/images/IMG_0492.JPG",
                "/images/gedungbaru.jpg",
                "/images/kemejaputih.jpg",
                "/images/mfq-perisma24.jpg",
                "/images/openhouse-cs.jpg",
                "/images/sic-batch5.jpg",
                "/images/panit-mif.jpg",
                "/images/usability-test.jpg",
                "/images/WA98638.jpg",
                "/images/mobile_last.jpeg"
              ]}
              baseWidth={isMobile ? 320 : 480}
              autoplay={true}
              autoplayDelay={3500}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>          {/* Kanan: Showcase Project (CardSwap) */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-black text-center md:text-left w-fit mx-auto">Featured Projects</h2>
            </div>
            {/* Project Showcase CardSwap Container */}
            <div className="relative w-full max-w-[400px] h-[280px] sm:h-[320px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-20 h-20 border border-gray-600 rounded-full"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 border border-gray-600 rounded-lg rotate-45"></div>
                <div className="absolute top-1/2 left-4 w-8 h-8 bg-gray-700 rounded-full"></div>
              </div>
              
              {/* Header in Container */}
              <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-400 font-medium">Live Projects</span>
                </div>
              </div>              {/* CardSwap positioned to be cut off */}
              <div className="absolute -bottom-8 -right-8 w-[120%] h-[120%] flex items-end justify-center">                <CardSwap
                cardDistance={isMobile ? 35 : 50}
                verticalDistance={isMobile ? 40 : 60}
                delay={3000}
                pauseOnHover={true}
                width={isMobile ? 340 : 320}
                height={isMobile ? 240 : 240}
                easing="elastic"
              >
                {/* Card 1 */}
                <Card>
                  <div className="relative flex flex-col items-center justify-start h-full p-0 rounded-2xl shadow-2xl border border-black bg-[#0a0a0d] overflow-hidden" style={{boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)'}}>
                    {/* Header */}
                    <div className="absolute top-0 left-0 w-full flex items-center gap-2 px-4 py-2 border-b border-[#222] bg-[#111114] rounded-t-2xl z-10">
                      <span className="w-2 h-2 bg-[#fff] rounded-full border border-[#444] mr-2"></span>
                      <span className="text-xs text-white font-semibold tracking-wide">Reliable</span>
                    </div>
                    {/* Image Full Card */}
                    <Image
                      src="/images/edu-bridge (1).png"
                      alt="EduBridge Project"
                      fill
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </Card>
                {/* Card 2 */}
                <Card>
                  <div className="relative flex flex-col items-center justify-start h-full p-0 rounded-2xl shadow-2xl border border-black bg-[#0a0a0d] overflow-hidden" style={{boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)'}}>
                    {/* Header */}
                    <div className="absolute top-0 left-0 w-full flex items-center gap-2 px-4 py-2 border-b border-[#222] bg-[#111114] rounded-t-2xl z-10">
                      <span className="w-2 h-2 bg-[#fff] rounded-full border border-[#444] mr-2"></span>
                      <span className="text-xs text-white font-semibold tracking-wide">Customizable</span>
                    </div>
                    <Image
                      src="/images/io-1.png"
                      alt="IO Project"
                      fill
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </Card>
                {/* Card 3 */}
                <Card>
                  <div className="relative flex flex-col items-center justify-start h-full p-0 rounded-2xl shadow-2xl border border-black bg-[#0a0a0d] overflow-hidden" style={{boxShadow: '0 8px 32px 0 rgba(0,0,0,0.45)'}}>
                    {/* Header */}
                    <div className="absolute top-0 left-0 w-full flex items-center gap-2 px-4 py-2 border-b border-[#222] bg-[#111114] rounded-t-2xl z-10">
                      <span className="w-2 h-2 bg-[#fff] rounded-full border border-[#444] mr-2"></span>
                      <span className="text-xs text-white font-semibold tracking-wide">Smooth</span>
                    </div>
                    <Image
                      src="/images/seb-2.png"
                      alt="SEB Project"
                      fill
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </Card>
              </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Masonry Section */}
      <section id="projects" className="w-full max-w-6xl mx-auto px-2 sm:px-4 min-h-[400px] overflow-visible">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-black text-center mb-8">Project Gallery</h2>
        <div className="bg-[#000000] rounded-2xl p-4">
          {isClient && (
            <>
              {/* Custom Masonry grid for 2/3 columns and row variety */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {masonryItems.map((item, idx) => {
                  // Find the project for this card
                  const proj = githubProjects.find(p => p.id === item.id);
                  // Tall card for mobile projects (portrait), else normal
                  const isMobileProject = proj && proj.techStack.some(t => t.toLowerCase().includes('flutter') || t.toLowerCase().includes('dart'));
                  const isTall = isMobileProject || (idx % 4 === 0);
                  return (
                    <div
                      key={item.id}
                      className={
                        `flex flex-col h-full w-full rounded-2xl overflow-visible shadow-xl bg-white border border-gray-200 max-w-full transition-all duration-300` +
                        (isTall ? ' md:row-span-2 md:min-h-[420px]' : ' min-h-[260px] md:min-h-[320px]')
                      }
                    >
                      {/* Image container - flexible for mobile apps */}
                      <div className={
                        'flex flex-col items-center px-5 pt-6 pb-0 ' + 
                        (isTall ? 'flex-1' : '')
                      }>
                        <div className={
                          'w-full flex items-center justify-center ' +
                          (isTall ? 'flex-1 min-h-[200px]' : 'aspect-[4/3] md:aspect-[4/3] h-[120px] md:h-[160px]')
                        }>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.img}
                            alt={proj?.name || item.id}
                            className={
                              'rounded-2xl border border-gray-100 shadow w-full bg-gray-100 ' +
                              (isTall ? 'object-contain h-full max-h-full' : 'object-cover h-full')
                            }
                            style={{ background: '#f3f3f3' }}
                          />
                        </div>
                      </div>
                      {/* Content grows, button sticks to bottom */}
                      <div className="flex flex-col flex-1 px-5 pt-4 pb-0">
                        <h3 className="text-base md:text-lg font-bold text-black mb-1 leading-tight line-clamp-2" style={{wordBreak:'break-word'}}>{proj?.name || item.id}</h3>
                        <p className="text-xs md:text-sm text-gray-700 mb-2 line-clamp-3" style={{wordBreak:'break-word'}}>{proj?.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {proj?.techStack.map((tech) => {
                            const skillIcon = getTechIcon(tech);
                            return (
                              <div key={tech} className="flex items-center space-x-1 bg-gray-100 text-gray-800 text-[10px] px-2 py-1 rounded-full font-semibold  border-gray-200">
                                {skillIcon && (
                                  <Image 
                                    src={skillIcon.imgSrc} 
                                    alt={skillIcon.alt} 
                                    className="w-3 h-3" 
                                    width={12} 
                                    height={12} 
                                  />
                                )}
                                <span>{tech}</span>
                              </div>
                            );
                          })}
                        </div>
                        {/* Spacer to push button to bottom if content is short */}
                        <div className="flex-1" />
                        <a
                          href={proj?.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 mb-4 inline-block px-3 py-1 bg-black text-white text-xs rounded-lg font-semibold shadow hover:bg-gray-800 transition w-fit"
                        >
                          View Repo
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
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
              item.href.startsWith('#') ? (
                <button
                  key={item.label}
                  onClick={() => {
                    smoothScrollTo(item.href.substring(1));
                    toggleMobileMenu();
                  }}
                  className="flex items-center space-x-3 p-4 hover:bg-gray-100 border-b border-gray-100 text-left w-full"
                >
                  <item.icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 p-4 hover:bg-gray-100 border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  <item.icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
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
      
      {/* Footer Section */}
      <div id="contact">
        <Footer />
      </div>
    </>
  );
}
