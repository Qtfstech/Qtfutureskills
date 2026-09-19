export const navLinks = [
  { label: 'Focus Areas', href: '#focus-areas' },
  { label: 'Skilling', href: '#skilling-for-future' },
  { label: 'Employment', href: '#employment-generation' },
  {
    label: 'Others',
    href: '#others',
    children: [
      { label: 'Entrepreneurship', href: '#entrepreneurship' },
      { label: 'SCO', href: '#community-outreach' },
      { label: 'CSR', href: '#csr' },
      { label: 'Event Gallery', href: '/events', route: true },
      { label: 'Partner With Us', href: '#why-partner' },
      { label: 'Get Involved', href: '#get-involved' },
      { label: 'Contact Us', href: '/contact', route: true },
    ],
  },
];

export const eventLink = { label: 'Events', href: '/event' };

export const leadershipTeam = [
  { name: 'Ramana Bhupathi', role: 'Chairman & Managing Director', photo: '/org.jpeg', color: 'orange', position: '40% 20%', zoom: 1.15 },
  { name: 'Krish Chintaluri', role: 'Chief Executive Officer', photo: '/org1.jpeg', color: 'teal', position: '50% 14%', zoom: 1.25 },
  { name: 'Dr. Pavani Kadiyala', role: 'Chief Branding Officer', photo: '/org2.jpeg', color: 'navy', position: '58% 8%', zoom: 1.3 },
  { name: 'Geetha Murthy', role: 'Head Human Resource', photo: '/org3.jpeg', color: 'teal', position: '50% 22%', zoom: 1 },
  { name: 'Sashank Karri', role: 'Head Operations', photo: '/org4.jpeg', color: 'orange', position: '50% 12%', zoom: 1.05 },
];

export const eventStats = [
  { label: 'Speakers', value: '30+' },
  { label: 'Awards', value: '100+' },
  { label: 'Universities', value: '20+' },
  { label: "GCC's", value: '25+' },
  { label: 'Ed Tech Platforms', value: '30+' },
  { label: 'Hiring Heads', value: '300+' },
];

export const eventHighlights = [
  {
    title: 'Keynotes & Panels',
    icon: 'mic',
    desc: 'Industry leaders sharing real insights on future-ready skills.',
  },
  {
    title: 'Awards Ceremony',
    icon: 'trophy',
    desc: 'Recognizing excellence across 10+ categories in tech & learning.',
  },
  {
    title: 'Networking Lounge',
    icon: 'network',
    desc: 'Connect with 300+ professionals from across India.',
  },
  {
    title: 'Startup Pitches',
    icon: 'flask',
    desc: 'Watch emerging ventures present live to a panel of investors.',
  },
];

export const impactStats = [
  { value: '20+', label: 'University Partners', icon: 'building' },
  { value: '25+', label: 'GCC Collaborations', icon: 'globe' },
  { value: '30+', label: 'EdTech Platforms', icon: 'flask' },
  { value: '300+', label: 'Hiring Partners', icon: 'briefcase' },
];

export const heroSlides = [
  {
    image: '/1.png',
    title: 'Access',
    lead: 'Everything begins with access.',
    body: 'Not everyone reaches access.',
    highlight: 'Access reaches everyone.',
  },
  {
    image: '/2.png',
    kicker: 'Not unemployment. Not poverty. Not education.',
    title: 'The Skill Gap.',
    lead: "The single force holding back India's future — and the one enemy this movement exists to defeat.",
  },
  {
    image: '/3.png',
    title: 'The Movement Constitution',
    lead: "India's Employability Movement",
  },
];

export const stats = [
  { label: 'Ongoing Enrollment', icon: 'calendar' },
  { label: 'Multiple Centers', icon: 'pin' },
  { label: 'Year-Round Programs', icon: 'calendar' },
  { label: 'Pan-India Network', icon: 'pin' },
];

export const pillars = [
  {
    title: 'Skill Certifications & Global Council',
    color: 'teal',
    items: [
      'Professional Certification Programs',
      'International Skilling Initiatives',
      'Globally Recognized Credentials',
    ],
  },
  {
    title: 'University Partnerships & Centers of Excellence',
    color: 'navy',
    items: [
      'Collaborations with top universities',
      'Specialized training centers nationwide',
      'Research-driven curriculum design',
    ],
  },
];

export const keyPrograms = [
  { title: 'Skill Certifications', icon: 'check' },
  { title: 'Job Portal', icon: 'briefcase' },
  { title: 'Global Future Skills Network', icon: 'network' },
  { title: 'Franchising', icon: 'building' },
  { title: 'Tech Experience Labs', icon: 'flask' },
  { title: 'Job Fairs', icon: 'calendar' },
  { title: 'Center of Excellence', icon: 'pin' },
  { title: 'Hackathons and Competitions', icon: 'trophy' },
  { title: 'Summits and Conferences', icon: 'mic' },
];

