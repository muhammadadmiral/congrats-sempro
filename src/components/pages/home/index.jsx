import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../../components/home/HeroSection';
import FeatureCards from '../../../components/home/FeatureCards';
import TestimonialSection from '../../home/TestimonialSections';
import CallToAction from '../../../components/shared/CallToAction';
import ThesisInfoSection from '../../home/ThesisInfoSection';
const Home = () => {
  useEffect(() => {
    document.title = 'Beranda - Selamat Seminar Proposal Nur Fadiyah Azzizah';
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Thesis Info Section */}
      <ThesisInfoSection />
      
      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center dark:text-white" data-aos="fade-up">Pencapaian Perjalanan</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Jelajahi perjalanan luar biasa dan pencapaian yang diraih oleh Nur Fadiyah Azzizah dalam karir akademisnya.
          </p>
          
          <FeatureCards />
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Call to Action */}
      <CallToAction 
        title="Bergabunglah dalam Perayaan"
        description="Tambahkan pesan ucapan selamat Anda dan jadilah bagian dari momen spesial ini."
        buttonText="Kirim Ucapan"
        buttonLink="/congratulations"
      />
    </div>
  );
};

export default Home;