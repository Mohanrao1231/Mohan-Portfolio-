import { useEffect, useState } from 'react';
import { 
  Code, 
  Database, 
  Cloud, 
  Server, 
  FileCode, 
  Terminal, 
  GitBranch, 
  Cpu, 
  Shield, 
  Zap,
  Settings,
  Globe,
  Layers,
  Container,
  Infinity
} from 'lucide-react';

interface FloatingBubblesProps {
  section?: string;
  density?: 'light' | 'medium' | 'heavy';
}

const FloatingBubbles = ({ section = 'general', density = 'medium' }: FloatingBubblesProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getIcons = () => {
    return [
      { icon: <Infinity size={16} />, symbol: '∞' },
      { icon: <Code size={16} />, symbol: '</>' },
      { icon: <Terminal size={16} />, symbol: '>_' },
      { icon: <GitBranch size={16} />, symbol: 'git' },
      { icon: <Server size={16} />, symbol: 'DevOps' },
    ];
  };

  const getBubbleCount = (densityLevel: string) => {
    switch (densityLevel) {
      case 'light': return 3;
      case 'medium': return 4;
      case 'heavy': return 5; // Reduced from 8 to 5
      default: return 4;
    }
  };

  const icons = getIcons();
  const bubbleCount = getBubbleCount(density);

  const generateBubbleStyle = (index: number, sectionType: string) => {
    // Better positioning to avoid text overlap
    const positions = {
      hero: [
        { top: '10%', left: '5%' },
        { top: '20%', right: '10%' },
        { bottom: '25%', left: '8%' },
        { top: '70%', right: '15%' },
        { bottom: '10%', right: '5%' },
      ],
      about: [
        { top: '15%', left: '5%' },
        { top: '30%', right: '8%' },
        { bottom: '20%', left: '10%' },
      ],
      skills: [
        { top: '12%', left: '3%' },
        { top: '35%', right: '5%' },
        { bottom: '15%', left: '7%' },
        { top: '60%', right: '12%' },
        { bottom: '40%', right: '8%' },
      ],
      contact: [
        { top: '20%', left: '8%' },
        { top: '50%', right: '10%' },
        { bottom: '25%', left: '12%' },
        { bottom: '10%', right: '6%' },
      ],
      default: [
        { top: '15%', left: '6%' },
        { top: '40%', right: '10%' },
        { bottom: '20%', left: '8%' },
      ]
    };

    const sectionPositions = positions[sectionType as keyof typeof positions] || positions.default;
    return sectionPositions[index % sectionPositions.length];
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: bubbleCount }).map((_, index) => {
        const icon = icons[index % icons.length];
        const style = generateBubbleStyle(index, section);
        const size = index % 2 === 0 ? 'w-10 h-10' : 'w-8 h-8'; // More consistent sizing
        const delay = index * 1.2;
        
        return (
          <div
            key={index}
            className={`floating-tech-bubble ${size} flex items-center justify-center`}
            style={{
              ...style,
              animationDelay: `${delay}s`,
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.8s ease ${delay * 0.1}s`
            }}
          >
            {/* Icon version */}
            <div className="bubble-icon">
              {icon.icon}
            </div>
            
            {/* Symbol version - shown on hover */}
            <div className="bubble-symbol">
              {icon.symbol}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingBubbles;