import React from 'react';
import { ResumeData, Template } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  template: Template;
  scale?: number;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template, scale = 1 }) => {
  const styles = {
    modern: {
      headerBg: template.colors.primary,
      sectionTitle: template.colors.accent,
      bodyBg: template.colors.secondary,
    },
    classic: {
      headerBg: template.colors.primary,
      sectionTitle: template.colors.primary,
      bodyBg: '#ffffff',
    },
    creative: {
      headerBg: template.colors.primary,
      sectionTitle: template.colors.accent,
      bodyBg: template.colors.secondary,
    },
    minimal: {
      headerBg: 'transparent',
      sectionTitle: template.colors.primary,
      bodyBg: '#ffffff',
    },
    professional: {
      headerBg: template.colors.primary,
      sectionTitle: template.colors.accent,
      bodyBg: template.colors.secondary,
    },
    elegant: {
      headerBg: template.colors.primary,
      sectionTitle: template.colors.accent,
      bodyBg: template.colors.secondary,
    },
  };

  const currentStyle = styles[template.style];

  return (
    <div 
      id="resume-preview"
      className="bg-white shadow-lg"
      style={{ 
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        width: '210mm',
        minHeight: '297mm',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header */}
      <div 
        className="p-8"
        style={{ 
          background: currentStyle.headerBg,
          color: template.style === 'minimal' ? template.colors.primary : '#ffffff'
        }}
      >
        <h1 className="text-3xl font-bold mb-2">
          {data.header.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {data.header.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {data.header.email}
            </span>
          )}
          {data.header.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {data.header.phone}
            </span>
          )}
          {data.header.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {data.header.location}
            </span>
          )}
          {data.header.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              {data.header.linkedin}
            </span>
          )}
          {data.header.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {data.header.website}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-8" style={{ background: currentStyle.bodyBg }}>
        {/* Objective */}
        {data.objective && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-2 pb-1 border-b-2"
              style={{ color: currentStyle.sectionTitle, borderColor: currentStyle.sectionTitle }}
            >
              Career Objective
            </h2>
            <p className="text-sm text-gray-700">{data.objective}</p>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-2 pb-1 border-b-2"
              style={{ color: currentStyle.sectionTitle, borderColor: currentStyle.sectionTitle }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                      <p className="text-sm text-gray-600">{edu.degree} in {edu.field}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-2 pb-1 border-b-2"
              style={{ color: currentStyle.sectionTitle, borderColor: currentStyle.sectionTitle }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ 
                    background: template.colors.secondary,
                    color: template.colors.accent
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Internships */}
        {data.internships.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-2 pb-1 border-b-2"
              style={{ color: currentStyle.sectionTitle, borderColor: currentStyle.sectionTitle }}
            >
              Internship Experience
            </h2>
            <div className="space-y-3">
              {data.internships.map((intern) => (
                <div key={intern.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{intern.role}</h3>
                      <p className="text-sm text-gray-600">{intern.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {intern.startDate} - {intern.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{intern.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-2 pb-1 border-b-2"
              style={{ color: currentStyle.sectionTitle, borderColor: currentStyle.sectionTitle }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Technologies: {project.technologies.join(', ')}
                    </p>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="text-xs"
                      style={{ color: template.colors.primary }}
                    >
                      {project.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {data.achievements.length > 0 && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-2 pb-1 border-b-2"
              style={{ color: currentStyle.sectionTitle, borderColor: currentStyle.sectionTitle }}
            >
              Achievements
            </h2>
            <div className="space-y-2">
              {data.achievements.map((achievement) => (
                <div key={achievement.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                    <span className="text-sm text-gray-500">{achievement.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
