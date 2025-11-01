
import { useEffect, useState } from 'react';
import { ArrowDown, Code, Database, Cloud, Server, FileCode } from 'lucide-react';
import FloatingBubbles from './FloatingBubbles';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const techBubbles = [
    { icon: <Code size={20} />, top: '15%', left: '10%', size: 'w-12 h-12' },
    { icon: <Database size={20} />, top: '20%', right: '15%', size: 'w-14 h-14' },
    { icon: <Cloud size={20} />, bottom: '30%', left: '20%', size: 'w-10 h-10' },
    { icon: <Server size={20} />, top: '40%', right: '25%', size: 'w-12 h-12' },
    { icon: <FileCode size={20} />, bottom: '15%', right: '10%', size: 'w-16 h-16' },
  ];

  return (
    <section 
      id="home" 
      className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background gradient cloud focused around name */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="name-focused-cloud"></div>
      </div>
      
      {/* Enhanced floating bubbles for hero */}
      <FloatingBubbles section="hero" density="medium" />
      
      {/* Tech Bubbles - converted to white theme to match original */}
      {techBubbles.map((bubble, index) => (
        <div 
          key={index}
          className={`tech-bubble ${bubble.size} flex items-center justify-center`}
          style={{
            top: bubble.top,
            left: bubble.left,
            right: bubble.right,
            bottom: bubble.bottom,
            animationDelay: `${index * 0.5}s`
          }}
          aria-hidden="true"
        >
          <div className="text-white/80">
            {bubble.icon}
          </div>
        </div>
      ))}
      
      <div 
        className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="text-lg md:text-xl text-white/70 mb-3">Hello, I'm</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
          <span className="relative inline-block glass-name-effect">
            Pratham P. <span className="gradient-text">Sharma</span>
          </span>
        </h1>
        <div className="reveal-code text-xl md:text-2xl mb-8">
          <span itemProp="jobTitle">Specialized in AI/ML, Cloud Computing & DevOps</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
          <a 
            href="#about" 
            className="px-6 py-3 rounded-full gradient-bg text-white font-medium transition-transform hover:scale-105"
            aria-label="Learn more about Pratham P. Sharma"
          >
            About Me
          </a>
          
          <a 
            href="#contact" 
            className="px-6 py-3 rounded-full bg-transparent border border-white/30 text-white font-medium transition-all hover:border-portfolio-accent1"
            aria-label="Contact Pratham P. Sharma"
          >
            Get in Touch
          </a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white/10 p-3 rounded-full animate-float"
        aria-label="Scroll down to about section"
      >
        <ArrowDown size={24} className="text-white/80" />
      </a>
    </section>
  );
};

export default Hero;
