import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-full.jpeg';
import Icon from '../ui/Icon';
import { navLinks, eventLink } from '../../data/content';
import './Navbar.css';

export default function Navbar({ onOpenAuth, authLabel = 'Join Us' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const ids = [
      'home',
      ...navLinks
        .flatMap((link) => (link.children ? link.children : [link]))
        .filter((l) => !l.route)
        .map((l) => l.href.slice(1)),
    ];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActiveHref(topMost.target.id === 'home' ? null : `#${topMost.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__main">
        <div className="navbar__main-inner">
          <a href="#home" className="navbar__brand">
            <img src={logo} alt="Quality Thought Future Skills Foundation" className="navbar__brand-logo" />
          </a>

          <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className={`navbar__dropdown ${openDropdown === link.href ? 'navbar__dropdown--open' : ''}`}
                  onMouseEnter={() => {
                    if (window.innerWidth > 980) setOpenDropdown(link.href);
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth > 980) setOpenDropdown(null);
                  }}
                >
                  <a
                    href={link.href}
                    className={`navbar__dropdown-trigger ${link.children.some((c) => c.href === activeHref) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDropdown((cur) => (cur === link.href ? null : link.href));
                    }}
                  >
                    {link.label}
                    <Icon name="chevron-down" size={14} className="navbar__dropdown-caret" />
                  </a>
                  <div className="navbar__dropdown-menu">
                    {link.children.map((child) =>
                      child.route ? (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => {
                            setOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {child.label}
                        </Link>
                      ) : (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={() => {
                            setActiveHref(child.href);
                            setOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {child.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={activeHref === link.href ? 'active' : ''}
                  onClick={() => {
                    setActiveHref(link.href);
                    setOpen(false);
                  }}
                >
                  {link.label}
                </a>
              )
            )}
            <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>
            <div className="navbar__cta navbar__cta--mobile">
              <Link to={eventLink.href} className="navbar__event-btn" onClick={() => setOpen(false)}>
                {eventLink.label}
              </Link>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setOpen(false);
                  onOpenAuth?.();
                }}
              >
                {authLabel} <Icon name="arrow" size={16} />
              </button>
            </div>
          </nav>

          <div className="navbar__cta">
            <Link to={eventLink.href} className="navbar__event-btn">{eventLink.label}</Link>
            <button type="button" className="btn btn-primary" onClick={() => onOpenAuth?.()}>
              {authLabel} <Icon name="arrow" size={16} />
            </button>
          </div>

          <button
            className={`navbar__toggle ${open ? 'navbar__toggle--open' : ''}`}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
