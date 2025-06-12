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

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 1200 1227"
    fill="currentColor"
  >
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 438.549 438.549"
    fill="currentColor"
  >
    <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const handleAnimationComplete2 = () => {
  console.log('Animation completed!');
};

const DATA = {
  navbar: [
    { href: "#", icon: Home, label: "Home" },
    { href: "#about", icon: User, label: "About" },
    { href: "#projects", icon: Briefcase, label: "Projects" },
    { href: "#contact", icon: Mail, label: "Contact" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/akiraraihaan",
        icon: GitHubIcon,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/raihan-akira-r-6a76b6294/",
        icon: LinkedInIcon,
      },
      X: {
        name: "X",
        url: "https://x.com/calmotionz",
        icon: XIcon,
      },
      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/raihaan_ar",
        icon: InstagramIcon,
      },
    },
  },
};

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { orgExperiences, workExperiences, notableAchievements } = useTimelineData();
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const { certificates } = useCertificates();

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

  return (
    <>
      <div className="relative mx-2 my-3">
        {/* header bar */}
        <div className="sticky top-0 w-full h-[64px] bg-black flex flex-row items-center justify-between px-4 sm:px-8 z-50 rounded-3xl">
          <div>
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
          className={`absolute bottom-16 right-0 bg-[#F8F8FF] rounded-lg shadow-xl w-64 overflow-hidden transition-all duration-300 ease-in-out transform ${
            mobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
          style={{
            transformOrigin: 'bottom right',
            maxHeight: mobileMenuOpen ? '80vh' : '0'
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

      {/* hero sec */}
      <div className="relative flex justify-center mt-2 sm:mt-4 md:mt-8 h-auto min-h-[500px] sm:h-[350px] md:h-[300px]">
        <div className="block sm:hidden w-full px-4 overflow-hidden">
          {/* Mobile layout */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-6">
              <div className="inline-flex items-center flex-wrap justify-center">
                <SplitText
                  text="Welcome, My Honored"
                  className="text-2xl sm:text-3xl text-black font-bold tracking-tighter"
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
                  mainClassName="text-2xl sm:text-3xl text-white font-bold tracking-tighter px-2 bg-black overflow-hidden py-0.5 justify-center rounded-lg ml-1"
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
        
        {/* Tablet and Desktop Layout - similar to original */}
        <div className="hidden sm:block">
          <div className="absolute left-[20%] top-1/2 transform -translate-y-1/2">
            <div className="inline-flex items-center">
              <SplitText
                text="Welcome, My Honored"
                className="text-3xl md:text-4xl text-black font-bold tracking-tighter"
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
                mainClassName="text-3xl md:text-4xl text-white font-bold tracking-tighter px-2 bg-black overflow-hidden py-0.5 justify-center rounded-lg ml-1"
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
          <div className="absolute right-[20%] top-1/2 transform -translate-y-1/2">
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
      
      {/* Skills Marquee Section */}
      <div className="relative mt-8 sm:mt-12 mb-8 overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 tracking-tighter">Tech Stack & Tools</h2>
          <p className="text-gray-600 text-sm sm:text-base">I work with</p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {/* Single Row Marquee for All Skills */}
          <Marquee pauseOnHover className="[--duration:180s] mb-2">
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
      
      <div className="relative mt-4 sm:mt-20 mb-10 sm:mb-20 flex flex-col items-center">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          textClassName="font-extrabold tracking-tighter text-center text-4xl md:text-5xl lg:text-6xl mb-6"
        >
          Orgz and Experiences
        </ScrollFloat>

        {/* Flex container for experiences and certifications */}
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-6 items-stretch justify-center px-0 md:px-4">
          {/* Experiences section: 2/3 on desktop */}
          <div className="w-full md:w-2/3">
            <div className="w-full relative mt-2 sm:mt-4 mb-12 sm:mb-20 px-4">
              {/* Simple rounded card design with Aurora */}
              <div className="w-full bg-black text-white relative overflow-hidden shadow-xl rounded-3xl">
                {/* Aurora effect with responsive opacity */}
                <div className="absolute inset-0 opacity-30 sm:opacity-30">
                  <Aurora
                    colorStops={["#97FFA4", "#83DDCB", "#67AEFF"]}
                    blend={0.3}
                    amplitude={0.8}
                    speed={0.4}
                  />
                </div>
                <div className="max-w-6xl mx-auto px-4 relative z-10 pt-12 pb-16 sm:pt-16 sm:pb-20">
                  <p className="text-lg mt-2 mb-12 text-white text-center">
                    My journey through organizations, experiences, and professional growth
                  </p>
                  
                  {/* Timeline Container */}
                  <div className="relative">
                    {/* Section: Organizational Experiences */}
                    <div className="mb-20">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#97FFA4] mb-2 text-center">Organizational Experiences</h3>
                      <p className="text-center text-gray-300 mb-8">Leadership, teamwork, and organizational growth</p>
                      <div className="relative flex w-full max-w-2xl mx-auto">
                        {/* Vertical line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#97FFA4] via-[#83DDCB] to-[#67AEFF] z-0" style={{borderRadius: '9999px'}}></div>
                        <div className="flex flex-col gap-4 w-full pl-16">
                          {orgExperiences.map((exp, idx) => (
                            <div key={idx} className="relative flex items-center min-h-[88px]">
                              {/* Dot perfectly centered vertically, always above card using z-20 */}
                              <div className="absolute -left-14 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-0 z-20">
                                <div className={`w-5 h-5 bg-gradient-to-r ${exp.color} rounded-full border-4 border-black shadow-lg animate-pulse-timeline`}></div>
                              </div>
                              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg transition-all w-full z-10">
                                <button
                                  className="w-full flex items-center justify-between px-6 py-4 focus:outline-none group"
                                  onClick={() => setOpenOrgz(openOrgz === idx ? null : idx)}
                                  aria-expanded={openOrgz === idx}
                                >
                                  <div className="flex flex-col text-left">
                                    <span className={`text-sm font-semibold text-black bg-gradient-to-r ${exp.color} px-2 py-0.5 rounded mb-1 w-fit`}>{exp.date}</span>
                                    <span className="text-lg font-bold text-[#97FFA4]">{exp.title}</span>
                                    <span className="text-[#67AEFF] text-sm font-medium">{exp.org}</span>
                                  </div>
                                  <span className={`ml-4 transition-transform ${openOrgz === idx ? 'rotate-90' : ''}`}>▶</span>
                                </button>
                                <div
                                  className={`overflow-hidden transition-all duration-300 px-6 ${openOrgz === idx ? 'max-h-40 py-2' : 'max-h-0 py-0'}`}
                                  style={{color: '#e5e7eb'}}
                                >
                                  <p className="text-sm text-gray-200">{exp.desc}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Section: Work Experiences */}
                    <div className="mb-20">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#67AEFF] mb-2 text-center">Work Experiences</h3>
                      <p className="text-center text-gray-300 mb-8">Professional and teaching roles</p>
                      <div className="relative flex w-full max-w-2xl mx-auto">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#97FFA4] via-[#83DDCB] to-[#67AEFF] z-0" style={{borderRadius: '9999px'}}></div>
                        <div className="flex flex-col gap-4 w-full pl-16">
                          {workExperiences.map((exp, idx) => (
                            <div key={idx} className="relative flex items-center min-h-[88px]">
                              {/* Dot perfectly centered vertically, always above card using z-20 */}
                              <div className="absolute -left-14 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-0 z-20">
                                <div className={`w-5 h-5 bg-gradient-to-r ${exp.color} rounded-full border-4 border-black shadow-lg animate-pulse-timeline`}></div>
                              </div>
                              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg transition-all w-full z-10">
                                <button
                                  className="w-full flex items-center justify-between px-6 py-4 focus:outline-none group"
                                  onClick={() => setOpenWork(openWork === idx ? null : idx)}
                                  aria-expanded={openWork === idx}
                                >
                                  <div className="flex flex-col text-left">
                                    <span className={`text-sm font-semibold text-black bg-gradient-to-r ${exp.color} px-2 py-0.5 rounded mb-1 w-fit`}>{exp.date}</span>
                                    <span className="text-lg font-bold text-[#67AEFF]">{exp.title}</span>
                                    <span className="text-[#97AEFF] text-sm font-medium">{exp.org}</span>
                                  </div>
                                  <span className={`ml-4 transition-transform ${openWork === idx ? 'rotate-90' : ''}`}>▶</span>
                                </button>
                                <div
                                  className={`overflow-hidden transition-all duration-300 px-6 ${openWork === idx ? 'max-h-40 py-2' : 'max-h-0 py-0'}`}
                                  style={{color: '#e5e7eb'}}
                                >
                                  <p className="text-sm text-gray-200">{exp.desc}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Section: Notable Projects & Achievements */}
                    <div className="mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#83DDCB] mb-2 text-center">Notable Projects & Achievements</h3>
                      <p className="text-center text-gray-300 mb-8">Highlights and recognitions</p>
                      <div className="relative flex w-full max-w-2xl mx-auto">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#97FFA4] via-[#83DDCB] to-[#67AEFF] z-0" style={{borderRadius: '9999px'}}></div>
                        <div className="flex flex-col gap-4 w-full pl-16">
                          {notableAchievements.map((exp, idx) => (
                            <div key={idx} className="relative flex items-center min-h-[88px]">
                              {/* Dot perfectly centered vertically, always above card using z-20 */}
                              <div className="absolute -left-14 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-0 z-20">
                                <div className={`w-5 h-5 bg-gradient-to-r ${exp.color} rounded-full border-4 border-black shadow-lg animate-pulse-timeline`}></div>
                              </div>
                              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg transition-all w-full z-10">
                                <button
                                  className="w-full flex items-center justify-between px-6 py-4 focus:outline-none group"
                                  onClick={() => setOpenNotable(openNotable === idx ? null : idx)}
                                  aria-expanded={openNotable === idx}
                                >
                                  <div className="flex flex-col text-left">
                                    <span className={`text-sm font-semibold text-black bg-gradient-to-r ${exp.color} px-2 py-0.5 rounded mb-1 w-fit`}>{exp.date}</span>
                                    <span className="text-lg font-bold text-[#83DDCB]">{exp.title}</span>
                                  </div>
                                  <span className={`ml-4 transition-transform ${openNotable === idx ? 'rotate-90' : ''}`}>▶</span>
                                </button>
                                <div
                                  className={`overflow-hidden transition-all duration-300 px-6 ${openNotable === idx ? 'max-h-40 py-2' : 'max-h-0 py-0'}`}
                                  style={{color: '#e5e7eb'}}
                                >
                                  <p className="text-sm text-gray-200">{exp.desc}</p>
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
          <div className="w-full md:w-1/3 flex flex-col justify-start">
            <div className="relative w-full max-w-7xl mx-auto px-4 mb-24 md:mb-0">
              <div className="bg-white rounded-3xl shadow-xl py-12 px-4 sm:px-8 h-full flex flex-col">
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 text-center tracking-tighter">Licenses & Certifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                  {(showAllCertificates || certificates.length <= 3
                    ? certificates
                    : certificates.slice(0, 3)
                  ).map((cert, idx) => (
                    <CertificateCard key={cert.credentialId + idx} cert={cert} />
                  ))}
                </div>
                {certificates.length > 3 && !showAllCertificates && (
                  <div className="flex justify-center mt-6">
                    <PulsatingButton onClick={() => setShowAllCertificates(true)}>
                      Show More
                    </PulsatingButton>
                  </div>
                )}
                {certificates.length > 3 && showAllCertificates && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-6 py-2 rounded-lg bg-neutral-200 text-neutral-900 font-semibold shadow hover:bg-neutral-300 transition"
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
      {/* END Certification Section */}
    </>
  );
}
