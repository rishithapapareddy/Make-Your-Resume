import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview from '@/components/ResumePreview';
import { templates, Template, ResumeData, defaultResumeData } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Download, Save, Eye, Edit, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';

const EditorPage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    const foundTemplate = templates.find((t) => t.id === templateId);
    if (foundTemplate) {
      setTemplate(foundTemplate);
      
      // Load saved data if exists
      const savedData = localStorage.getItem(`resume_${templateId}`);
      if (savedData) {
        setResumeData(JSON.parse(savedData));
      }
    } else {
      navigate('/');
    }
  }, [templateId, isAuthenticated, navigate]);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem(`resume_${templateId}`, JSON.stringify(resumeData));
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Resume saved!',
        description: 'Your resume has been saved successfully.',
      });
    }, 500);
  };

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    toast({
      title: 'Generating PDF...',
      description: 'Please wait while we prepare your resume.',
    });

    const opt = {
      margin: 0,
      filename: `${resumeData.header.fullName || 'resume'}_${template?.name || 'template'}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast({
        title: 'Download complete!',
        description: 'Your resume has been downloaded as a PDF.',
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'There was an error generating your PDF. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (!template) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Editor Header */}
      <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-display font-semibold text-foreground text-lg">
                  {template.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Editing your resume
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* View Toggle */}
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'edit' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('edit')}
                  className="gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant={viewMode === 'preview' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('preview')}
                  className="gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>

              <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              
              <Button variant="hero" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={viewMode === 'edit' ? 'block' : 'hidden lg:block'}
          >
            <ResumeEditor data={resumeData} onChange={setResumeData} />
          </motion.div>

          {/* Preview Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${viewMode === 'preview' ? 'block' : 'hidden lg:block'} lg:sticky lg:top-40 lg:self-start`}
          >
            <div className="bg-muted rounded-2xl p-4 overflow-auto max-h-[calc(100vh-12rem)]">
              <div className="transform scale-[0.5] origin-top">
                <ResumePreview data={resumeData} template={template} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
