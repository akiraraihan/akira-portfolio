// src/data/githubProjects.ts
export interface GithubProject {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  repo: string;
  liveUrl?: string; // Optional live demo URL
  img: string;
  height: number;
}

export const githubProjects: GithubProject[] = [
  {
    id: "halal-lens",
    name: "Halal Lens",
    description: "Halal Lens is a cross-platform mobile application built with Flutter that helps users quickly identify halal products. The app features barcode scanning and text recognition to streamline the process of checking product ingredients, and utilizes Firebase for backend services and data management. Supporting Android and iOS platforms, Halal Lens provides a user-friendly interface and access to a comprehensive database of products and ingredients.",
    techStack: ["Flutter", "Dart", "Firebase", "OCR", "QR"],
    repo: "https://github.com/akiraraihaan/Halal_Lens",
    img: "/images/halal-lens.png",
    height: 400,
  },
  {
    id: "gg-blogs-nextjs",
    name: "GG Blogs (Next.js)",
    description: "A modern blog platform built with Next.js, TypeScript, and Prisma, featuring a clean admin dashboard for managing posts, categories, and tags. The application supports user authentication via NextAuth, allowing secure access to admin features. It includes a rich text editor for post creation, newsletter subscription functionality, and dynamic content sections such as featured and latest posts.",
    techStack: ["Next.js", "TypeScript", "Prisma", "React", "Tailwind CSS", "PostgreSQL"],
    repo: "https://github.com/akiraraihaan/GG-blogs-nextjs",
    img: "/images/blogs-nextjs.png",
    height: 250,
  },
  {
    id: "csdev-deploy-mm",
    name: "Money Management (CS Dev)",
    description: "Money Management is a personal finance web application built with Laravel, designed to help users manage their wallets, track income and expenses, and view real-time financial summaries through an intuitive dashboard. The app features wallet and transaction management, personalized user onboarding, and interactive UI elements such as modals and animated statistics. This project also serves as core teaching material for my role as a mentor in the CS Dev program.",
    techStack: ["Laravel", "PHP", "Bootstrap", "MySQL", "Vite"],
    repo: "https://github.com/akiraraihaan/csdev-deploy-MM",
    liveUrl: "https://csdev-deploy-mm-production.up.railway.app/",
    img: "/images/MM.png",
    height: 250,
  },
  {
    id: "edubridge",
    name: "EduBridge",
    description: "This project is a college assignment designed to facilitate educational processes through a web-based platform. It integrates various features to support learning activities, such as user management, course materials, and interactive components. The application incorporates a local AI chat feature powered by the free tier of Gemini, which operates smoothly and enhances user interaction by providing intelligent responses and support within the platform.",
    techStack: ["Laravel", "PHP", "CSS", "Tailwind CSS", "JavaScript", "MySQL"],
    repo: "https://github.com/akiraraihaan/EduBridge",
    liveUrl: "https://edubridge-production.up.railway.app/home",
    img: "/images/edu-bridge (1).png",
    height: 250,
  },
  {
    id: "scholarship-evaluation-system",
    name: "Scholarship Evaluation System - Universitas Pertamina",
    description: "I contributed to the development and maintenance of a Laravel-based scholarship management system, focusing on implementing new features and fixing bugs. My work involved enhancing modules related to awardee data, scholarships, and user management, as well as improving backend logic and user experience. I collaborated with the team to ensure code quality, scalability, and reliability, supporting the platform's goal of efficiently managing scholarship programs.",
    techStack: ["Laravel", "PHP", "PostgreSQL", "JavaScript"],
    repo: "https://github.com/akiraraihaan/quiz_app",
    img: "/images/seb-1.png",
    height: 250,
  },
  {
    id: "io-web",
    name: "International Office - Universitas Pertamina (Inbound/Outbound Student Portal)",
    description: "This project is a comprehensive web application developed from scratch using the Laravel PHP framework, featuring a modular structure with well-organized models, controllers, and views, as well as modern frontend tooling with Vite and Tailwind CSS. I initially built the entire system independently, handling both backend and frontend development. As the project grew, I received support from several team members, transforming the development process from a solo effort into a collaborative team project.",
    techStack: ["Laravel", "PHP", "PostgreSQL", "Vite", "Tailwind CSS", "JavaScript", "Node.js"],
    repo: "https://github.com/akiraraihaan/IO-web",
    img: "/images/io-2.png",
    height: 250,
  },
  {
    id: "gg-pomodoro",
    name: "Pomodoro Timer",
    description: "This project is a modern Pomodoro timer web application built using React and Vite, styled with Tailwind CSS for a clean and responsive user interface. It allows users to manage their productivity by timing focused work sessions and breaks, following the Pomodoro technique. The application features a visually appealing design, real-time countdown functionality, and interactive controls for starting, pausing, and resetting the timer. This project showcases my ability to build practical, user-friendly productivity tools using the latest web technologies.",
    techStack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    repo: "https://github.com/akiraraihaan/GG-pomodoro",
    liveUrl: "https://gg-pomodoro.vercel.app", // Example live URL
    img: "/images/pomodoro.png",
    height: 250,
  },
];
