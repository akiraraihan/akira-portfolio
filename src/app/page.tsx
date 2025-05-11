"use client"
import Image from "next/image";
import ScrollFloat from "./components/ScrollFloat";
import SplitText from "./components/SplitText";
import AnimatedContent from "./components/AnimatedContent";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-10 mt-10">
        <SplitText
          text="Welcome, My Honored Guests!"
          className="text-4xl text-black font-bold tracking-tighter"
          delay={150}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />        
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
          <Image src="https://raw.githubusercontent.com/akiraraihaan/self-sources/refs/heads/main/WA98638.jpg" alt="logo" width={256} height={256} className="rounded-full h-[256px] w-[256px] object-cover" />
        </AnimatedContent>
      </div>    
      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.03}
        textClassName="font-extrabold tracking-tighter"
      >
        reactbits
      </ScrollFloat>
    </>
  );
}
