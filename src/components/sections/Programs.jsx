import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { programHighlights, skillingPhotos } from '../../data/content';
import skilling1 from '../../assets/images/skilling/skilling-1.jpg';
import skilling2 from '../../assets/images/skilling/skilling-2.jpg';
import skilling3 from '../../assets/images/skilling/skilling-3.jpg';
import skilling4 from '../../assets/images/skilling/skilling-4.jpg';
import skilling5 from '../../assets/images/skilling/skilling-5.jpg';
import skilling6 from '../../assets/images/skilling/skilling-6.jpg';
import './Programs.css';

const skillingImages = [skilling1, skilling2, skilling3, skilling4, skilling5, skilling6];
const skillingShots = skillingPhotos.map((photo, index) => ({ ...photo, src: skillingImages[index] }));

export default function Programs() {
  return (
    <section id="programs" className="programs section">
      <div className="container">
        <SectionHeading
          eyebrow="Our Key Programs"
          title="Programs Built For"
          highlight="Tomorrow's Workforce"
          description="From certifications to franchising, our programs span the full
            skilling lifecycle — designed with industry and delivered with excellence."
        />

        <div className="programs__highlights">
          {programHighlights.map((item, i) => (
            <div className="highlight-card" key={item.title} data-aos="fade-up" data-aos-delay={i * 150}>
              <div className="highlight-card__icon">
                <Icon name={item.icon} size={26} color="#fff" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="programs__gallery">
          <div className="programs__gallery-head" data-aos="fade-up">
            <h3>Skilling In Action</h3>
            <p>A look inside our labs, classrooms, and certification drives nationwide.</p>
          </div>
          <div className="programs__gallery-grid">
            {skillingShots.map((photo, i) => (
              <figure
                className="skilling-photo shine"
                key={photo.caption}
                data-aos="zoom-in"
                data-aos-delay={(i % 3) * 120}
              >
                <img src={photo.src} alt={photo.caption} loading="lazy" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
