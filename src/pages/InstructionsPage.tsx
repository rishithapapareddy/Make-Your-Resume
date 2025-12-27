import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { 
  FileText, 
  Edit, 
  Download, 
  Upload, 
  Palette, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const InstructionsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const steps = [
    {
      icon: Palette,
      title: 'Choose Your Template',
      description: 'Browse through our collection of 12+ professionally designed templates. Each template is crafted to suit different industries and career levels.',
      tips: [
        'Modern templates work great for tech roles',
        'Classic templates suit corporate positions',
        'Creative templates stand out for design roles',
      ],
    },
    {
      icon: Edit,
      title: 'Fill In Your Details',
      description: 'Our intuitive editor guides you through each section. Fill in your personal information, career objective, education, skills, experience, and achievements.',
      tips: [
        'Use action verbs to describe your achievements',
        'Quantify results where possible (e.g., "increased sales by 25%")',
        'Keep your objective concise and targeted',
      ],
    },
    {
      icon: Upload,
      title: 'Upload Existing Resume (Optional)',
      description: 'Have an existing resume? Upload it and we\'ll help you transfer your content to the new template. You can then edit and update it according to your job requirements.',
      tips: [
        'Supported formats: PDF, DOC, DOCX',
        'Review and update information after upload',
        'Tailor content for each job application',
      ],
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Suggestions',
      description: 'Get smart suggestions to improve your resume content. Our AI helps you write compelling descriptions and highlights your strengths.',
      tips: [
        'Use AI suggestions as a starting point',
        'Customize suggestions to match your voice',
        'Focus on results and impact',
      ],
    },
    {
      icon: Download,
      title: 'Download Your Resume',
      description: 'When you\'re happy with your resume, download it as a professional PDF. Your resume is ready to send to potential employers!',
      tips: [
        'Preview before downloading',
        'Save your work regularly',
        'Create multiple versions for different roles',
      ],
    },
  ];

  const templateStyles = [
    { name: 'Modern', desc: 'Clean lines, contemporary design for tech and startups', color: '#4A7C59' },
    { name: 'Classic', desc: 'Timeless elegance for corporate and traditional industries', color: '#2C3E50' },
    { name: 'Creative', desc: 'Bold colors and unique layouts for creative professionals', color: '#E74C3C' },
    { name: 'Minimal', desc: 'Simple and focused, letting your content shine', color: '#333333' },
    { name: 'Professional', desc: 'Polished look for senior and executive positions', color: '#1E3A5F' },
    { name: 'Elegant', desc: 'Sophisticated design with fine details', color: '#8B5A2B' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
              <HelpCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              How to Create Your Resume
            </h1>
            <p className="text-lg text-muted-foreground">
              Follow these simple steps to create a professional resume that gets noticed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-soft">
                        <step.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          Step {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <div className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Styles */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Template Styles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each template style is designed for specific industries and preferences. 
              Choose the one that best represents your professional brand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {templateStyles.map((style, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 hover:shadow-card transition-shadow">
                  <div 
                    className="w-10 h-10 rounded-xl mb-4"
                    style={{ background: style.color }}
                  />
                  <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                    {style.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{style.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Choose a template and create your professional resume in minutes.
            </p>
            <Button variant="hero" size="xl" onClick={() => navigate('/')}>
              Browse Templates
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InstructionsPage;
