
import { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import CertificationsCarousel from './CertificationsCarousel';

interface TimelineItemProps {
  isLeft: boolean;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  isVisible: boolean;
}

const TimelineItem = ({ 
  isLeft, 
  title, 
  subtitle, 
  date, 
  description, 
  icon,
  isVisible
}: TimelineItemProps) => (
  <div className={`flex items-stretch w-full mb-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
    <div className="hidden md:block w-1/2"></div>
    
    <div className="mx-auto md:mx-0 w-px bg-gradient-to-b from-portfolio-accent1 to-portfolio-accent2 relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
        {icon}
      </div>
    </div>
    
    <div 
      className={`w-full md:w-1/2 px-4 py-3 transition-all duration-700 transform ${
        isVisible 
          ? 'opacity-100 translate-x-0' 
          : `opacity-0 ${isLeft ? 'translate-x-10' : '-translate-x-10'}`
      }`}
    >
      <div className="p-6 rounded-lg glass-card hover:border-portfolio-accent1 transition-all duration-300">
        <span className="text-sm text-white/60 mb-1 block">{date}</span>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <h4 className="text-white/80 font-medium mb-3">{subtitle}</h4>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  </div>
);

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('experience');
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

  const workExperience = [
    {
      title: "Indian Space Lab - Internship",
      subtitle: "Indian Space Research Organisation (ISRO)",
      date: "June 2025 – Aug 2025",
      description: "Worked on a research and development project under the Space Applications Centre (SAC), focusing on remote sensing data analysis and AI-driven automation in satellite imagery. Contributed to preprocessing and classification of Earth observation datasets using Python, TensorFlow, and cloud-based GIS tools. Implemented algorithms to improve feature detection accuracy by 25%, documented results, and presented findings to senior scientists for further integration into national research initiatives.",
      icon: <Briefcase size={20} className="text-white" />
    },
    {
      title: "DevOps Trainee",
      subtitle: "HeyDevOps",
      date: "March 2024 - Sep 2025",
      description: "Worked as a DevOps Trainee at HeyDevOps, gaining hands-on experience with cloud infrastructure automation and deployment pipelines. Implemented Infrastructure as Code (IaC) using Terraform and Terragrunt to automate provisioning and configuration. Containerized applications with Docker, optimized CI/CD workflows, and collaborated with teams to enhance system reliability and deployment efficiency.",
      icon: <Briefcase size={20} className="text-white" />
    },
    {
      title: "Infosys",
      subtitle: "Industry–Academia Connect with Infosys",
      date: "September 2025",
      description: "Participated in the Industry–Academia Connect event organized by Infosys at GITAM University to celebrate the 2nd Anniversary of the Infosys Vizag Development Center. Gained valuable insights into Artificial Intelligence, innovation, and industry collaboration through interactive sessions led by senior Infosys leadership.",
      icon: <Briefcase size={20} className="text-white" />
    }
  ];

  const education = [
    {
      title: "Lendi Institute of Engineering and Technology",
      subtitle: "B.Tech in Computer Science (AIML)",
      date: "2023 - 2027",
      description: "Specializing in Artificial Intelligence and Machine Learning.",
      icon: <GraduationCap size={20} className="text-white" />
    },
    {
      title: "Apex Junior College",
      subtitle: "MPC Stream",
      date: "2022-2023",
      description: "Studied Mathematics, Physics, and Chemistry, building a strong analytical and problem-solving foundation essential for engineering and technology studies.",
      icon: <GraduationCap size={20} className="text-white" />
    },
    {
      title: "Secondary State Education",
      subtitle: "St'Marys High School",
      date: "2021",
      description: "Completed secondary education with strong academic performance, developing foundational knowledge in science, mathematics, and logical reasoning.",
      icon: <GraduationCap size={20} className="text-white" />
    }
  ];

  // Empty certifications array as requested
  const certifications = [];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Experience & Certifications
          </h2>
          <div 
            className={`w-20 h-1 gradient-bg mx-auto mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          ></div>
          <p 
            className={`text-white/80 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            My professional journey and certifications.
          </p>
        </div>
        
        {/* Work Experience */}
        <div className="mb-16">
          <h3 
            className={`text-2xl font-semibold mb-8 gradient-text inline-block transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Work Experience
          </h3>
          
          <div className="relative">
            {workExperience.map((item, index) => (
              <TimelineItem
                key={index}
                isLeft={index % 2 === 0}
                title={item.title}
                subtitle={item.subtitle}
                date={item.date}
                description={item.description}
                icon={item.icon}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
        
        {/* Certifications */}
        <div>
          <h3 
            className={`text-2xl font-semibold mb-8 gradient-text inline-block transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Certifications
          </h3>
          
          {/* Certification Timeline Items - removed as requested */}
          
          {/* Certification Carousel */}
          <CertificationsCarousel isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
