import revenueImg from '../../assets/images/revenue.jpeg';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { infraRequirements, revenueStreams } from '../../data/content';
import './Infrastructure.css';

export default function Infrastructure() {
  return (
    <section id="infrastructure" className="infra section">
      <div className="container">
        <SectionHeading
          eyebrow="Growth & Infrastructure"
          title="Built To Scale,"
          highlight="Backed To Sustain"
          description="A lean infrastructure footprint paired with diversified revenue
            streams keeps the Foundation's mission financially sustainable."
        />

        <div className="infra__grid">
          <div className="infra__card infra__card--revenue" data-aos="fade-right" data-aos-duration="850">
            <img src={revenueImg} alt="Revenue growth" className="infra__revenue-img" />
            <div className="infra__card-body">
              <h3>Revenue Streams</h3>
              <ul className="infra__chip-list">
                {revenueStreams.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="infra__card infra__card--requirements" data-aos="fade-left" data-aos-delay="150" data-aos-duration="850">
            <h3>Infra Requirements</h3>
            <ul className="infra__req-list">
              {infraRequirements.map((item) => (
                <li key={item}>
                  <span className="infra__req-icon">
                    <Icon name="building" size={18} color="var(--orange-light)" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
