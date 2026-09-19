import Icon from '../ui/Icon';
import { getInvolvedOptions } from '../../data/content';
import './GetInvolved.css';

export default function GetInvolved() {
  return (
    <section id="get-involved" className="get-involved">
      <div className="container">
        <header className="get-involved__head" data-aos="fade-up">
          <span className="get-involved__eyebrow">Get Involved</span>
          <h2>Every Individual Has The Power To Create Meaningful Change</h2>
          <p>
            Whether you wish to sponsor education, support skilling initiatives, volunteer
            your expertise, partner through CSR, or collaborate on community programmes —
            Future Skills Foundation welcomes your participation. Together, we can create
            opportunities, transform lives, and build a future where everyone has the
            skills to succeed.
          </p>
        </header>

        <div className="get-involved__grid">
          {getInvolvedOptions.map((item, i) => (
            <a
              className="get-involved__card"
              href="#contact"
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={i * 110}
            >
              <span className="get-involved__icon icon-float" style={{ animationDelay: `${i * 0.3}s` }}>
                <Icon name={item.icon} size={24} color="#fff" />
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="get-involved__link">
                Learn more <Icon name="arrow" size={14} color="#fff" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