export const programHighlights = [
  {
    title: 'Centers of Excellence',
    icon: 'pin',
    description:
      'Specialized training centers established to deliver advanced, industry-aligned skill development.',
  },
  {
    title: 'Competitions & Hackathons',
    icon: 'trophy',
    description:
      'Skill-building challenges that inspire innovation and real-world problem solving.',
  },
  {
    title: 'Future Skills Summit',
    icon: 'mic',
    description:
      'Annual industry conferences connecting educators, employers, and innovators to shape tomorrow’s workforce.',
  },
];

export const skillingPhotos = [
  { caption: 'Hands-On Tech Labs', desc: 'Practical, lab-based training on industry-grade tools and equipment.' },
  { caption: 'Vocational Skilling', desc: 'Trade-focused training preparing learners for immediate workforce entry.' },
  { caption: 'Industry Seminars', desc: 'Expert-led sessions connecting learners with real-world industry insight.' },
  { caption: 'Campus Partnerships', desc: 'University-aligned classrooms delivering future-ready skilling.' },
  { caption: 'Certified Graduates', desc: 'Celebrating learners who complete certification milestones.' },
  { caption: 'Expert-Led Training', desc: 'Instructors guiding hands-on, skill-specific technical sessions.' },
];

export const galleryPhotos = [
  { caption: 'Mission', desc: 'Diverse students collaborating' },
  { caption: 'Programs', desc: 'Coding classroom' },
  { caption: 'Certifications', desc: 'Certificate ceremony' },
  { caption: 'University Partners', desc: 'Modern university campus' },
  { caption: 'Future Skills', desc: 'AI, Cloud, Cybersecurity visual' },
  { caption: 'Hackathons', desc: 'Students coding together' },
  { caption: 'Job Portal', desc: 'Career guidance/interview' },
  { caption: 'Job Fair', desc: 'Recruitment event' },
  { caption: 'Global Network', desc: 'World map with digital connections' },
  { caption: 'Team', desc: 'Professional collaborative team' },
  { caption: 'Partners', desc: 'Corporate handshake' },
  { caption: 'Contact', desc: 'Modern office reception' },
];

export const networkTeams = [
  'Data Mining Engineers',
  'Digital Marketing Specialists',
  'Corporate Liasoning Team',
  'Operations Team',
  'University Partnerships Liasoning Team',
  'Government Liasoning Team',
  'Web Development Team',
  'Event Management Team',
  'Media Team',
  'Content Management',
];

export const networkChapters = [
  { title: 'Global Secretariat', icon: 'globe', desc: 'Apex governing body steering global strategy and standards.' },
  { title: 'State Chapters', icon: 'pin', desc: 'State-level coordination driving regional skilling initiatives.' },
  { title: 'Regional Chapters', icon: 'network', desc: 'Localized outreach connecting communities and institutions.' },
  { title: 'University Chapters', icon: 'building', desc: 'Campus-level chapters building the next generation of talent.' },
];

export const journeySteps = [
  {
    title: 'Discover & Enroll',
    icon: 'search',
    desc: 'Explore programs aligned to your goals and enroll at a center or university chapter near you.',
  },
  {
    title: 'Train Hands-On',
    icon: 'flask',
    desc: 'Learn by doing in tech experience labs with industry-aligned, expert-led curriculum.',
  },
  {
    title: 'Get Certified',
    icon: 'trophy',
    desc: 'Earn globally recognized credentials validated by our certification council.',
  },
  {
    title: 'Launch Your Career',
    icon: 'briefcase',
    desc: 'Connect with hiring partners through our job portal, job fairs, and placement drives.',
  },
];

export const testimonials = [
  {
    quote:
      'The hands-on lab training completely changed how I learn. Within months of certification, I received offers from three companies through the job portal.',
    name: 'Priya S.',
    role: 'Certified Learner, Cloud Computing',
    initials: 'PS',
  },
  {
    quote:
      'Partnering with the Foundation gave our students access to industry-grade skilling that our campus alone could never provide. Placement outcomes speak for themselves.',
    name: 'Dr. Ramesh K.',
    role: 'Dean, Partner University',
    initials: 'RK',
  },
  {
    quote:
      'We hire from their certified talent pool every quarter. The candidates arrive job-ready — a rare thing in today’s market.',
    name: 'Anita M.',
    role: 'Talent Head, GCC Hiring Partner',
    initials: 'AM',
  },
  {
    quote:
      'Starting a university chapter connected our campus to a national network of mentors, hackathons, and real industry projects.',
    name: 'Vikram T.',
    role: 'Student Chapter Lead',
    initials: 'VT',
  },
];

export const networkJoin = [
  'Start a university chapter on your campus',
  'Partner as an institution or training center',
  'Mentor learners and judge hackathons',
];

export const infraRequirements = [
  'Systems',
  'Digital Board',
  'LED Display',
  'Conference Room',
  '2 Executive Cabins',
  'Website & Brochures',
];

