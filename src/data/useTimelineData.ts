// src/data/useTimelineData.ts

export type OrgExperience = {
  date: string;
  title: string;
  org: string;
  color: string;
  titleColor: string;
  orgColor: string;
  desc: string;
};

export type WorkExperience = {
  date: string;
  title: string;
  org: string;
  color: string;
  titleColor: string;
  orgColor: string;
  desc: string;
};

export type NotableAchievement = {
  date: string;
  title: string;
  color: string;
  titleColor: string;
  desc: string;
};

export function useTimelineData() {
  const orgExperiences: OrgExperience[] = [
    {
      date: "Dec 2024 - Present",
      title: "Vice President",
      org: "Computer Science Student Association (HMIK)",
      color: "from-[#83DDCB] to-[#67AEFF]",
      titleColor: "text-[#83DDCB]",
      orgColor: "text-[#67AEFF]",
      desc: "Leadership and organizational management at the university level."
    },
    {
      date: "Oct 2023 - Oct 2024",
      title: "Project Leader",
      org: "CITE UP 2024",
      color: "from-[#67AEFF] to-[#97FFA4]",
      titleColor: "text-[#67AEFF]",
      orgColor: "text-[#97FFA4]",
      desc: "Leading a major faculty-level project, managing teams and event execution with national scale."
    },
    {
      date: "Oct 2023 - Feb 2024",
      title: "Head of Creative Team Coordinator",
      org: "MIRAI Islamic Festival",
      color: "from-[#97FFA4] to-[#83DDCB]",
      titleColor: "text-[#97FFA4]",
      orgColor: "text-[#83DDCB]",
      desc: "Handled creative content and visual design for an islamic campus-scale event."
    },
    {
      date: "Dec 2023 - Dec 2024",
      title: "Staff of Academy UP",
      org: "Computer Science Student Association (HMIK)",
      color: "from-[#83DDCB] to-[#67AEFF]",
      titleColor: "text-[#83DDCB]",
      orgColor: "text-[#67AEFF]",
      desc: "Supporting academic programs and student development in computer science."
    },
    {
      date: "Aug 2020 - Aug 2021",
      title: "Vice President",
      org: "Student Council (OSIS) - Senior High School",
      color: "from-[#97FFA4] to-[#83DDCB]",
      titleColor: "text-[#97FFA4]",
      orgColor: "text-[#83DDCB]",
      desc: "Leadership, event management, and student representation at school level."
    },
  ];

  const workExperiences: WorkExperience[] = [
    {
      date: "Sep 2025 - Present",
      title: "Software Engineer/IT Intern",
      org: "PT. Pertamina Maintenance and Construction",
      color: "from-[#67AEFF] to-[#97FFA4]",
      titleColor: "text-[#67AEFF]",
      orgColor: "text-[#97AEFF]",
      desc: "Developing and maintaining software solutions."
    },
    {
      date: "Jul 2024 - Present",
      title: "Intern Junior Developer",
      org: "Academic Information System, Universitas Pertamina",
      color: "from-[#67AEFF] to-[#97FFA4]",
      titleColor: "text-[#67AEFF]",
      orgColor: "text-[#97FFA4]",
      desc: "Developing and maintaining academic information systems for the university and its clients."
    },
    {
      date: "Aug 2024 - Jan 2025",
      title: "Practical Assistant for Data Structures and Algorithms",
      org: "Universitas Pertamina",
      color: "from-[#83DDCB] to-[#67AEFF]",
      titleColor: "text-[#83DDCB]",
      orgColor: "text-[#67AEFF]",
      desc: "Guided students in understanding and implementing data structures and algorithms."
    },
    {
      date: "Jan 2023 - Apr 2023",
      title: "Practical Assistant for Basic Programming",
      org: "Universitas Pertamina",
      color: "from-[#97FFA4] to-[#83DDCB]",
      titleColor: "text-[#97FFA4]",
      orgColor: "text-[#83DDCB]",
      desc: "Assisted students in learning basic programming concepts and practicals."
    },
  ];

  const notableAchievements: NotableAchievement[] = [
    {
      date: "2024",
      title: "3rd Champion of Perisma 2024: MFQ",
      color: "from-[#97FFA4] to-[#83DDCB]",
      titleColor: "text-[#97FFA4]",
      desc: "3rd place in MFQ competition (religious field)."
    },
    {
      date: "2023/2024",
      title: "Finalist of Samsung Innovation Campus: AI Innovation",
      color: "from-[#83DDCB] to-[#67AEFF]",
      titleColor: "text-[#83DDCB]",
      desc: "Finalist in AI-based technology competition."
    },
    {
      date: "2024",
      title: "Semi-Finalist of X-Project 2024 'Informatics Championship'",
      color: "from-[#67AEFF] to-[#97FFA4]",
      titleColor: "text-[#67AEFF]",
      desc: "Reached semifinals in UI/UX Design competition."
    },
    {
      date: "2024",
      title: "CITE UP 2024 - Project Leader",
      color: "from-[#97FFA4] to-[#83DDCB]",
      titleColor: "text-[#97FFA4]",
      desc: "Led a significant national scaled faculty-level project."
    },
    {
      date: "2024",
      title: "MIRAI Islamic Festival - Head of Creative Team Coordinator",
      color: "from-[#83DDCB] to-[#67AEFF]",
      titleColor: "text-[#83DDCB]",
      desc: "Handled members for build and manage visual and creative content for a campus-scale event."
    },
  ];

  return { orgExperiences, workExperiences, notableAchievements };
}
