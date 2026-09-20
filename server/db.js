// In-memory mock for Prisma client to run without external MySQL database
// Data persists during the active container session

let nextEventId = 1;
let nextPhotoId = 1;
let nextRegId = 1;
let nextMsgId = 1;

const events = [
  {
    id: nextEventId++,
    slug: 'learnathon-5-0',
    title: 'Learnathon 5.0',
    description: 'Our flagship 24-hour learning marathon bringing together 2,000+ passionate students for intensive skill-building, expert mentorship, and high-energy hackathons.',
    eventDate: new Date('2026-08-08'),
    sortOrder: 0,
    createdAt: new Date('2026-08-08'),
  },
  {
    id: nextEventId++,
    slug: 'acharya-devo-bhava',
    title: 'Acharya Devo Bhava',
    description: 'A heartfelt tribute summit honoring over 150 distinguished professors, educators, and institutional mentors shaping tomorrow’s technology leaders.',
    eventDate: new Date('2026-09-05'),
    sortOrder: 1,
    createdAt: new Date('2026-09-05'),
  },
  {
    id: nextEventId++,
    slug: 'future-skills-summit-2026',
    title: 'Future Skills Summit & Awards 2026',
    description: 'Premier state-wide industry conclave at T-Works bringing CXOs, policymakers, and academia together to bridge the employment readiness gap.',
    eventDate: new Date('2026-10-15'),
    sortOrder: 2,
    createdAt: new Date('2026-10-15'),
  },
  {
    id: nextEventId++,
    slug: 'youth-skilling-bootcamps',
    title: 'Youth Skilling & Hands-On Workshops',
    description: 'Intensive career acceleration bootcamps featuring Cisco, AWS Cloud, AI/ML, and Cybersecurity hands-on laboratories.',
    eventDate: new Date('2026-11-20'),
    sortOrder: 3,
    createdAt: new Date('2026-11-20'),
  },
];

