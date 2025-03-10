import { useEffect } from 'react';
import GalleryGrid from '../../../components/gallery/GalleryGrid';
import PageHeader from '../../../components/shared/PageHeader';

const Gallery = () => {
  useEffect(() => {
    document.title = 'Gallery - Congratulations Nur Fadiyah Azzizah';
  }, []);

  return (
    <div className="pt-16">
      <PageHeader 
        title="Photo Gallery"
        subtitle="Capturing the memorable moments of academic achievement and celebration"
        bgColor="from-secondary-500 to-primary-500"
      />
      
      <GalleryGrid />
    </div>
  );
};

export default Gallery;