export const revenueStreams = [
  'Establishing COE’s',
  'CSR for Skilling',
  'Memberships',
  'Event Sponsors',
  'Media Ads & Podcasts',
  'Certifications',
  'Courses',
  'Franchising',
];

export const employmentJourney = [
  { title: 'Train', icon: 'flask', desc: 'Industry-aligned skilling that builds job-ready capability.' },
  { title: 'Counsel', icon: 'users', desc: 'One-on-one career counselling to match strengths with roles.' },
  { title: 'Connect', icon: 'network', desc: 'Introductions to employers through job fairs and partnerships.' },
  { title: 'Place', icon: 'briefcase', desc: 'Placement support through internships and apprenticeships.' },
];

export const entrepreneurshipAreas = [
  { title: 'Business Mentoring', icon: 'briefcase' },
  { title: 'Startup Readiness', icon: 'check' },
  { title: 'Business Planning', icon: 'calendar' },
  { title: 'Financial Literacy', icon: 'chart' },
  { title: 'Innovation Support', icon: 'flask' },
  { title: 'Market Linkage', icon: 'globe' },
];

export const outreachAreas = [
  {
    title: 'Education',
    icon: 'book',
    desc: 'Expanding access to quality learning in underserved communities.',
  },
  {
    title: 'Health Awareness',
    icon: 'heart',
    desc: 'Promoting wellbeing through community health initiatives.',
  },
  {
    title: 'Digital Inclusion',
    icon: 'globe',
    desc: 'Bridging the digital divide with access, tools, and literacy.',
  },
  {
    title: 'Environmental Sustainability',
    icon: 'leaf',
    desc: 'Encouraging eco-conscious practices and green initiatives.',
  },
  {
    title: 'Community Development',
    icon: 'network',
    desc: 'Strengthening local infrastructure and shared resources.',
  },
  {
    title: 'Volunteer Engagement',
    icon: 'users',
    desc: 'Mobilizing volunteers to drive grassroots, hands-on impact.',
  },
];

export const csrFocusAreas = [
  { title: 'Skill Development', icon: 'flask' },
  { title: 'Employability', icon: 'briefcase' },
  { title: 'Women Empowerment', icon: 'heart' },
  { title: 'Education', icon: 'book' },
  { title: 'Entrepreneurship', icon: 'chart' },
  { title: 'Rural Development', icon: 'pin' },
  { title: 'Digital Inclusion', icon: 'globe' },
  { title: 'Community Development', icon: 'network' },
];

export const partnerTypes = [
  { title: 'Corporates', icon: 'building' },
  { title: 'Government Departments', icon: 'pin' },
  { title: 'Educational Institutions', icon: 'book' },
  { title: 'Universities', icon: 'building' },
  { title: 'Industry Associations', icon: 'network' },
  { title: 'Development Organizations', icon: 'globe' },
  { title: 'NGOs', icon: 'heart' },
  { title: 'CSR Foundations', icon: 'check' },
  { title: 'Technology Partners', icon: 'flask' },
  { title: 'International Agencies', icon: 'globe' },
];

export const impactApproachSteps = [
  { title: 'Learn', icon: 'search' },
  { title: 'Build Skills', icon: 'flask' },
  { title: 'Earn Certifications', icon: 'trophy' },
  { title: 'Gain Employment', icon: 'briefcase' },
  { title: 'Start Enterprises', icon: 'chart' },
  { title: 'Improve Livelihoods', icon: 'check' },
  { title: 'Empower Communities', icon: 'users' },
  { title: 'Create Sustainable Impact', icon: 'leaf' },
];

export const getInvolvedOptions = [
  {
    title: 'Sponsor',
    icon: 'heart',
    desc: 'Fund education and skilling for those who need it most.',
  },
  {
    title: 'Volunteer',
    icon: 'users',
    desc: 'Share your time, skills, and expertise with our programmes.',
  },
  {
    title: 'Partner',
    icon: 'network',
    desc: 'Collaborate with us through CSR and community initiatives.',
  },
  {
    title: 'Donate',
    icon: 'check',
    desc: 'Support our mission with a contribution of any size.',
  },
];

export const footerLinks = {
  quickLinks: [
    { label: 'Focus Areas', href: '#focus-areas' },
    { label: 'Skilling', href: '#skilling-for-future' },
    { label: 'Employment', href: '#employment-generation' },
    { label: 'Entrepreneurship', href: '#entrepreneurship' },
    { label: 'Contact Us', href: '#contact' },
  ],
  programs: [
    { label: 'SCO', href: '#community-outreach' },
    { label: 'CSR', href: '#csr' },
    { label: 'Partner With Us', href: '#why-partner' },
    { label: 'Get Involved', href: '#get-involved' },
  ],
};

export const contactInfo = {
  phone: '+91-9554234999',
  email: 'support@qtfutureskills.org',
  hours: '24/7 Student Support',
  website: 'www.qtfutureskills.org',
};
