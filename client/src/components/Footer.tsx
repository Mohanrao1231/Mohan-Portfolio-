
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-4 bg-black">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Pratham P. Sharma. All rights reserved.
            </p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="text-white/80" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
