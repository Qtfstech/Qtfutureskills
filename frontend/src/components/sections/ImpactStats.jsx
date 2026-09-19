import Icon from '../ui/Icon';
import CountUp from '../ui/CountUp';
import { impactStats } from '../../data/content';
import './ImpactStats.css';

export default function ImpactStats() {
  return (
    <section className="impact" aria-label="Our impact in numbers">
      <div className="container">
        <div className="impact__band" data-aos="fade-up">
          {impactStats.map((stat, i) => (
            <div
              className="impact__item"
              key={stat.label}
              data-aos="zoom-in"
              data-aos-delay={120 + i * 100}
            >
              <span className="impact__icon icon-float" style={{ animationDelay: `${i * 0.3}s` }}>
                <Icon name={stat.icon} size={22} color="var(--orange-light)" />
              </span>
              <CountUp value={stat.value} className="impact__value" />
              <span className="impact__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
