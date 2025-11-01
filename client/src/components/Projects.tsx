import { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  edgeUrl?: string;
  delay: number;
}

const ProjectCard = ({ title, description, githubUrl, liveUrl, edgeUrl, delay }: ProjectCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`glass-card rounded-xl p-6 transition-all duration-700 transform hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h3 className="text-xl font-semibold mb-3 gradient-text">{title}</h3>
      <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>
      
      <div className="flex gap-4">
        <a 
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-sm"
        >
          <Github size={16} />
          GitHub
        </a>
        
        {liveUrl && (
          <a 
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 gradient-bg hover:opacity-90 rounded-lg transition-all duration-300 text-sm"
            data-testid={`link-firefox-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <ExternalLink size={16} />
            Firefox
          </a>
        )}
        
        {edgeUrl && (
          <a 
            href={edgeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 text-sm"
            data-testid={`link-edge-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <ExternalLink size={16} />
            Edge
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('projects');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Bandhutva — LinkedIn Connection Manager",
      description: "Browser extension enabling bulk accept/reject of LinkedIn connection requests with intuitive UI enhancements. Available for Firefox and Microsoft Edge.",
      githubUrl: "https://github.com/PrathamP-dev/Bandhutva",
      liveUrl: "https://addons.mozilla.org/en-US/firefox/addon/bandhutva/",
      edgeUrl: "https://microsoftedge.microsoft.com/addons/detail/bandhutva/holdnfdoggehnkgemgbmbbjnomolffke"
    },
    {
      title: "Vanasandesh.AI — Forestry & Wildlife Tech News Aggregator",
      description: "Automated Python-based system for aggregating, moderating, and summarizing forestry and wildlife tech news.",
      githubUrl: "https://github.com/PrathamP-dev/Vanasandesh.AI",
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Showcasing innovative solutions in web development and AI automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title}
              {...project}
              delay={300 + index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;