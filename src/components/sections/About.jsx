import booksImg from '../../assets/images/books.png';
import gradcapImg from '../../assets/images/gradcap.png';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { pillars } from '../../data/content';
import './About.css';

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container about__inner">
        <div className="about__visual" data-aos="fade-right" data-aos-duration="900">
          <div className="about__visual-ring" />
          <div className="about__visual-blob about__visual-blob--orange" />
          <div className="about__visual-blob about__visual-blob--teal" />

          <div className="about__visual-card about__visual-card--main">
            <img src={booksImg} alt="Stack of books representing curriculum" />
          </div>
          <div className="about__visual-card about__visual-card--small" data-aos="zoom-in" data-aos-delay="350">
            <img src={gradcapImg} alt="Graduation cap" />
          </div>
          <div className="about__visual-tag" data-aos="fade-up" data-aos-delay="500">
            <Icon name="pin" size={18} color="var(--orange-light)" />
            <div>
              <strong>Pan-India</strong>
              <span>Network of Centers</span>
            </div>
          </div>
        </div>

        <div className="about__content" data-aos="fade-left" data-aos-delay="100">
          <SectionHeading
            align="left"
            eyebrow="About Our Foundation"
            title="Empowering Futures Through"
            highlight="Skills, Innovation & Excellence"
          />
          <p className="about__desc">
            Quality Thought Future Skills Foundation is dedicated to building
            tomorrow's workforce through innovative skill development, global
            partnerships, and industry-aligned certification programs.
          </p>

          <div className="about__vision-mission">
            <div className="about__vm-card about__vm-card--vision" data-aos="fade-up" data-aos-delay="150">
              <div className="about__vm-icon">
                <Icon name="search" size={20} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To create an inclusive and future-ready society where every
                individual has the skills, opportunities, and confidence to
                succeed in a rapidly evolving world.
              </p>
            </div>
            <div className="about__vm-card about__vm-card--mission" data-aos="fade-up" data-aos-delay="250">
              <div className="about__vm-icon">
                <Icon name="flask" size={20} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To bridge the gap between education and employment by
                delivering industry-aligned skilling, promoting
                entrepreneurship, empowering women, supporting education, and
                fostering sustainable livelihoods through strategic
                partnerships and community engagement.
              </p>
            </div>
          </div>

          <div className="about__pillars">
            {pillars.map((pillar, i) => (
              <div
                className={`about__pillar about__pillar--${pillar.color}`}
                key={pillar.title}
                data-aos="fade-up"
                data-aos-delay={300 + i * 130}
              >
                <h4>{pillar.title}</h4>
                <ul>
                  {pillar.items.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
