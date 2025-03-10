import { useEffect } from 'react';
import TimelineComponent from '../../../components/timeline/TimelineComponent';
import PageHeader from '../../../components/shared/PageHeader';
import CallToAction from '../../../components/shared/CallToAction';

const Timeline = () => {
  useEffect(() => {
    document.title = 'Timeline - Congratulations Nur Fadiyah Azzizah';
  }, []);

  return (
    <div className="pt-16">
      <PageHeader 
        title="Academic Journey"
        subtitle="Exploring the key milestones and achievements in chronological order"
        bgColor="from-accent-500 to-primary-500"
      />
      
      <TimelineComponent />
      
      <CallToAction 
        title="Share Your Congratulations"
        description="Add a personal message to celebrate this significant achievement."
        buttonText="Add Message"
        buttonLink="/congratulations"
      />
    </div>
  );
};

export default Timeline;