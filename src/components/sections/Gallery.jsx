import { useEffect, useState } from 'react';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { galleryPhotos } from '../../data/content';
import gallery1 from '../../assets/images/gallery/gallery-1.jpg';
import gallery2 from '../../assets/images/gallery/gallery-2.jpg';
import gallery3 from '../../assets/images/gallery/gallery-3.jpg';
import gallery4 from '../../assets/images/gallery/gallery-4.jpg';
import gallery5 from '../../assets/images/gallery/gallery-5.jpg';
import gallery6 from '../../assets/images/gallery/gallery-6.jpg';
import gallery7 from '../../assets/images/gallery/gallery-7.jpg';
import gallery8 from '../../assets/images/gallery/gallery-8.jpg';
import gallery9 from '../../assets/images/gallery/gallery-9.jpg';
import gallery10 from '../../assets/images/gallery/gallery-10.jpg';
import gallery11 from '../../assets/images/gallery/gallery-11.jpg';
import gallery12 from '../../assets/images/gallery/gallery-12.jpg';
import './Gallery.css';

const galleryImages = [
  gallery1, gallery2, gallery3, gallery4, gallery5,
  gallery6, gallery7, gallery8, gallery9, gallery10,
  gallery11, gallery12,
];
const photos = galleryPhotos.map((photo, index) => ({ ...photo, src: galleryImages[index] }));

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % photos.length);
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments From Our"
          highlight="Skilling Journey"
          description="A glimpse into our classrooms, labs, summits, and graduation
            days — captured across centers nationwide."
        />

        <div className="gallery__grid">
          {photos.map((photo, index) => (
            <button
              type="button"
              className="gallery__item shine"
              key={photo.caption}
              onClick={() => setActiveIndex(index)}
              data-aos="zoom-in"
              data-aos-delay={(index % 4) * 90}
            >
              <img src={photo.src} alt={photo.desc || photo.caption} loading="lazy" />
              <span className="gallery__item-caption">{photo.caption}</span>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div className="gallery__lightbox" onClick={() => setActiveIndex(null)}>
          <button
            type="button"
            className="gallery__lightbox-close"
            aria-label="Close"
            onClick={() => setActiveIndex(null)}
          >
            <Icon name="x" size={18} color="#fff" />
          </button>
          <img
            src={photos[activeIndex].src}
            alt={photos[activeIndex].desc || photos[activeIndex].caption}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="gallery__lightbox-caption">{photos[activeIndex].caption}</span>
        </div>
      )}
    </section>
  );
}
