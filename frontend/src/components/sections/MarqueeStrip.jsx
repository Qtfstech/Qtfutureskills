import Icon from '../ui/Icon';
import { keyPrograms } from '../../data/content';
import './MarqueeStrip.css';

export default function MarqueeStrip() {
  const track = [...keyPrograms, ...keyPrograms];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {track.map((program, i) => (
          <span className="marquee__item" key={`${program.title}-${i}`}>
            <Icon name={program.icon} size={16} color="#fff" />
            {program.title}
            <span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
