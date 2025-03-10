import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../../components/home/HeroSection';
import FeatureCards from '../../../components/home/FeatureCards';
import TestimonialSection from '../../home/TestimonialSections';
import CallToAction from '../../../components/shared/CallToAction';

const Home = () => {
  useEffect(() => {
    document.title = 'Home - Congratulations Nur Fadiyah Azzizah';
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center" data-aos="fade-up">Achievements Journey</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
            Explore the incredible journey and milestones achieved by Nur Fadiyah Azzizah on her academic path.
          </p>
          
          <FeatureCards />
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Call to Action */}
      <CallToAction 
        title="Join the Celebration"
        description="Add your congratulatory message and be part of this special moment."
        buttonText="Send Wishes"
        buttonLink="/congratulations"
      />
    </div>
  );
};

export default Home;