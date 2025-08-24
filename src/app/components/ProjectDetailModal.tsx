import React from 'react';
import Image from 'next/image';
import { X as XIcon, ExternalLink, Github } from 'lucide-react';
import { GithubProject } from '@/data/githubProjects';
import { getTechIcon } from '@/lib/techUtils';

interface ProjectDetailModalProps {
  project: GithubProject | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Backdrop - Page utama dengan blur */}
      <div 
        className={`absolute inset-0 backdrop-blur-md bg-black/20 transition-all duration-300 ${
          isOpen ? 'backdrop-blur-md' : 'backdrop-blur-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Close modal"
        >
          <XIcon size={20} />
        </button>
        
        {/* Modal Header with Image */}
        <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={project.img}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            priority
          />
          {/* Gradient overlay untuk better readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          {/* Project Title */}
          <h2 className="text-2xl font-bold text-black mb-2 pr-12">
            {project.name}
          </h2>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => {
              const skillIcon = getTechIcon(tech);
              return (
                <div key={tech} className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full font-medium transition-colors duration-200">
                  {skillIcon && (
                    <Image 
                      src={skillIcon.imgSrc} 
                      alt={skillIcon.alt} 
                      className="w-4 h-4" 
                      width={16} 
                      height={16} 
                    />
                  )}
                  <span>{tech}</span>
                </div>
              );
            })}
          </div>
          
          {/* Project Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-black mb-2">About This Project</h3>
            <p className="text-gray-700 leading-relaxed">
              {project.description}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* GitHub Repo Button */}
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              <Github size={18} />
              View Repository
            </a>
            
            {/* Live Demo Button (if available) */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
