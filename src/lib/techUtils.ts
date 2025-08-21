import { skills } from "@/data/skills";

// Helper function to get skill icon by tech name
export const getTechIcon = (techName: string) => {
  // Exact match only - case insensitive
  const skill = skills.find(skill => {
    return skill.label.toLowerCase() === techName.toLowerCase();
  });
  return skill;
};
