import React from 'react';
import { motion } from 'framer-motion';
import { Template } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Edit, Eye } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onEdit: (template: Template) => void;
  onPreview: (template: Template) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onEdit, onPreview }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-glow transition-all duration-300"
    >
      {/* Premium Badge */}
      {template.isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-accent text-accent-foreground gap-1 px-2 py-1">
            <Crown className="w-3 h-3" />
            Premium
          </Badge>
        </div>
      )}

      {/* Template Preview */}
      <div 
        className="aspect-[3/4] p-4 relative overflow-hidden"
        style={{ background: template.colors.secondary }}
      >
        {/* Mock Resume Preview */}
        <div className="w-full h-full bg-card rounded-lg shadow-sm p-3 transform scale-90 origin-top">
          <div 
            className="h-8 rounded mb-2"
            style={{ background: template.colors.primary }}
          />
          <div className="space-y-1">
            <div className="h-2 bg-muted rounded w-3/4" />
            <div className="h-2 bg-muted rounded w-1/2" />
          </div>
          <div className="mt-3 space-y-2">
            <div 
              className="h-1.5 rounded w-1/3"
              style={{ background: template.colors.accent }}
            />
            <div className="h-1.5 bg-muted/50 rounded w-full" />
            <div className="h-1.5 bg-muted/50 rounded w-5/6" />
          </div>
          <div className="mt-3 space-y-2">
            <div 
              className="h-1.5 rounded w-1/4"
              style={{ background: template.colors.accent }}
            />
            <div className="h-1.5 bg-muted/50 rounded w-full" />
            <div className="h-1.5 bg-muted/50 rounded w-4/5" />
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => onPreview(template)}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
          <Button 
            variant="hero" 
            size="sm" 
            onClick={() => onEdit(template)}
            className="gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground text-lg">
          {template.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {template.description}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ background: template.colors.primary }}
          />
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ background: template.colors.secondary }}
          />
          <div 
            className="w-4 h-4 rounded-full border border-border"
            style={{ background: template.colors.accent }}
          />
          <span className="text-xs text-muted-foreground ml-auto capitalize">
            {template.style}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
