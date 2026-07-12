export interface SocialLinks {
  email: string;
  linkedin: string;
  github: string;
}

export interface Profile {
  name: string;
  initials: string;
  currentRole: string;
  targetRole: string;
  oneLiner: string;
  aboutText: string;
  resumeUrl: string;
  strengths: string[];
  socials: SocialLinks;
  profilePicture: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
  achievements: string[];
  highlights?: string[];
  summary?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'professional' | 'academic' | 'learning';
}

export interface TechSkill {
  name: string;
  level?: 'Advanced' | 'Intermediate' | 'Familiar';
  isTransitionFocus?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: TechSkill[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  techBadges: string[];
  githubUrl: string;
  liveUrl?: string;
  status: 'Production' | 'Active Development' | 'Prototype' | 'Coming Soon';
  architecturePoints: string[];
}
