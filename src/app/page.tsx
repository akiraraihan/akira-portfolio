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
        <div className="sticky top-0 w-full h-[64px] bg-black shadow-md flex flex-row items-center justify-between px-4 sm:px-8 z-50 rounded-3xl">
          <div>
            <ShinyText 
              text="Personal Portfolio" 
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
          className={`absolute bottom-16 right-0 bg-white rounded-lg shadow-xl w-64 overflow-hidden transition-all duration-300 ease-in-out transform ${
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
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">Tech Stack & Skills</h2>
          <p className="text-gray-600 text-sm sm:text-base">Technologies I work with</p>
        </div>
        
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {/* Core Programming Languages */}
          <Marquee pauseOnHover className="[--duration:30s] mb-3">
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/python.svg" alt="Python" className="w-6 h-6" />
              <span className="text-blue-600 font-semibold">Python</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/javascript.svg" alt="JavaScript" className="w-6 h-6" />
              <span className="text-yellow-500 font-semibold">JavaScript</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/java.svg" alt="Java" className="w-6 h-6" />
              <span className="text-red-600 font-semibold">Java</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/c-plusplus.svg" alt="C++" className="w-6 h-6" />
              <span className="text-blue-700 font-semibold">C++</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/php.svg" alt="PHP" className="w-6 h-6" />
              <span className="text-purple-600 font-semibold">PHP</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/dart.svg" alt="Dart" className="w-6 h-6" />
              <span className="text-blue-500 font-semibold">Dart</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/powershell.svg" alt="PowerShell" className="w-6 h-6" />
              <span className="text-blue-600 font-semibold">PowerShell</span>
            </div>
          </Marquee>
          
          {/* Web Development */}
          <Marquee reverse pauseOnHover className="[--duration:35s] mb-3">
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/html5.svg" alt="HTML5" className="w-6 h-6" />
              <span className="text-orange-600 font-semibold">HTML5</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/css.svg" alt="CSS" className="w-6 h-6" />
              <span className="text-blue-600 font-semibold">CSS</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/react_light.svg" alt="React" className="w-6 h-6" />
              <span className="text-blue-500 font-semibold">React</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/nextjs_icon_dark.svg" alt="Next.js" className="w-6 h-6" />
              <span className="text-gray-900 font-semibold">Next.js</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/tailwindcss.svg" alt="Tailwind CSS" className="w-6 h-6" />
              <span className="text-teal-500 font-semibold">Tailwind CSS</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/bootstrap.svg" alt="Bootstrap" className="w-6 h-6" />
              <span className="text-purple-600 font-semibold">Bootstrap</span>
            </div>
          </Marquee>
          
          {/* Backend & Databases */}
          <Marquee pauseOnHover className="[--duration:28s] mb-3">
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/nodejs.svg" alt="Node.js" className="w-6 h-6" />
              <span className="text-green-600 font-semibold">Node.js</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/laravel.svg" alt="Laravel" className="w-6 h-6" />
              <span className="text-red-500 font-semibold">Laravel</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/mysql.svg" alt="MySQL" className="w-6 h-6" />
              <span className="text-blue-600 font-semibold">MySQL</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/postgresql.svg" alt="PostgreSQL" className="w-6 h-6" />
              <span className="text-blue-700 font-semibold">PostgreSQL</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/mongodb.svg" alt="MongoDB" className="w-6 h-6" />
              <span className="text-green-600 font-semibold">MongoDB</span>
            </div>
          </Marquee>
          
          {/* Data Science & AI */}
          <Marquee reverse pauseOnHover className="[--duration:32s] mb-3">
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/numpy.svg" alt="NumPy" className="w-6 h-6" />
              <span className="text-blue-600 font-semibold">NumPy</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-6 h-6 bg-blue-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="text-blue-800 font-semibold">Pandas</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span className="text-green-600 font-semibold">Matplotlib</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/tensorflow.svg" alt="TensorFlow" className="w-6 h-6" />
              <span className="text-orange-600 font-semibold">TensorFlow</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">CV</span>
              </div>
              <span className="text-blue-700 font-semibold">OpenCV</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 208" className="w-6 h-6"><path d="M205.3 31.4c14 14.8 20 35.2 22.5 63.6 6.6 0 12.8 1.5 17 7.2l7.8 10.6c2.2 3 3.4 6.6 3.4 10.4v28.7a12 12 0 0 1-4.8 9.5C215.9 187.2 172.3 208 128 208c-49 0-98.2-28.3-123.2-46.6a12 12 0 0 1-4.8-9.5v-28.7c0-3.8 1.2-7.4 3.4-10.5l7.8-10.5c4.2-5.7 10.4-7.2 17-7.2 2.5-28.4 8.4-48.8 22.5-63.6C77.3 3.2 112.6 0 127.6 0h.4c14.7 0 50.4 2.9 77.3 31.4ZM128 78.7c-3 0-6.5.2-10.3.6a27.1 27.1 0 0 1-6 12.1 45 45 0 0 1-32 13c-6.8 0-13.9-1.5-19.7-5.2-5.5 1.9-10.8 4.5-11.2 11-.5 12.2-.6 24.5-.6 36.8 0 6.1 0 12.3-.2 18.5 0 3.6 2.2 6.9 5.5 8.4C79.9 185.9 105 192 128 192s48-6 74.5-18.1a9.4 9.4 0 0 0 5.5-8.4c.3-18.4 0-37-.8-55.3-.4-6.6-5.7-9.1-11.2-11-5.8 3.7-13 5.1-19.7 5.1a45 45 0 0 1-32-12.9 27.1 27.1 0 0 1-6-12.1c-3.4-.4-6.9-.5-10.3-.6Zm-27 44c5.8 0 10.5 4.6 10.5 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.6-10.4 10.4-10.4Zm53.4 0c5.8 0 10.4 4.6 10.4 10.4v19.2a10.4 10.4 0 0 1-20.8 0V133c0-5.8 4.7-10.4 10.4-10.4Zm-73-94.4c-11.2 1.1-20.6 4.8-25.4 10-10.4 11.3-8.2 40.1-2.2 46.2A31.2 31.2 0 0 0 75 91.7c6.8 0 19.6-1.5 30.1-12.2 4.7-4.5 7.5-15.7 7.2-27-.3-9.1-2.9-16.7-6.7-19.9-4.2-3.6-13.6-5.2-24.2-4.3Zm69 4.3c-3.8 3.2-6.4 10.8-6.7 19.9-.3 11.3 2.5 22.5 7.2 27a41.7 41.7 0 0 0 30 12.2c8.9 0 17-2.9 21.3-7.2 6-6.1 8.2-34.9-2.2-46.3-4.8-5-14.2-8.8-25.4-9.9-10.6-1-20 .7-24.2 4.3ZM128 56c-2.6 0-5.6.2-9 .5.4 1.7.5 3.7.7 5.7 0 1.5 0 3-.2 4.5 3.2-.3 6-.3 8.5-.3 2.6 0 5.3 0 8.5.3-.2-1.6-.2-3-.2-4.5.2-2 .3-4 .7-5.7-3.4-.3-6.4-.5-9-.5Z"/></svg>
              <span className="text-gray-800 font-semibold">GitHub Copilot</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/claude-ai-icon.svg" alt="Claude AI" className="w-6 h-6" />
              <span className="text-orange-500 font-semibold">Claude AI</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" width="256" height="260" preserveAspectRatio="xMidYMid" viewBox="0 0 256 260" className="w-6 h-6"><path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/></svg>
              <span className="text-gray-600 font-semibold">OpenAI</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" >
              <path d="M395.479 633.828L735.91 381.105C752.599 368.715 776.454 373.548 784.406 392.792C826.26 494.285 807.561 616.253 724.288 699.996C641.016 783.739 525.151 802.104 419.247 760.277L303.556 814.143C469.49 928.202 670.987 899.995 796.901 773.282C896.776 672.843 927.708 535.937 898.785 412.476L899.047 412.739C857.105 231.37 909.358 158.874 1016.4 10.6326C1018.93 7.11771 1021.47 3.60279 1024 0L883.144 141.651V141.212L395.392 633.916" fill="#0A0A0A"/>
              <path d="M325.226 695.251C206.128 580.84 226.662 403.776 328.285 301.668C403.431 226.097 526.549 195.254 634.026 240.596L749.454 186.994C728.657 171.88 702.007 155.623 671.424 144.2C533.19 86.9942 367.693 115.465 255.323 228.382C147.234 337.081 113.244 504.215 171.613 646.833C215.216 753.423 143.739 828.818 71.7385 904.916C46.2237 931.893 20.6216 958.87 0 987.429L325.139 695.339" fill="#0A0A0A"/>
              </svg>
              <span className="text-gray-700 font-semibold">Grok AI</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/groq.svg" alt="Groq" className="w-6 h-6" />
              <span className="text-orange-700 font-semibold">Groq</span>
            </div>
          </Marquee>
          
          {/* Tools & Design */}
          <Marquee pauseOnHover className="[--duration:25s]">
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/git.svg" alt="Git" className="w-6 h-6" />
              <span className="text-orange-600 font-semibold">Git</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#1B1F23"/>
              </svg>
              <span className="text-gray-900 font-semibold">GitHub</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/docker.svg" alt="Docker" className="w-6 h-6" />
              <span className="text-blue-600 font-semibold">Docker</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/figma.svg" alt="Figma" className="w-6 h-6" />
              <span className="text-purple-600 font-semibold">Figma</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/photoshop.svg" alt="Photoshop" className="w-6 h-6" />
              <span className="text-blue-600 font-semibold">Photoshop</span>
            </div>
            <div className="mx-3 flex items-center space-x-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <img src="https://svgl.app/library/notion.svg" alt="Notion" className="w-6 h-6" />
              <span className="text-gray-800 font-semibold">Notion</span>
            </div>
          </Marquee>
          
          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
        </div>
      </div>
      
      <div className="relative mt-4 sm:mt-20 mb-20 sm:mb-40 flex flex-col items-center">
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
        
        <div className="w-full relative mt-2 sm:mt-4 mb-[500px] sm:mb-[800px] px-4">
          {/* Simple rounded card design with Aurora */}
          <div className="w-full bg-black text-white relative overflow-hidden shadow-xl rounded-3xl">
            {/* Aurora effect with responsive opacity */}
            <div className="absolute inset-0 opacity-30 sm:opacity-55">
              <Aurora
                colorStops={["#97FFA4", "#83DDCB", "#67AEFF"]}
                blend={0.3}
                amplitude={0.8}
                speed={0.4}
              />
            </div>
            <div className="max-w-4xl mx-auto px-4 relative z-10 pt-12 pb-16 sm:pt-16 sm:pb-20">
              <p className="text-lg mt-2 mb-12 text-white text-center">
                My journey through organizations, experiences, and professional growth
              </p>
              
              {/* Timeline Container */}
              <div className="relative">
                {/* Main Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#97FFA4] via-[#83DDCB] to-[#67AEFF] hidden md:block"></div>
                
                {/* Mobile Timeline Line */}
                <div className="absolute left-8 w-0.5 h-full bg-gradient-to-b from-[#97FFA4] via-[#83DDCB] to-[#67AEFF] md:hidden"></div>
                
                {/* Timeline Items */}
                <div className="space-y-12">
                  {/* Timeline Item 1 - Right side on desktop */}
                  <div className="relative flex flex-col md:flex-row items-center">
                    {/* Mobile Layout */}
                    <div className="md:hidden w-full pl-16">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gradient-to-r from-[#97FFA4] to-[#83DDCB] text-black px-3 py-1 rounded-full text-sm font-semibold">
                            Jan 2024 - Present
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#97FFA4] mb-1">Computer Science Student</h3>
                        <p className="text-[#83DDCB] font-medium mb-2">Universitas Pertamina</p>
                        <p className="text-gray-300 text-sm">
                          Pursuing Bachelor's degree in Computer Science with focus on software development, 
                          AI technologies, and system design. Active in various tech competitions and projects.
                        </p>
                      </div>
                    </div>
                    
                    {/* Desktop Layout - Right Side */}
                    <div className="hidden md:flex md:w-1/2"></div>
                    <div className="hidden md:flex md:w-1/2 md:justify-start md:pl-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-gradient-to-r from-[#97FFA4] to-[#83DDCB] text-black px-3 py-1 rounded-full text-sm font-semibold">
                            Jan 2024 - Present
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#97FFA4] mb-1">Computer Science Student</h3>
                        <p className="text-[#83DDCB] font-medium mb-3">Universitas Pertamina</p>
                        <p className="text-gray-300 text-sm">
                          Pursuing Bachelor's degree in Computer Science with focus on software development, 
                          AI technologies, and system design. Active in various tech competitions and projects.
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-[#97FFA4] rounded-full border-4 border-black shadow-lg"></div>
                  </div>

                  {/* Timeline Item 2 - Left side on desktop */}
                  <div className="relative flex flex-col md:flex-row items-center">
                    {/* Mobile Layout */}
                    <div className="md:hidden w-full pl-16">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gradient-to-r from-[#83DDCB] to-[#67AEFF] text-black px-3 py-1 rounded-full text-sm font-semibold">
                            Mar 2024 - Dec 2024
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#83DDCB] mb-1">Event Organizer & Tech Lead</h3>
                        <p className="text-[#67AEFF] font-medium mb-2">National Digital Events</p>
                        <p className="text-gray-300 text-sm">
                          Led national-scale digital events, coordinating teams and implementing tech solutions. 
                          Managed event platforms and participant engagement systems.
                        </p>
                      </div>
                    </div>
                    
                    {/* Desktop Layout - Left Side */}
                    <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-gradient-to-r from-[#83DDCB] to-[#67AEFF] text-black px-3 py-1 rounded-full text-sm font-semibold">
                            Mar 2024 - Dec 2024
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#83DDCB] mb-1">Event Organizer & Tech Lead</h3>
                        <p className="text-[#67AEFF] font-medium mb-3">National Digital Events</p>
                        <p className="text-gray-300 text-sm">
                          Led national-scale digital events, coordinating teams and implementing tech solutions. 
                          Managed event platforms and participant engagement systems.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:flex md:w-1/2"></div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-[#83DDCB] rounded-full border-4 border-black shadow-lg"></div>
                  </div>

                  {/* Timeline Item 3 - Right side on desktop */}
                  <div className="relative flex flex-col md:flex-row items-center">
                    {/* Mobile Layout */}
                    <div className="md:hidden w-full pl-16">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gradient-to-r from-[#67AEFF] to-[#97FFA4] text-black px-3 py-1 rounded-full text-sm font-semibold">
                            2023 - 2024
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#67AEFF] mb-1">Design & AI Competitor</h3>
                        <p className="text-[#97FFA4] font-medium mb-2">Various Competitions</p>
                        <p className="text-gray-300 text-sm">
                          Participated in design and AI challenges, developing innovative solutions and 
                          competing at national level competitions. Focus on UI/UX and machine learning projects.
                        </p>
                      </div>
                    </div>
                    
                    {/* Desktop Layout - Right Side */}
                    <div className="hidden md:flex md:w-1/2"></div>
                    <div className="hidden md:flex md:w-1/2 md:justify-start md:pl-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-gradient-to-r from-[#67AEFF] to-[#97FFA4] text-black px-3 py-1 rounded-full text-sm font-semibold">
                            2023 - 2024
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#67AEFF] mb-1">Design & AI Competitor</h3>
                        <p className="text-[#97FFA4] font-medium mb-3">Various Competitions</p>
                        <p className="text-gray-300 text-sm">
                          Participated in design and AI challenges, developing innovative solutions and 
                          competing at national level competitions. Focus on UI/UX and machine learning projects.
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-[#67AEFF] rounded-full border-4 border-black shadow-lg"></div>
                  </div>

                  {/* Timeline Item 4 - Left side on desktop */}
                  <div className="relative flex flex-col md:flex-row items-center">
                    {/* Mobile Layout */}
                    <div className="md:hidden w-full pl-16">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-gradient-to-r from-[#97FFA4] to-[#67AEFF] text-black px-3 py-1 rounded-full text-sm font-semibold">
                            2022 - 2023
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#97FFA4] mb-1">Systems Developer</h3>
                        <p className="text-[#83DDCB] font-medium mb-2">Real-world Projects</p>
                        <p className="text-gray-300 text-sm">
                          Developed real-world systems and applications, focusing on practical solutions 
                          for businesses and organizations. Experience with full-stack development.
                        </p>
                      </div>
                    </div>
                    
                    {/* Desktop Layout - Left Side */}
                    <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-8">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-gradient-to-r from-[#97FFA4] to-[#67AEFF] text-black px-3 py-1 rounded-full text-sm font-semibold">
                            2022 - 2023
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#97FFA4] mb-1">Systems Developer</h3>
                        <p className="text-[#83DDCB] font-medium mb-3">Real-world Projects</p>
                        <p className="text-gray-300 text-sm">
                          Developed real-world systems and applications, focusing on practical solutions 
                          for businesses and organizations. Experience with full-stack development.
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:flex md:w-1/2"></div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-[#83DDCB] rounded-full border-4 border-black shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
