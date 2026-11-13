export interface Profile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  avatar_url?: string | null;
  location: string;
  email: string;
  phone?: string | null;
  available_for_work: boolean;
  resume_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  icon: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string | null;
  duration: string;
  description: string[];
  skills?: string[];
  display_order: number;
  created_at?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live_url?: string | null;
  github_url?: string | null;
  image_url?: string | null;
  featured: boolean;
  date: string;
  display_order: number;
  created_at?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location?: string | null;
  coursework?: string;
  highlights: string[];
  display_order: number;
  created_at?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url?: string | null;
  certificate_id?: string | null;
  display_order: number;
  created_at?: string;
}

export type HighlightCategory = 'Competitions' | 'Leadership' | 'Events' | 'Achievements' | string;

export interface Highlight {
  id: string;
  title: string;
  organization: string;
  category: HighlightCategory;
  year: string;
  description?: string | null;
  badge?: string | null;
  url?: string | null;
  display_order: number;
  created_at?: string;
}

export interface PortfolioData {
  profile: Profile;
  socials: SocialLink[];
  experiences: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
  highlights: Highlight[];
}
