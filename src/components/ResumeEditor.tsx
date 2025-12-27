import React, { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Upload, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { parseResumeText, mergeResumeData, readFileAsText } from '@/utils/resumeParser';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, onChange }) => {
  const { toast } = useToast();
  const [isParsingFile, setIsParsingFile] = useState(false);

  const updateHeader = (field: keyof ResumeData['header'], value: string) => {
    onChange({
      ...data,
      header: { ...data.header, [field]: value },
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          gpa: '',
        },
      ],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      onChange({ ...data, skills: [...data.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    onChange({ ...data, skills: data.skills.filter((s) => s !== skill) });
  };

  const addInternship = () => {
    onChange({
      ...data,
      internships: [
        ...data.internships,
        {
          id: Date.now().toString(),
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const updateInternship = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      internships: data.internships.map((intern) =>
        intern.id === id ? { ...intern, [field]: value } : intern
      ),
    });
  };

  const removeInternship = (id: string) => {
    onChange({
      ...data,
      internships: data.internships.filter((intern) => intern.id !== id),
    });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          id: Date.now().toString(),
          name: '',
          description: '',
          technologies: [],
          link: '',
        },
      ],
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((project) => project.id !== id),
    });
  };

  const addAchievement = () => {
    onChange({
      ...data,
      achievements: [
        ...data.achievements,
        {
          id: Date.now().toString(),
          title: '',
          description: '',
          date: '',
        },
      ],
    });
  };

  const updateAchievement = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      achievements: data.achievements.map((ach) =>
        ach.id === id ? { ...ach, [field]: value } : ach
      ),
    });
  };

  const removeAchievement = (id: string) => {
    onChange({
      ...data,
      achievements: data.achievements.filter((ach) => ach.id !== id),
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingFile(true);
    
    try {
      // Read file content
      const text = await readFileAsText(file);
      
      if (!text.trim()) {
        toast({
          title: 'Empty file',
          description: 'The uploaded file appears to be empty.',
          variant: 'destructive',
        });
        setIsParsingFile(false);
        return;
      }

      // Parse the resume text
      const parsedData = parseResumeText(text);
      
      // Merge with existing data
      const mergedData = mergeResumeData(data, parsedData);
      onChange(mergedData);
      
      toast({
        title: 'Resume imported!',
        description: 'Your resume has been parsed. Review and edit the details below.',
      });
    } catch (error) {
      console.error('Error parsing resume:', error);
      toast({
        title: 'Error parsing resume',
        description: 'Could not parse the file. Please try a different format or enter details manually.',
        variant: 'destructive',
      });
    } finally {
      setIsParsingFile(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Upload Resume */}
      <Card className="p-4 border-dashed border-2 border-primary/30 bg-pastel-green/30">
        <label className={`flex flex-col items-center cursor-pointer py-4 ${isParsingFile ? 'opacity-50 pointer-events-none' : ''}`}>
          {isParsingFile ? (
            <Loader2 className="w-8 h-8 text-primary mb-2 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-primary mb-2" />
          )}
          <span className="text-sm font-medium text-foreground">
            {isParsingFile ? 'Parsing resume...' : 'Upload existing resume'}
          </span>
          <span className="text-xs text-muted-foreground">TXT or plain text file - content will be parsed and editable</span>
          <input
            type="file"
            accept=".txt,.text"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isParsingFile}
          />
        </label>
        <div className="flex items-center gap-2 mt-2 p-2 bg-muted/50 rounded-lg">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Tip: Copy your resume text into a .txt file for best results
          </span>
        </div>
      </Card>

      {/* Header Section */}
      <Card className="p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input
              value={data.header.fullName}
              onChange={(e) => updateHeader('fullName', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={data.header.email}
              onChange={(e) => updateHeader('email', e.target.value)}
              placeholder="john@example.com"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={data.header.phone}
              onChange={(e) => updateHeader('phone', e.target.value)}
              placeholder="+1 234 567 890"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={data.header.location}
              onChange={(e) => updateHeader('location', e.target.value)}
              placeholder="New York, NY"
            />
          </div>
          <div>
            <Label>LinkedIn</Label>
            <Input
              value={data.header.linkedin}
              onChange={(e) => updateHeader('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              value={data.header.website}
              onChange={(e) => updateHeader('website', e.target.value)}
              placeholder="johndoe.com"
            />
          </div>
        </div>
      </Card>

      {/* Objective */}
      <Card className="p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Career Objective</h3>
        <Textarea
          value={data.objective}
          onChange={(e) => onChange({ ...data, objective: e.target.value })}
          placeholder="A brief summary of your career goals and what you bring to the table..."
          rows={4}
        />
      </Card>

      {/* Education */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Education</h3>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 bg-muted/50 rounded-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <Label>GPA (optional)</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    placeholder="Sep 2019"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    placeholder="May 2023"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills */}
      <Card className="p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-destructive">
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type a skill and press Enter"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          <Button
            variant="outline"
            onClick={(e) => {
              const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement;
              addSkill(input.value);
              input.value = '';
            }}
          >
            Add
          </Button>
        </div>
      </Card>

      {/* Internships */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Internship Experience</h3>
          <Button variant="outline" size="sm" onClick={addInternship}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {data.internships.map((intern) => (
            <div key={intern.id} className="p-4 bg-muted/50 rounded-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => removeInternship(intern.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={intern.company}
                    onChange={(e) => updateInternship(intern.id, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={intern.role}
                    onChange={(e) => updateInternship(intern.id, 'role', e.target.value)}
                    placeholder="Software Engineer Intern"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    value={intern.startDate}
                    onChange={(e) => updateInternship(intern.id, 'startDate', e.target.value)}
                    placeholder="Jun 2022"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    value={intern.endDate}
                    onChange={(e) => updateInternship(intern.id, 'endDate', e.target.value)}
                    placeholder="Aug 2022"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={intern.description}
                    onChange={(e) => updateInternship(intern.id, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Projects */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Projects</h3>
          <Button variant="outline" size="sm" onClick={addProject}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {data.projects.map((project) => (
            <div key={project.id} className="p-4 bg-muted/50 rounded-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="Project Name"
                  />
                </div>
                <div>
                  <Label>Link (optional)</Label>
                  <Input
                    value={project.link}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    placeholder="github.com/username/project"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="Describe the project and your contribution..."
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Technologies (comma-separated)</Label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) =>
                      updateProject(
                        project.id,
                        'technologies',
                        e.target.value.split(',').map((t) => t.trim())
                      )
                    }
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">Achievements</h3>
          <Button variant="outline" size="sm" onClick={addAchievement}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-4">
          {data.achievements.map((ach) => (
            <div key={ach.id} className="p-4 bg-muted/50 rounded-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => removeAchievement(ach.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={ach.title}
                    onChange={(e) => updateAchievement(ach.id, 'title', e.target.value)}
                    placeholder="Achievement Title"
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    value={ach.date}
                    onChange={(e) => updateAchievement(ach.id, 'date', e.target.value)}
                    placeholder="2023"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={ach.description}
                    onChange={(e) => updateAchievement(ach.id, 'description', e.target.value)}
                    placeholder="Describe your achievement..."
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ResumeEditor;
