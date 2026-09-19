import { useEffect, useMemo, useRef, useState } from 'react';
import logo from '../../assets/images/logo-full.jpeg';
import './CurtainIntro.css';

const SEEN_KEY = 'qtf_curtain_seen';


const CONFETTI_COLORS = ['#fd5f1c', '#ff3333', '#f14199', '#6228d7', '#fd7135', '#fffcfa'];
const CONFETTI_COUNT = 160;
const COUNTDOWN_START = 15;
const COUNTDOWN_MESSAGES = [
  { at: 15, text: 'Get ready, Telangana! \u{1F680}' },
  { at: 12, text: 'Future-ready skills, coming online…' },
  { at: 9, text: 'Students. Educators. Industry. All in one place.' },
  { at: 6, text: 'Almost there — hold tight!' },
  { at: 3, text: '3… 2… 1… here we go!' },
];


function messageForCount(count) {
  const reached = COUNTDOWN_MESSAGES.filter((m) => m.at >= count);
  return reached.length ? reached[reached.length - 1].text : COUNTDOWN_MESSAGES[0].text;
}
const CIRCUMFERENCE = 2 * Math.PI * 100;
const LAUNCH_HOUR = 10;
const LAUNCH_MINUTE = 30;

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function seededRandom(seed) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}


function fireConfetti(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.scale(dpr, dpr);

  const rand = seededRandom(Date.now() & 0xffffffff);
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.4;
  const pieces = Array.from({ length: CONFETTI_COUNT }, () => {
    const angle = rand() * Math.PI * 2;
    const speed = rand() * 7.5 + 3;
    return {
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: rand() * 6 + 4,
      color: CONFETTI_COLORS[Math.floor(rand() * CONFETTI_COLORS.length)],
      rot: rand() * 360,
      vrot: (rand() - 0.5) * 12,
      life: 0,
      maxLife: 140 + rand() * 55,
    };
  });

  let raf;
  function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let alive = false;
    pieces.forEach((p) => {
      if (p.life > p.maxLife) return;
      alive = true;
      p.vy += 0.12;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      p.life += 1;
      const fade = Math.max(1 - p.life / p.maxLife, 0);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = fade;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
      ctx.restore();
    });
    if (alive) {
      raf = requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }
  tick();
  return () => cancelAnimationFrame(raf);
}

