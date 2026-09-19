import { useEffect, useRef, useState } from 'react';

export default function CountUp({ value, duration = 1800, className }) {
  const match = String(value).match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : 0;
  const suffix = match ? match[3] : '';

  const [display, setDisplay] = useState(match ? 0 : value);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!match) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        if (reduceMotion) {
          setDisplay(target);
          return;
        }

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {typeof display === 'number' ? display.toLocaleString('en-IN') : display}
      {suffix}
    </span>
  );
}