const eventPhotos = [
  // Learnathon 5.0
  {
    id: nextPhotoId++,
    eventId: 1,
    imageUrl: '/assets/images/gallery/gallery-1.jpg',
    caption: 'Learnathon 5.0 Opening Ceremony & Keynote Address',
    createdAt: new Date('2026-08-08T09:00:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 1,
    imageUrl: '/assets/images/gallery/gallery-2.jpg',
    caption: 'Students in Collaborative Coding & Problem Solving',
    createdAt: new Date('2026-08-08T11:30:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 1,
    imageUrl: '/assets/images/gallery/gallery-3.jpg',
    caption: 'One-on-One Technical Mentorship with Industry Architects',
    createdAt: new Date('2026-08-08T14:15:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 1,
    imageUrl: '/assets/images/gallery/gallery-4.jpg',
    caption: 'Learnathon Grand Prize Ceremony & Award Distribution',
    createdAt: new Date('2026-08-08T18:00:00Z'),
  },
  // Acharya Devo Bhava
  {
    id: nextPhotoId++,
    eventId: 2,
    imageUrl: '/assets/images/gallery/gallery-5.jpg',
    caption: 'Honoring Distinguished Academic Mentors & College Principals',
    createdAt: new Date('2026-09-05T10:00:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 2,
    imageUrl: '/assets/images/gallery/gallery-6.jpg',
    caption: 'Keynote Panel: Re-imagining Higher Education for AI Era',
    createdAt: new Date('2026-09-05T11:45:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 2,
    imageUrl: '/assets/images/gallery/gallery-7.jpg',
    caption: 'Presentation of Lifetime Contribution in Education Awards',
    createdAt: new Date('2026-09-05T14:00:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 2,
    imageUrl: '/assets/images/gallery/gallery-8.jpg',
    caption: 'Faculty Roundtable on Industry-Academia Curriculum Alignment',
    createdAt: new Date('2026-09-05T16:20:00Z'),
  },
  // Future Skills Summit & Awards 2026
  {
    id: nextPhotoId++,
    eventId: 3,
    imageUrl: '/assets/images/gallery/gallery-9.jpg',
    caption: 'Inaugural Lamp Lighting Ceremony with Dignitaries at T-Works',
    createdAt: new Date('2026-10-15T09:30:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 3,
    imageUrl: '/assets/images/gallery/gallery-10.jpg',
    caption: 'CXO Discussion on National Skilling Initiatives & Workforce 2030',
    createdAt: new Date('2026-10-15T11:00:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 3,
    imageUrl: '/assets/images/gallery/gallery-11.jpg',
    caption: 'Empowering Student Innovators with Project Display Stalls',
    createdAt: new Date('2026-10-15T13:45:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 3,
    imageUrl: '/assets/images/gallery/gallery-12.jpg',
    caption: 'Future Skills Excellence Trophy Presentation',
    createdAt: new Date('2026-10-15T17:00:00Z'),
  },
  // Youth Skilling & Workshops
  {
    id: nextPhotoId++,
    eventId: 4,
    imageUrl: '/assets/images/skilling/skilling-1.jpg',
    caption: 'AWS Cloud Architecture & Serverless Deployment Lab',
    createdAt: new Date('2026-11-20T10:00:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 4,
    imageUrl: '/assets/images/skilling/skilling-2.jpg',
    caption: 'Cybersecurity Threat Defense & Hands-on Sandbox',
    createdAt: new Date('2026-11-20T11:30:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 4,
    imageUrl: '/assets/images/skilling/skilling-3.jpg',
    caption: 'Enterprise Full Stack & Modern Web Development Cohort',
    createdAt: new Date('2026-11-20T13:30:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 4,
    imageUrl: '/assets/images/skilling/skilling-4.jpg',
    caption: 'Women in Tech Special Mentorship Circle & Coding Sprint',
    createdAt: new Date('2026-11-20T15:00:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 4,
    imageUrl: '/assets/images/skilling/skilling-5.jpg',
    caption: 'Mock Technical Interviews & Resume Polishing Session',
    createdAt: new Date('2026-11-20T16:30:00Z'),
  },
  {
    id: nextPhotoId++,
    eventId: 4,
    imageUrl: '/assets/images/skilling/skilling-6.jpg',
    caption: 'CSR Partner Recognition & Rural Skilling Scholarship Awards',
    createdAt: new Date('2026-11-20T17:45:00Z'),
  },
];

const registrations = [];
const contactMessages = [];

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function attachEventPhotos(eventItem) {
  const item = clone(eventItem);
  item.eventDate = eventItem.eventDate;
  item.createdAt = eventItem.createdAt;
  item.photos = eventPhotos
    .filter((p) => p.eventId === item.id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .map(clone);
  return item;
}

export const prisma = {
  event: {
    async count() {
      return events.length;
    },
    async findMany(options = {}) {
      let list = events.map((e) => (options.include?.photos ? attachEventPhotos(e) : clone(e)));
      list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      return list;
    },
    async findUnique(options = {}) {
      const { where = {}, include } = options;
      let found = null;
      if (where.id !== undefined) {
        found = events.find((e) => e.id === Number(where.id));
      } else if (where.slug !== undefined) {
        found = events.find((e) => e.slug === where.slug);
      }
      if (!found) return null;
      return include?.photos ? attachEventPhotos(found) : clone(found);
    },
    async findFirst(options = {}) {
      const { where = {}, include } = options;
      const found = events.find((e) => {
        if (where.slug && e.slug !== where.slug) return false;
        if (where.id && e.id !== where.id) return false;
        return true;
      });
      if (!found) return null;
      return include?.photos ? attachEventPhotos(found) : clone(found);
    },
    async create(options = {}) {
      const { data, include } = options;
      const newEvent = {
        id: nextEventId++,
        slug: data.slug,
        title: data.title,
        description: data.description || '',
        eventDate: data.eventDate || null,
        sortOrder: data.sortOrder ?? events.length,
        createdAt: new Date(),
      };
      events.push(newEvent);
      return include?.photos ? attachEventPhotos(newEvent) : clone(newEvent);
    },
    async update(options = {}) {
      const { where = {}, data = {}, include } = options;
      const index = events.findIndex((e) => e.id === Number(where.id));
      if (index === -1) throw new Error('Event not found');
      events[index] = {
        ...events[index],
        ...data,
      };
      return include?.photos ? attachEventPhotos(events[index]) : clone(events[index]);
    },
    async delete(options = {}) {
      const { where = {} } = options;
      const index = events.findIndex((e) => e.id === Number(where.id));
      if (index === -1) throw new Error('Event not found');
      const [removed] = events.splice(index, 1);
      // Remove associated photos
      for (let i = eventPhotos.length - 1; i >= 0; i--) {
        if (eventPhotos[i].eventId === removed.id) {
          eventPhotos.splice(i, 1);
        }
      }
      return removed;
    },
  },

  eventPhoto: {
    async findUnique(options = {}) {
      const { where = {} } = options;
      const found = eventPhotos.find((p) => p.id === Number(where.id));
      return found ? clone(found) : null;
    },
    async create(options = {}) {
      const { data } = options;
      const newPhoto = {
        id: nextPhotoId++,
        eventId: data.eventId,
        imageUrl: data.imageUrl,
        caption: data.caption || null,
        createdAt: new Date(),
      };
      eventPhotos.push(newPhoto);
      return clone(newPhoto);
    },
    async delete(options = {}) {
      const { where = {} } = options;
      const index = eventPhotos.findIndex((p) => p.id === Number(where.id));
      if (index === -1) throw new Error('Photo not found');
      const [removed] = eventPhotos.splice(index, 1);
      return removed;
    },
  },

  eventRegistration: {
    async findFirst(options = {}) {
      const { where = {} } = options;
      if (where.OR) {
        for (const condition of where.OR) {
          if (condition.email) {
            const match = registrations.find(
              (r) => r.email.toLowerCase() === condition.email.toLowerCase()
            );
            if (match) return clone(match);
          }
          if (condition.mobile) {
            const match = registrations.find((r) => r.mobile === condition.mobile);
            if (match) return clone(match);
          }
        }
        return null;
      }
      if (where.email) {
        const queryEmail =
          typeof where.email === 'string'
            ? where.email
            : where.email.equals || '';
        const match = registrations.find(
          (r) => r.email.toLowerCase() === queryEmail.toLowerCase()
        );
        return match ? clone(match) : null;
      }
      return null;
    },
    async findUnique(options = {}) {
      const { where = {} } = options;
      const found = registrations.find((r) => r.id === Number(where.id));
      return found ? clone(found) : null;
    },
    async findMany(options = {}) {
      const list = registrations.map(clone);
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return list;
    },
    async create(options = {}) {
      const { data } = options;
      const newReg = {
        id: nextRegId++,
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        address: data.address,
        checkedIn: Boolean(data.checkedIn),
        createdAt: new Date(),
      };
      registrations.push(newReg);
      return clone(newReg);
    },
    async update(options = {}) {
      const { where = {}, data = {} } = options;
      const index = registrations.findIndex((r) => r.id === Number(where.id));
      if (index === -1) throw new Error('Registration not found');
      registrations[index] = {
        ...registrations[index],
        ...data,
      };
      return clone(registrations[index]);
    },
  },

  contactMessage: {
    async create(options = {}) {
      const { data } = options;
      const newMsg = {
        id: nextMsgId++,
        name: data.name,
        email: data.email,
        message: data.message,
        createdAt: new Date(),
      };
      contactMessages.push(newMsg);
      return clone(newMsg);
    },
    async findMany(options = {}) {
      const list = contactMessages.map(clone);
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return list;
    },
  },

  async $transaction(promises) {
    return Promise.all(promises);
  },
};
