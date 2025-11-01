
import { useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // Set page title and meta description for SEO
    document.title = "Pratham P. Sharma - AI/ML & Cloud Computing Specialist";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Portfolio of Pratham P. Sharma, a Computer Science undergraduate specializing in AI/ML and Cloud Computing. Discover my skills, projects, and professional experience.");
    }
    
    // Update keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Pratham portfolio, Pratham P. Sharma, Pratham Pujya Sharma, AI/ML specialist, Cloud Computing, GCP, AWS, Java, Python');
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-bg text-white overflow-x-hidden">
      <Header />
      <main id="content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
