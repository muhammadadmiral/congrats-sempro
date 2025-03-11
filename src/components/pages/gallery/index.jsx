import { useEffect } from 'react';
import GalleryGrid from '../../../components/gallery/GalleryGrid';
import PageHeader from '../../../components/shared/PageHeader';

const Gallery = () => {
  useEffect(() => {
    document.title = 'Gallery - Congratulations Nur Fadiyah Azzizah';
  }, []);

  return (
    <div className="pt-16 md:pt-20">
      <PageHeader 
        title="Photo Gallery"
        subtitle="futu futu"
        bgColor="from-secondary-500 to-primary-500"
      />
      
      <div className="px-2 md:px-4 py-4">
        <GalleryGrid />
      </div>
    </div>
  );
};

export default Gallery;