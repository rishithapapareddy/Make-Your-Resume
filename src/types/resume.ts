export interface ResumeData {
  header: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  objective: string;
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
  skills: string[];
  internships: {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    date: string;
  }[];
}

export const defaultResumeData: ResumeData = {
  header: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
  },
  objective: '',
  education: [],
  skills: [],
  internships: [],
  projects: [],
  achievements: [],
};

export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  isPremium: boolean;
  style: 'modern' | 'classic' | 'creative' | 'minimal' | 'professional' | 'elegant';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const templates: Template[] = [
  {
    id: 'modern-1',
    name: 'Modern Professional',
    description: 'Clean and modern design perfect for tech roles',
    image: '/templates/modern-1.png',
    isPremium: false,
    style: 'modern',
    colors: { primary: '#4A7C59', secondary: '#E8B4BC', accent: '#2D4A3E' },
  },
  {
    id: 'classic-1',
    name: 'Classic Elegance',
    description: 'Timeless design for corporate positions',
    image: '/templates/classic-1.png',
    isPremium: false,
    style: 'classic',
    colors: { primary: '#2C3E50', secondary: '#ECF0F1', accent: '#1A252F' },
  },
  {
    id: 'creative-1',
    name: 'Creative Spark',
    description: 'Stand out with this vibrant design',
    image: '/templates/creative-1.png',
    isPremium: false,
    style: 'creative',
    colors: { primary: '#E74C3C', secondary: '#FFF5F5', accent: '#C0392B' },
  },
  {
    id: 'minimal-1',
    name: 'Minimal Clean',
    description: 'Simple and elegant for any industry',
    image: '/templates/minimal-1.png',
    isPremium: false,
    style: 'minimal',
    colors: { primary: '#333333', secondary: '#FAFAFA', accent: '#666666' },
  },
  {
    id: 'professional-1',
    name: 'Executive Pro',
    description: 'Premium design for senior positions',
    image: '/templates/professional-1.png',
    isPremium: true,
    style: 'professional',
    colors: { primary: '#1E3A5F', secondary: '#F5F7FA', accent: '#0D1F30' },
  },
  {
    id: 'elegant-1',
    name: 'Elegant Grace',
    description: 'Sophisticated design with fine details',
    image: '/templates/elegant-1.png',
    isPremium: true,
    style: 'elegant',
    colors: { primary: '#8B5A2B', secondary: '#FFF8F0', accent: '#5C3D1E' },
  },
  {
    id: 'modern-2',
    name: 'Tech Forward',
    description: 'Cutting-edge design for IT professionals',
    image: '/templates/modern-2.png',
    isPremium: false,
    style: 'modern',
    colors: { primary: '#6366F1', secondary: '#EEF2FF', accent: '#4F46E5' },
  },
  {
    id: 'creative-2',
    name: 'Bold Statement',
    description: 'Make an impact with bold colors',
    image: '/templates/creative-2.png',
    isPremium: true,
    style: 'creative',
    colors: { primary: '#F59E0B', secondary: '#FFFBEB', accent: '#D97706' },
  },
  {
    id: 'minimal-2',
    name: 'Swiss Minimal',
    description: 'Typography-focused Swiss design',
    image: '/templates/minimal-2.png',
    isPremium: false,
    style: 'minimal',
    colors: { primary: '#111827', secondary: '#F9FAFB', accent: '#374151' },
  },
  {
    id: 'professional-2',
    name: 'Corporate Edge',
    description: 'Sharp design for business leaders',
    image: '/templates/professional-2.png',
    isPremium: true,
    style: 'professional',
    colors: { primary: '#059669', secondary: '#ECFDF5', accent: '#047857' },
  },
  {
    id: 'elegant-2',
    name: 'Refined Classic',
    description: 'Timeless elegance meets modern touch',
    image: '/templates/elegant-2.png',
    isPremium: false,
    style: 'elegant',
    colors: { primary: '#7C3AED', secondary: '#F5F3FF', accent: '#6D28D9' },
  },
  {
    id: 'modern-3',
    name: 'Gradient Flow',
    description: 'Dynamic gradient design for creatives',
    image: '/templates/modern-3.png',
    isPremium: true,
    style: 'modern',
    colors: { primary: '#EC4899', secondary: '#FDF2F8', accent: '#DB2777' },
  },
];