export default function CurtainIntro() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SEEN_KEY));
  const [phase, setPhase] = useState('stage');
  const [count, setCount] = useState(COUNTDOWN_START);
  const [launched, setLaunched] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const canvasRef = useRef(null);

  const launchAt = useMemo(() => {
    const d = new Date();
    d.setHours(LAUNCH_HOUR, LAUNCH_MINUTE, 0, 0);
    return d;
  }, []);
  const unlocked = now >= launchAt;
  const launchTimeLabel = useMemo(
    () => launchAt.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    [launchAt],
  );

  useEffect(() => {
    if (!visible) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  useEffect(() => {
    if (phase !== 'stage' || unlocked) return undefined;
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, [phase, unlocked]);

  useEffect(() => {
    if (phase !== 'countdown') return undefined;
    if (count <= 0) {
      const t = window.setTimeout(() => setPhase('congrats'), 350);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setCount((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, count]);

  useEffect(() => {
    if (phase !== 'congrats') return undefined;
    const stop = canvasRef.current ? fireConfetti(canvasRef.current) : () => {};
    const t = window.setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, '1');
      setVisible(false);
    }, 3400);
    return () => {
      stop();
      window.clearTimeout(t);
    };
  }, [phase]);

  if (!visible) return null;

  const handleLaunch = () => {
    if (!unlocked || launched) return;
    setLaunched(true);
    window.setTimeout(() => setPhase('countdown'), 650);
  };

  const progressOffset = CIRCUMFERENCE * (1 - count / COUNTDOWN_START);

  return (
    <div className="curtain-stage" role="dialog" aria-modal="true" aria-label="QT FutureSkills launch">
      <canvas ref={canvasRef} className="curtain-confetti-canvas" aria-hidden="true" />

      {(phase === 'stage' || phase === 'countdown') && (
        <div className={`launch-stage${phase === 'countdown' ? ' is-fading' : ''}`}>
          <div className="launch-stage__inner">
            <div className="launch-logo-badge">
              <img src={logo} alt="Quality Thought Future Skills Foundation" className="launch-stage__logo" />
            </div>
            <span className="launch-eyebrow">
              <span className="launch-eyebrow__dot" />
              Government of Telangana &middot; IT, Electronics &amp; Communications Dept.
            </span>
            <h1 className="launch-title">
              QT FutureSkills is about
              <br />
              <span className="launch-title__accent">to go live.</span>
            </h1>
            <p className="launch-subtitle">
              A statewide future-skills platform by Quality Thought Future Skills Foundation &mdash; press
              launch to begin the countdown.
            </p>

            <div className={`launch-orbit${launched ? ' is-launched' : ''}${!unlocked ? ' is-locked' : ''}`}>
              <span className="launch-orbit__splash launch-orbit__splash--1" />
              <span className="launch-orbit__splash launch-orbit__splash--2" />
              <span className="launch-orbit__glow" />
              <span className="launch-orbit__ring launch-orbit__ring--1" />
              <span className="launch-orbit__ring launch-orbit__ring--2" />
              <span className="launch-orbit__comet launch-orbit__comet--1" />
              <span className="launch-orbit__comet launch-orbit__comet--2" />
              <button
                type="button"
                className={`launch-button${launched ? ' is-launched' : ''}${!unlocked ? ' is-locked' : ''}`}
                onClick={handleLaunch}
                disabled={launched || !unlocked}
                aria-disabled={!unlocked}
              >
                {unlocked ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                )}
                {unlocked ? 'Launch' : formatCountdown(launchAt - now)}
              </button>
            </div>

            <p className={`launch-lock${unlocked ? ' is-unlocked' : ''}`}>
              {unlocked
                ? 'Launch is now open — press the button above.'
                : `Launch unlocks at ${launchTimeLabel} — button opens automatically.`}
            </p>

            <div className="launch-meta">
              <span><b>Domain</b> qtfutureskills.org</span>
              <span><b>Status</b> {unlocked ? 'ready to launch' : `unlocks ${launchTimeLabel}`}</span>
              <span><b>By</b> Quality Thought</span>
            </div>
          </div>
        </div>
      )}

      <div className={`launch-countdown${phase === 'countdown' ? ' is-shown' : ''}`}>
        <p className="launch-countdown__eyebrow">Launch sequence initiated</p>
        <div className="launch-countdown__ring">
          <svg viewBox="0 0 220 220" aria-hidden="true">
            <defs>
              <linearGradient id="launchCountdownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fd5f1c" />
                <stop offset="100%" stopColor="#f14199" />
              </linearGradient>
            </defs>
            <circle className="launch-countdown__track" cx="110" cy="110" r="100" />
            <circle
              className="launch-countdown__progress"
              cx="110"
              cy="110"
              r="100"
              style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: progressOffset }}
            />
          </svg>
          <span className="launch-countdown__number" key={count}>{count}</span>
        </div>
        <p className="launch-countdown__message" key={count}>{messageForCount(count)}</p>
        <p className="launch-countdown__sub">qtfutureskills.org is initializing&hellip;</p>
      </div>

      <div className={`launch-congrats${phase === 'congrats' ? ' is-shown' : ''}`}>
        <div className="launch-congrats__card">
          <div className="launch-logo-badge launch-logo-badge--congrats">
            <img src={logo} alt="Quality Thought Future Skills Foundation" className="launch-congrats__logo" />
          </div>
          <span className="launch-congrats__kicker">Launch Successful</span>
          <h2 className="launch-congrats__title">
            Congratulations!
            <br />
            QT FutureSkills is now live!
          </h2>
          <p>
            <b>qtfutureskills.org</b> has officially launched, opening future-skills learning pathways to
            students and educators across Telangana.
          </p>
          <p className="launch-congrats__loading">Loading homepage&hellip;</p>
        </div>
      </div>
    </div>
  );
}
