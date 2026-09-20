import logo from '../../assets/images/logo-full.jpeg';
import Icon from '../ui/Icon';
import { footerLinks, contactInfo } from '../../data/content';
import './Footer.css';

export default function Footer({ hideQuickLinks = false }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#home" className="footer__logo">
            <img src={logo} alt="Quality Thought Future Skills Foundation" />
          </a>
          <p>
            Bridging the skills gap through world-class certification programs,
            global skilling initiatives, and industry-aligned training.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook"><Icon name="facebook" size={16} /></a>
            <a href="#" aria-label="X"><Icon name="x" size={16} /></a>
            <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={16} /></a>
            <a href="#" aria-label="Instagram"><Icon name="instagram" size={16} /></a>
            <a href="#" aria-label="YouTube"><Icon name="youtube" size={16} /></a>
          </div>
        </div>

        {!hideQuickLinks && (
          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>
        )}

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            {footerLinks.programs.map((link) => (
              <li key={link.label}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Get in Touch</h4>
          <ul className="footer__contact">
            <li><Icon name="phone" size={15} /> {contactInfo.phone}</li>
            <li><Icon name="mail" size={15} /> {contactInfo.email}</li>
            <li><Icon name="clock" size={15} /> {contactInfo.hours}</li>
            <li><Icon name="globe" size={15} /> {contactInfo.website}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} Quality Thought Future Skills Foundation. All rights reserved.</span>
          <span>Empowering Futures Through Skills, Innovation & Excellence</span>
        </div>
      </div>
    </footer>
  );
}
