import { ResumeData } from '@/types/resume';

// Simple text-based resume parser that extracts information from plain text
export const parseResumeText = (text: string): Partial<ResumeData> => {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  
  const result: Partial<ResumeData> = {
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

  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch && result.header) {
    result.header.email = emailMatch[0];
  }

  // Extract phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch && result.header) {
    result.header.phone = phoneMatch[0];
  }

  // Extract LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  if (linkedinMatch && result.header) {
    result.header.linkedin = linkedinMatch[0];
  }

  // Extract website
  const websiteMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?!linkedin)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?/i);
  if (websiteMatch && result.header && !websiteMatch[0].includes('linkedin')) {
    result.header.website = websiteMatch[0];
  }

  // Try to extract name (usually first line that's not an email/phone)
  for (const line of lines.slice(0, 5)) {
    if (!line.includes('@') && !line.match(/\d{3}/) && line.length > 2 && line.length < 50) {
      const potentialName = line.replace(/[^a-zA-Z\s]/g, '').trim();
      if (potentialName.split(' ').length >= 2 && result.header) {
        result.header.fullName = potentialName;
        break;
      }
    }
  }

  // Find sections using common headers
  const sectionHeaders = {
    objective: /^(objective|summary|profile|about\s*me|career\s*objective)/i,
    education: /^(education|academic|qualification)/i,
    skills: /^(skills|technical\s*skills|expertise|competencies|technologies)/i,
    experience: /^(experience|work\s*experience|employment|internship|work\s*history)/i,
    projects: /^(projects|personal\s*projects|portfolio)/i,
    achievements: /^(achievements|awards|honors|accomplishments|certifications)/i,
  };

  let currentSection = '';
  let sectionContent: string[] = [];

  const processSection = () => {
    if (!currentSection || sectionContent.length === 0) return;

    const content = sectionContent.join('\n');

    if (currentSection === 'objective' && result.objective !== undefined) {
      result.objective = sectionContent.join(' ').trim();
    } else if (currentSection === 'skills' && result.skills) {
      // Extract skills from comma-separated, bullet points, or line-by-line
      const skillText = content.replace(/[•●○■□▪▫–—-]/g, ',');
      const skills = skillText
        .split(/[,\n]/)
        .map(s => s.trim())
        .filter(s => s.length > 1 && s.length < 50 && !s.match(/^(skills|technical)/i));
      result.skills = [...new Set(skills)];
    } else if (currentSection === 'education' && result.education) {
      // Parse education entries
      const eduBlocks = content.split(/\n(?=[A-Z])/);
      eduBlocks.forEach((block, index) => {
        if (block.trim().length > 10) {
          const lines = block.split('\n').filter(Boolean);
          const dateMatch = block.match(/(\d{4})\s*[-–—to]*\s*(\d{4}|present|current)?/i);
          result.education!.push({
            id: `edu-${Date.now()}-${index}`,
            institution: lines[0]?.trim() || '',
            degree: lines[1]?.trim() || '',
            field: lines[2]?.trim() || '',
            startDate: dateMatch?.[1] || '',
            endDate: dateMatch?.[2] || '',
            gpa: block.match(/gpa[:\s]*(\d+\.?\d*)/i)?.[1] || '',
          });
        }
      });
    } else if (currentSection === 'experience' && result.internships) {
      // Parse experience/internship entries
      const expBlocks = content.split(/\n(?=[A-Z])/);
      expBlocks.forEach((block, index) => {
        if (block.trim().length > 10) {
          const lines = block.split('\n').filter(Boolean);
          const dateMatch = block.match(/(\w+\s*\d{4})\s*[-–—to]*\s*(\w+\s*\d{4}|present|current)?/i);
          result.internships!.push({
            id: `intern-${Date.now()}-${index}`,
            company: lines[0]?.trim() || '',
            role: lines[1]?.trim() || '',
            startDate: dateMatch?.[1] || '',
            endDate: dateMatch?.[2] || '',
            description: lines.slice(2).join(' ').trim(),
          });
        }
      });
    } else if (currentSection === 'projects' && result.projects) {
      // Parse project entries
      const projBlocks = content.split(/\n(?=[A-Z])/);
      projBlocks.forEach((block, index) => {
        if (block.trim().length > 10) {
          const lines = block.split('\n').filter(Boolean);
          const techMatch = block.match(/(?:technologies?|tech\s*stack|built\s*with)[:\s]*(.+)/i);
          result.projects!.push({
            id: `proj-${Date.now()}-${index}`,
            name: lines[0]?.trim() || '',
            description: lines.slice(1).join(' ').replace(techMatch?.[0] || '', '').trim(),
            technologies: techMatch?.[1]?.split(/[,|]/).map(t => t.trim()) || [],
            link: block.match(/(?:https?:\/\/)?(?:github\.com|gitlab\.com)\/[\w-]+\/[\w-]+/i)?.[0] || '',
          });
        }
      });
    } else if (currentSection === 'achievements' && result.achievements) {
      // Parse achievements
      const achLines = content.split('\n').filter(l => l.trim().length > 5);
      achLines.forEach((line, index) => {
        const cleaned = line.replace(/^[•●○■□▪▫–—-]\s*/, '').trim();
        if (cleaned.length > 5) {
          const dateMatch = cleaned.match(/(\d{4})/);
          result.achievements!.push({
            id: `ach-${Date.now()}-${index}`,
            title: cleaned.substring(0, 100),
            description: cleaned,
            date: dateMatch?.[1] || '',
          });
        }
      });
    }
  };

  for (const line of lines) {
    let foundSection = false;
    for (const [section, pattern] of Object.entries(sectionHeaders)) {
      if (pattern.test(line)) {
        processSection();
        currentSection = section;
        sectionContent = [];
        foundSection = true;
        break;
      }
    }
    if (!foundSection && currentSection) {
      sectionContent.push(line);
    }
  }
  processSection();

  return result;
};

// Merge parsed data with existing data, only filling empty fields
export const mergeResumeData = (existing: ResumeData, parsed: Partial<ResumeData>): ResumeData => {
  return {
    header: {
      fullName: existing.header.fullName || parsed.header?.fullName || '',
      email: existing.header.email || parsed.header?.email || '',
      phone: existing.header.phone || parsed.header?.phone || '',
      location: existing.header.location || parsed.header?.location || '',
      linkedin: existing.header.linkedin || parsed.header?.linkedin || '',
      website: existing.header.website || parsed.header?.website || '',
    },
    objective: existing.objective || parsed.objective || '',
    education: existing.education.length > 0 ? existing.education : (parsed.education || []),
    skills: existing.skills.length > 0 ? existing.skills : (parsed.skills || []),
    internships: existing.internships.length > 0 ? existing.internships : (parsed.internships || []),
    projects: existing.projects.length > 0 ? existing.projects : (parsed.projects || []),
    achievements: existing.achievements.length > 0 ? existing.achievements : (parsed.achievements || []),
  };
};

// Read file as text
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string || '');
    reader.onerror = reject;
    reader.readAsText(file);
  });
};
