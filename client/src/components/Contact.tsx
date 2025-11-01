
import { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('contact');
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (validateForm()) {
    emailjs
      .send(
        'service_18iwc8f',          // ✅ Your Service ID
        'template_l92wgm8',          // ⚠️ Replace with your actual Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'OP1BVdsKRXF5rhi5n'      // ⚠️ Replace with your EmailJS Public Key
      )
      .then(
        () => {
          toast({
            title: 'Message sent successfully!',
            description: "Thanks for reaching out — I’ll get back to you soon.",
            variant: 'default',
          });
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('FAILED...', error.text);
          toast({
            title: 'Failed to send message.',
            description: 'Please try again later or contact me directly.',
            variant: 'destructive',
          });
        }
      );
  }
};


  return (
    <section id="contact" className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Get In Touch
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
            Feel free to reach out to me for collaborations or just to say hello!
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div 
            className={`w-full lg:w-1/2 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-portfolio-accent1 transition-colors`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-portfolio-accent1 transition-colors`}
                  placeholder="Your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-portfolio-accent1 transition-colors`}
                  placeholder="Your message"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                className="px-6 py-3 rounded-full gradient-bg text-white font-medium transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
          
          <div 
            className={`w-full lg:w-1/2 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="h-full glass-card rounded-lg p-8 flex flex-col">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="flex-grow space-y-8">
                <a 
                  href="mailto:mohanchokkaku@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white/80 text-sm">Email</h4>
                    <p className="font-medium">mohanchokkaku@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/chokkaku-mohan-rao-b13021285" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                    <Linkedin size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white/80 text-sm">LinkedIn</h4>
                    <p className="font-medium">linkedin.com/in/chokkaku-mohan-rao-b13021285</p>
                  </div>
                </a>
                
                <a 
                  href="https://github.com/Mohanrao1231" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                    <Github size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white/80 text-sm">GitHub</h4>
                    <p className="font-medium">github.com/Mohanrao1231</p>
                  </div>
                </a>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  Feel free to connect with me on social media or send me an email. I'll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
