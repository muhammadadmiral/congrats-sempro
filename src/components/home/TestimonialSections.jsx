import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "누르의 연구 제안서는 뛰어나며, 재료에 대한 깊은 이해를 보여주고 혁신적인 솔루션을 제공합니다. 방법론적 접근 방식은 매우 체계적이고 측정 가능합니다.",
    name: "Prof. Dr. Hj. Lee Sung-Kyung",
    title: "Dosen Pembimbing",
    image: "/public/images/lee-sungkyung.jpeg"
  },
  {
    id: 2,
    quote: "Ada masaaaaa nya kitaaaaaaaaaaaaaaaaaaaaaaa, Mencuri ruang dan waktuuuuuuuuuuuuuuuuu. Walauuu pastiii beeeerlalluuuu biaaaarrkan sajaaa kitaaa keeesanaaaaaaaa seeeelaaaagii maasih bisa bersamaaaa",
    name: "Dr. Daniel Baskara Putra ",
    title: "Ketua Departemen",
    image: "/public/images/baskara.jpg"
  },
  {
    id: 3,
    quote: "Presentasi yang menonjol dengan efektivitas mengkomunikasikan ide-ide kompleks dengan percaya diri dan menjawab pertanyaan-pertanyaan menantang dengan sangat baik.",
    name: "Budi Saksono, M.Sc., Ph.D.",
    title: "Dosen Pembimbing BRIN",
    image: "/public/images/pa-budi.jpg"
  },
  {
    id: 4,
    quote: "hehe",
    name: "miral",
    title: "gamtemk",
    image: "/public/images/miral.jpg"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((current) => (current + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const handleDotClick = (index) => {
    if (isAnimating || index === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary-200 dark:bg-primary-900 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-secondary-200 dark:bg-secondary-900 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div
          data-aos="fade-up"
          className="max-w-5xl mx-auto text-center mb-12"
        >
          <h2 className="section-title dark:text-white">Kata Mereka</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pendapat dari para dosen dan anggota komite tentang penampilan mengesankan Nur Fadiyah Azzizah selama seminar proposal skripsi.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons (Desktop) */}
          {!isMobile && (
            <>
              <button 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 z-20 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all"
                onClick={goToPrev}
                disabled={isAnimating}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 z-20 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all"
                onClick={goToNext}
                disabled={isAnimating}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Testimonial Cards */}
          <div className="relative min-h-[280px] md:min-h-[320px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`absolute inset-0 ${
                  activeIndex === index ? "z-10" : "z-0 pointer-events-none"
                }`}
              >
                <div className="card-fancy dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col justify-between p-0 overflow-hidden">
                  <div className="p-6 md:p-8">
                    <svg
                      className="w-12 h-12 text-primary-200 dark:text-primary-800 mb-4"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-xl text-gray-700 dark:text-gray-300 italic mb-6 elegant-quote">
                      {testimonial.quote}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 flex items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold overflow-hidden">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(/\s+/g, '+')}&background=0D8ABC&color=fff`;
                          }}
                        />
                      ) : (
                        testimonial.name.charAt(0)
                      )}
                    </div>
                    <div className="ml-4 text-left">
                      <h4 className="font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/80 text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 focus:outline-none ${
                  activeIndex === index
                    ? "bg-primary-500 w-6"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;