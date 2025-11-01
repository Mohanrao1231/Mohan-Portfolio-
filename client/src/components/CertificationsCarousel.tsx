
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CertificationsCarouselProps {
  isVisible: boolean;
}

const CertificationsCarousel = ({ isVisible }: CertificationsCarouselProps) => {
  // Setup embla carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    dragFree: true,
    skipSnaps: false,
    containScroll: 'trimSnaps',
  });
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Function to scroll to previous slide
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  // Function to scroll to next slide
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Enable/disable navigation buttons
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!emblaApi || !isAutoScrolling) return;
    
    const autoScroll = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [emblaApi, isAutoScrolling]);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  // Function to toggle enlargement of an image
  const toggleEnlarge = (index: number) => {
    setEnlargedImageIndex(enlargedImageIndex === index ? null : index);
  };

  // Close enlarged image when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (enlargedImageIndex !== null && !target.closest('.enlarge-container')) {
        setEnlargedImageIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [enlargedImageIndex]);

  // Certification images
  const certificationImages = [
  "/lovable-uploads/1762017586714-47b63f39-1c44-49ac-a1a3-e39132160e62_1.png",
  "/lovable-uploads/SPACE_LAB_CERTIFICATE-1.png",
  "/lovable-uploads/7443663_1728542178.png",
  "/lovable-uploads/STEP_CERTIFICATE.png",
  "/lovable-uploads/AWS_Academy_Graduate___Data_Engineering___Training_Badge_Badge20251101-31-fg42n4.png",
  "/lovable-uploads/abcee48f-e732-48a8-97b3-0db04706ab9b.png",
  "/lovable-uploads/CourseAttendance20251101-31-2s6ytb.png",
  "/lovable-uploads/chokkaku-mohan-rao-b27a3e0c-9a00-41fe-9d2d-c60964a85a50-certificate.png",
  "/lovable-uploads/CourseAttendance20251101-31-jtcepz.png",
  "/lovable-uploads/chokkaku-mohan-rao-d48f7182-71c1-43e3-a769-6028a20db587-certificate.png",
  "/lovable-uploads/CourseAttendance20251101-32-r2n2hi.png",
  "/lovable-uploads/eCertificate.png",
  "/lovable-uploads/DevOps_Certificate.png"
  ];

  return (
    <div className={`w-full mt-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
      <div className="relative">
        {/* Navigation Buttons */}
        <button 
          onClick={scrollPrev} 
          disabled={!prevBtnEnabled}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-portfolio-accent1 to-portfolio-accent2 backdrop-blur-sm rounded-full p-3 text-white hover:scale-110 transition-all duration-300 -ml-4 shadow-lg hover:shadow-portfolio-accent1/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button 
          onClick={scrollNext} 
          disabled={!nextBtnEnabled}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-portfolio-accent1 to-portfolio-accent2 backdrop-blur-sm rounded-full p-3 text-white hover:scale-110 transition-all duration-300 -mr-4 shadow-lg hover:shadow-portfolio-accent1/30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        
        {/* Carousel Container */}
        <div 
          className="overflow-hidden" 
          ref={emblaRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex">
            {certificationImages.map((image, index) => (
              <div key={index} className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-4">
                <div 
                  className={`relative group cursor-pointer enlarge-container transform transition-all duration-500 ${
                    isVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => toggleEnlarge(index)}
                >
                  <div className="w-full h-full aspect-[3/4] overflow-hidden bg-white/5 rounded-lg glass-card p-2 transition-all duration-500 hover:shadow-lg hover:shadow-portfolio-accent1/30 hover:border-portfolio-accent1/50 hover:scale-105">
                    <img 
                      src={image} 
                      alt={`Certification ${index + 1}`} 
                      className="w-full h-full object-contain rounded transition-all duration-500 group-hover:scale-110 filter group-hover:brightness-110" 
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-portfolio-accent1/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                    {/* Click indicator */}
                    <div className="absolute top-2 right-2 bg-white/10 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Progress Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(certificationImages.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index * 4)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(selectedIndex / 4) === index
                  ? 'bg-portfolio-accent1 w-6'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {enlargedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-md animate-fade-in-up"
          onClick={() => setEnlargedImageIndex(null)}
        >
          <div 
            className="enlarge-container relative max-w-4xl max-h-[95vh] w-[95%] p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <img 
                src={certificationImages[enlargedImageIndex]} 
                alt={`Enlarged certification ${enlargedImageIndex + 1}`} 
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
              <button 
                onClick={() => setEnlargedImageIndex(null)}
                className="absolute -top-2 -right-2 bg-gradient-to-r from-portfolio-accent1 to-portfolio-accent2 backdrop-blur-sm rounded-full p-2 text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-portfolio-accent1/30"
                aria-label="Close enlarged view"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Navigation in modal */}
              <button 
                onClick={() => setEnlargedImageIndex(enlargedImageIndex > 0 ? enlargedImageIndex - 1 : certificationImages.length - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => setEnlargedImageIndex(enlargedImageIndex < certificationImages.length - 1 ? enlargedImageIndex + 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/20 transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                {enlargedImageIndex + 1} / {certificationImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsCarousel;
