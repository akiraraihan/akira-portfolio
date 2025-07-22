// src/data/githubProjects.ts
export interface GithubProject {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  repo: string;
  img: string;
  height: number;
}

export const githubProjects: GithubProject[] = [
  {
    id: "halal-lens",
    name: "Halal Lens",
    description: "A mobile app to scan and check halal status of products using OCR and barcode, built with Flutter.",
    techStack: ["Flutter", "Dart", "Firebase", "OCR", "REST API"],
    repo: "https://github.com/akiraraihaan/Halal_Lens",
    img: "https://picsum.photos/id/1015/600/900?grayscale",
    height: 400,
  },
  {
    id: "gg-blogs-nextjs",
    name: "GG Blogs (Next.js)",
    description: "A modern blog platform with authentication, markdown editor, and responsive UI using Next.js and MongoDB.",
    techStack: ["Next.js", "React", "MongoDB", "TailwindCSS", "TypeScript"],
    repo: "https://github.com/akiraraihaan/GG-blogs-nextjs",
    img: "https://picsum.photos/id/1011/600/750?grayscale",
    height: 250,
  },
  {
    id: "csdev-deploy-mm",
    name: "CSDev Deploy MM",
    description: "A deployment management tool for CSDev projects, automating CI/CD pipelines and monitoring.",
    techStack: ["Node.js", "Express", "CI/CD", "Docker", "MongoDB"],
    repo: "https://github.com/akiraraihaan/csdev-deploy-MM",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    height: 600,
  },
  {
    id: "gg-pomodoro",
    name: "GG Pomodoro",
    description: "A productivity timer app implementing the Pomodoro technique, with analytics and notifications.",
    techStack: ["React", "TypeScript", "TailwindCSS", "Vite"],
    repo: "https://github.com/akiraraihaan/GG-pomodoro",
    img: "https://picsum.photos/id/1024/600/800?grayscale",
    height: 350,
  },
  {
    id: "kuis-3-kriptografi",
    name: "Kuis 3 Kriptografi",
    description: "A cryptography quiz app for learning and testing cryptographic concepts, built for academic purposes.",
    techStack: ["Python", "Flask", "HTML", "CSS", "JavaScript"],
    repo: "https://github.com/akiraraihaan/kuis-3-kriptografi",
    img: "https://picsum.photos/id/1025/600/900?grayscale",
    height: 500,
  },
  {
    id: "io-web",
    name: "IO Web",
    description: "A web platform for IO (Informatics Olympiad) training, featuring problem sets and user progress tracking.",
    techStack: ["React", "Next.js", "Firebase", "TailwindCSS"],
    repo: "https://github.com/akiraraihaan/IO-web",
    img: "https://picsum.photos/id/1035/600/700?grayscale",
    height: 300,
  },
  {
    id: "edubridge",
    name: "EduBridge",
    description: "A platform connecting students with mentors and educational resources, supporting chat and scheduling.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    repo: "https://github.com/akiraraihaan/EduBridge",
    img: "https://picsum.photos/id/1036/600/700?grayscale",
    height: 300,
  },
  {
    id: "quiz-app",
    name: "Quiz App",
    description: "A simple quiz application with multiple categories, scoring, and timer features.",
    techStack: ["React", "JavaScript", "CSS"],
    repo: "https://github.com/akiraraihaan/quiz_app",
    img: "https://picsum.photos/id/1037/600/700?grayscale",
    height: 300,
  },
];
