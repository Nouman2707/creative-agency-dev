import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from '@/lib/store';
import { useQuery } from '@tanstack/react-query';
import { HeroSlide } from '@shared/schema';

const HeroSection = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { 
    data: slides = [], 
    isLoading,
    error 
  } = useQuery<HeroSlide[]>({
    queryKey: ['/api/hero-slides'],
  });

  // Auto transition effect
  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [slides]);

  if (isLoading) {
    return (
      <section className="relative h-screen bg-[#36261E] flex items-center justify-center">
        <div className="text-white text-xl">{t('loading')}</div>
      </section>
    );
  }

  if (error || slides.length === 0) {
    return (
      <section className="relative h-screen bg-[#36261E] flex items-center justify-center">
        <div className="text-white text-xl">{t('error')}</div>
      </section>
    );
  }

  return (
    <section className="relative h-screen">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(54, 38, 30, 0.85)), url('${slide.imageUrl}')`
          }}
        />
      ))}
      
      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`transition-all duration-500 ${
                currentSlide === index 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-10 absolute'
              }`}
              style={{ display: currentSlide === index ? 'block' : 'none' }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-poppins leading-tight mb-4">
                {language === 'ar' && slide.titleAr ? slide.titleAr : slide.title}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8">
                {language === 'ar' && slide.subtitleAr ? slide.subtitleAr : slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/work" className="px-8 py-3 bg-[#C9AB81] text-[#36261E] font-medium rounded hover:bg-white transition duration-300">
                  {t('cta.viewOurWork')}
                </Link>
                <Link href="/contact" className="px-8 py-3 border border-white text-white font-medium rounded hover:bg-white hover:text-[#36261E] transition duration-300">
                  {t('cta.getInTouch')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-12 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-[#C9AB81]' : 'bg-white bg-opacity-30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
