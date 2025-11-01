
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
    "/lovable-uploads/emotional-intelligence-cert.png",
    "/lovable-uploads/e781d855-01d8-48eb-9cb6-ca9f1f38dce3.png",
    "/lovable-uploads/f83d624f-26c8-4438-89b8-0d80152b0bcd.png",
    "/lovable-uploads/94b648ff-3f65-4a31-b5b6-06f62e54b400.png",
    "/lovable-uploads/804fcc80-9983-4d28-832b-f502e2e28656.png",
    "/lovable-uploads/f7c7bfc3-745d-48c4-8d3d-366258fcfc6a.png",
    "/lovable-uploads/7674b09c-9c95-4e80-9499-673907339057.png",
    "/lovable-uploads/9bc76bd3-15cd-4242-9690-7c6434bce442.png",
    "/lovable-uploads/f3312639-eb35-452f-ae30-97c48b84a18b.png",
    "/lovable-uploads/0c5f6ec1-84e8-4d31-b3be-f39ba403ca28.png",
    "/lovable-uploads/2905e86a-4c22-4d42-9d9a-d17f58536e9e.png",
    "/lovable-uploads/f0b37675-c35b-4ac9-9087-86e890edd0b5.png",
    "/lovable-uploads/b1916ff5-0ffb-4b01-95ad-5ee2a77cb836.png",
    "/lovable-uploads/2e39b7c1-3bae-4ab8-a1f5-90b1a84f3194.png",
    "/lovable-uploads/6db1c601-4115-4235-84da-53112fe50963.png",
    "/lovable-uploads/56b24279-8840-4c12-ac51-9e07548ddea4.png",
    "/lovable-uploads/57d980dc-aba2-4740-98bf-756cc11a3ee9.png",
    "/lovable-uploads/5de6d128-16b1-4800-b6a5-015fee255fd2.png",
    "/lovable-uploads/7161171a-f054-4187-a901-dfe09e029c21.png",
    "/lovable-uploads/13890275-b3da-410e-96cb-b1d0c7cdbcfc.png",
    "/lovable-uploads/ed45f909-8601-4120-a067-00d9cc3fce8a.png",
    "/lovable-uploads/a2961e4e-7552-464d-bdae-1be69245e6d5.png",
    "/lovable-uploads/9f286042-1d0b-4fb7-84a5-cc52ae250e00.png",
    "/lovable-uploads/2333df64-3e3e-4b51-b56c-b33fd83514f7.png",
    "/lovable-uploads/d33a28ba-337b-4e3c-a9c4-ff30b12ede42.png",
    "/lovable-uploads/bed9c83c-7e0d-4803-8783-77b6dd15c284.png",
    "/lovable-uploads/8cb77b92-4865-4957-8a58-00d304af70b1.png",
    "/lovable-uploads/6cd3c97b-c4b0-44bb-9191-b6f322ad26b0.png",
    "/lovable-uploads/c484f7c8-f1c5-43f2-9a14-9f3bdd605e80.png",
    "/lovable-uploads/e9342ac4-c5c6-4033-b1cc-6f20aafc1540.png",
    "/lovable-uploads/7a6a412e-a03a-4a92-9bcc-eeda8cd98831.png",
    "/lovable-uploads/9d61c4e5-2f4b-4eda-8e2c-8230ba5984f2.png",
    "/lovable-uploads/0a667ae8-1d40-4f1c-9fdd-41675d5d9fd0.png",
    "/lovable-uploads/59bf5a14-b662-44b6-a2b1-401657882a8d.png",
    "/lovable-uploads/ffe664df-7ef1-47c6-9524-8b5f1ea00794.png",
    "/lovable-uploads/32e5a82c-4fa1-4dc1-9b8a-e2c1c6840c35.png",
    "/lovable-uploads/4449bac6-aa96-4a3b-b9d9-eb16a344df21.png",
    "/lovable-uploads/a359fd78-75ab-43fe-8ddb-e08f82c9d4e3.png",
    "/lovable-uploads/5881efaf-6c89-407a-8b87-a02e637a76f4.png",
    "/lovable-uploads/34c7fabc-f1a8-4b12-b21a-46eb582431a6.png",
    "/lovable-uploads/df73e8bf-5e5d-460e-8ff9-fbf0e736ad92.png",
    "/lovable-uploads/df5c5f1f-46bc-44c0-ae6a-ecd4825c962f.png",
    "/lovable-uploads/93ab334b-dab8-4ea6-a6f9-552efe493517.png",
    "/lovable-uploads/6a829f10-cacf-4daf-aed6-f2e6c94c95c4.png",
    "/lovable-uploads/b23269a7-4154-4dda-9deb-ccc76a0efc78.png"
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
