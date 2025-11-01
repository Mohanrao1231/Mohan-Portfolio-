import { useState, useEffect } from 'react';
import { FileDown, GraduationCap, Code } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
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

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science (AIML)",
      institution: "Sharda University",
      period: "2024 - 2028"
    },
    {
      degree: "CS50 – Computer Science",
      institution: "Harvard University",
      period: "2024"
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div 
            className={`w-full md:w-1/2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
            <div className="w-20 h-1 gradient-bg mb-6"></div>

            <p className="text-white/80 mb-6 leading-relaxed">
              Pratham P. Sharma is a driven Computer Science undergraduate specializing in Artificial 
              Intelligence and Machine Learning. With expertise in cloud computing, web development, 
              and AI, he has shown exceptional proficiency in Google Cloud, AWS, and DevOps.
            </p>

            <p className="text-white/80 mb-8 leading-relaxed">
              Pratham's passion for open-source contributions and innovation is reflected in his active 
              involvement in cloud hackathons and industry collaborations. His achievements in cloud 
              technology and AI underline his ability to lead, solve complex problems, and contribute 
              significantly to impactful projects.
            </p>

            {/* Education Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold flex items-center mb-4">
                <GraduationCap className="mr-2" />
                Education
              </h3>

              <div className="space-y-4">
                {education.map((item, index) => (
                  <div key={index} className="border-l-2 border-portfolio-accent1 pl-4 py-1">
                    <h4 className="text-lg font-medium">{item.degree}</h4>
                    <p className="text-white/70">{item.institution}</p>
                    <p className="text-white/60 text-sm">{item.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex">
              <a 
                href="https://drive.google.com/file/d/11gufRI_pfThmi6MTDZeK549b0_PsWlZu/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full gradient-bg text-white font-medium transition-transform hover:scale-105"
              >
                <FileDown size={18} />
                Download Resume
              </a>
            </div>
          </div>

          <div 
            className={`w-full md:w-1/2 relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative w-full h-80 md:h-96 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Animated Code Symbol */}
                <div className="relative w-40 h-40 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse-slow">
                  <Code size={60} className="text-portfolio-accent1" />
                </div>

                {/* Orbital Ring */}
                <div className="absolute w-64 h-64 border border-dashed border-white/20 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>

                {/* Tech Keywords */}
                <div className="absolute w-80 h-80 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 px-3 py-1 rounded-full text-xs text-white/80">Python</span>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black/80 px-3 py-1 rounded-full text-xs text-white/80">Cloud</span>
                  <span className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 px-3 py-1 rounded-full text-xs text-white/80">AI/ML</span>
                  <span className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-black/80 px-3 py-1 rounded-full text-xs text-white/80">DevOps</span>
                </div>

                {/* Abstract code patterns */}
                <div className="absolute bottom-0 left-0 text-white/20 font-mono text-xs">
                  <pre>{`class AI:
  def __init__(self):
    self.learn()`}</pre>
                </div>
                <div className="absolute top-0 right-0 text-white/20 font-mono text-xs">
                  <pre>{`function deploy() {
  cloud.init()
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;