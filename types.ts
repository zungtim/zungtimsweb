export interface NavItem {
  label: string;
  href: string;
}

export interface EducationData {
  school: string;
  degree: string;
  date: string;
  evaluation?: string;
  courses: string[];
  achievements?: string[];
  gpa?: number;
  ranking?: { rank: number; total: number }[];
}

export interface ResearchData {
  title: string;
  role: string;
  date: string;
  description?: string;
  work?: string;
  result?: string;
}

export interface CompetitionData {
  name: string;
  role: string;
  award: string;
  date: string;
  organizer: string;
  level: 'National' | 'Provincial' | 'Municipal';
}

export interface TravelData {
  year: number;
  season: string;
  location: string;
  memory: string;
}