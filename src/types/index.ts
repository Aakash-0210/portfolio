export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full Stack' | 'Frontend';
  description: string;
  longDescription: string;
  featured: boolean;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  features: string[];
  challenges: string;
  solution: string;
  architectureDetails: {
    layer: string;
    details: string;
  }[];
  links: {
    github: string;
    demo?: string;
    apiDocs?: string;
  };
  gradient: string;
  bannerVisual: 'crypto' | 'chat' | 'laundry' | 'ecommerce';
}

export interface Skill {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools';
  level: number; // 1-100
  experience: string;
  highlights: string[];
  iconName: string;
  accentColor: string;
}

export interface RoadmapMilestone {
  step: number;
  yearOrPhase: string;
  title: string;
  subtitle: string;
  description: string;
  skillsAcquired: string[];
  milestoneProject: string;
  status: 'completed' | 'in-progress' | 'future';
  icon: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techUsed: string[];
  iconName: string;
  accentGradient: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrContext: string;
  avatar: string;
  quote: string;
  relation: string;
  highlightTag: string;
  rating: number;
}

export interface Achievement {
  metric: string;
  value: number;
  suffix: string;
  title: string;
  description: string;
  icon: string;
}
