
import { useState, useEffect } from 'react';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center',
      title: 'Shop the Latest Trends',
      subtitle: 'Discover amazing deals on fashion, electronics & more'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop&crop=center',
      title: 'Premium Electronics',
      subtitle: 'Latest gadgets and tech at unbeatable prices'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop&crop=center',
      title: 'Home & Living',
      subtitle: 'Transform your space with our curated collection'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&h=600&fit=crop&crop=center',
      title: 'Beauty & Wellness',
      subtitle: 'Pamper yourself with premium beauty products'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                <div className="text-center text-white max-w-4xl mx-auto">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-8 opacity-90">
                    {slide.subtitle}
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 shadow-lg">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-orange-500 scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300 z-20"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300 z-20"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
