import './SectionHeading.css';

export default function SectionHeading({ eyebrow, title, highlight, description, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`} data-aos="fade-up">
      {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
      <h2 className="section-heading__title">
        {title} {highlight && <span className="section-heading__highlight">{highlight}</span>}
      </h2>
      {description && <p className="section-heading__desc">{description}</p>}
    </div>
  );
}
