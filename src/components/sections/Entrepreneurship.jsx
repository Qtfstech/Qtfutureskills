import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { entrepreneurshipAreas } from '../../data/content';
import entrepreneurshipImg from '../../assets/focus/entrepreneurship.png';
import './Entrepreneurship.css';

export default function Entrepreneurship() {
  return (
    <section id="entrepreneurship" className="entrepreneurship section">
      <div className="container">
        <div className="entrepreneurship__feature">
          <div className="entrepreneurship__image-wrap" data-aos="fade-right" data-aos-duration="900">
            <img src={entrepreneurshipImg} alt="A mentor guiding an aspiring entrepreneur in a business planning session" />
          </div>

          <div className="entrepreneurship__content" data-aos="fade-left" data-aos-delay="150">
            <SectionHeading
              align="left"
              eyebrow="Entrepreneurship Development"
              title="Future Job Creators,"
              highlight="Backed From Day One"
              description="Future job creators require more than ideas — they need mentorship,
                business skills, access to networks, and growth opportunities."
            />
          </div>
        </div>

        <p className="entrepreneurship__lede" data-aos="fade-up">
          Our entrepreneurship programmes support aspiring entrepreneurs with
        </p>

        <div className="entrepreneurship__grid">
          {entrepreneurshipAreas.map((item, i) => (
            <div
              className="entrepreneurship__card"
              key={item.title}
              data-aos="zoom-in-up"
              data-aos-delay={(i % 3) * 110}
            >
              <div className="entrepreneurship__icon icon-float" style={{ animationDelay: `${i * 0.25}s` }}>
                <Icon name={item.icon} size={24} color="#fff" />
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
