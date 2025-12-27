import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import ResumePreview from '@/components/ResumePreview';
import { templates, Template, ResumeData, defaultResumeData } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Download, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PreviewPage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [template, setTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    const foundTemplate = templates.find((t) => t.id === templateId);
    if (foundTemplate) {
      setTemplate(foundTemplate);
    } else {
      navigate('/');
    }
  }, [templateId, isAuthenticated, navigate]);

  const sampleData: ResumeData = {
    header: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 234 567 890',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      website: 'johndoe.dev',
    },
    objective: 'Passionate software engineer with 3+ years of experience in building scalable web applications. Seeking to leverage my expertise in React and Node.js to contribute to innovative projects.',
    education: [
      {
        id: '1',
        institution: 'Massachusetts Institute of Technology',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: 'Sep 2018',
        endDate: 'May 2022',
        gpa: '3.9/4.0',
      },
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB'],
    internships: [
      {
        id: '1',
        company: 'Google',
        role: 'Software Engineering Intern',
        startDate: 'Jun 2021',
        endDate: 'Aug 2021',
        description: 'Developed features for Google Cloud Platform dashboard, improving user experience by 25%.',
      },
    ],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented payment processing and inventory management.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'github.com/johndoe/ecommerce',
      },
    ],
    achievements: [
      {
        id: '1',
        title: 'First Place - Hackathon 2022',
        description: 'Won first place in a 48-hour hackathon for building an AI-powered accessibility tool.',
        date: '2022',
      },
    ],
  };

  if (!template) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-foreground text-2xl">
                  {template.name}
                </h1>
                {template.isPremium && (
                  <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mt-1">{template.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="hero" 
              onClick={() => navigate(`/editor/${template.id}`)}
              className="gap-2"
            >
              <Edit className="w-4 h-4" />
              Use This Template
            </Button>
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="bg-muted rounded-2xl p-8 shadow-card inline-block overflow-auto">
            <ResumePreview data={sampleData} template={template} scale={0.8} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewPage;
