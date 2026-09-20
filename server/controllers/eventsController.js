import fs from 'node:fs';
import path from 'node:path';
import { prisma } from '../db.js';
import { slugify } from '../utils/slug.js';
import { EVENTS_UPLOAD_DIR } from '../utils/upload.js';

async function uniqueSlug(title) {
  const base = slugify(title);
  let slug = base;
  let n = 1;
  // eslint-disable-next-line no-await-in-loop
  while (await prisma.event.findUnique({ where: { slug } })) {
    n += 1;
    slug = `${base}-${n}`;
  }
  return slug;
}

export async function listEvents(_req, res, next) {
  try {
    const events = await prisma.event.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: { photos: { orderBy: { createdAt: 'asc' } } },
    });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

export async function getEvent(req, res, next) {
  try {
    const event = await prisma.event.findUnique({
      where: { slug: req.params.slug },
      include: { photos: { orderBy: { createdAt: 'asc' } } },
    });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function createEvent(req, res, next) {
  try {
    const title = (req.body.title || '').trim();
    const description = (req.body.description || '').trim();
    const eventDate = req.body.eventDate ? new Date(req.body.eventDate) : null;

    if (!title) {
      return res.status(400).json({ error: 'Event title is required' });
    }

    const slug = await uniqueSlug(title);
    const count = await prisma.event.count();

    const event = await prisma.event.create({
      data: { title, description, eventDate, slug, sortOrder: count },
      include: { photos: true },
    });

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}

export async function updateEvent(req, res, next) {
  try {
    const id = Number(req.params.id);
    const data = {};
    if (typeof req.body.title === 'string' && req.body.title.trim()) data.title = req.body.title.trim();
    if (typeof req.body.description === 'string') data.description = req.body.description.trim();
    if (req.body.eventDate) data.eventDate = new Date(req.body.eventDate);

    const event = await prisma.event.update({
      where: { id },
      data,
      include: { photos: { orderBy: { createdAt: 'asc' } } },
    });
    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const id = Number(req.params.id);
    const event = await prisma.event.findUnique({ where: { id }, include: { photos: true } });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    event.photos.forEach((photo) => {
      const filePath = path.join(EVENTS_UPLOAD_DIR, path.basename(photo.imageUrl));
      fs.unlink(filePath, () => {});
    });

    await prisma.event.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

export async function uploadPhotos(req, res, next) {
  try {
    const eventId = Number(req.params.id);
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const files = req.files || [];
    if (files.length === 0) {
      return res.status(400).json({ error: 'No photos were uploaded' });
    }

    const photos = await prisma.$transaction(
      files.map((file) =>
        prisma.eventPhoto.create({
          data: {
            eventId,
            imageUrl: `/uploads/events/${file.filename}`,
          },
        })
      )
    );

    res.status(201).json(photos);
  } catch (err) {
    next(err);
  }
}

export async function deletePhoto(req, res, next) {
  try {
    const id = Number(req.params.photoId);
    const photo = await prisma.eventPhoto.findUnique({ where: { id } });
    if (!photo) return res.status(404).json({ error: 'Photo not found' });

    const filePath = path.join(EVENTS_UPLOAD_DIR, path.basename(photo.imageUrl));
    fs.unlink(filePath, () => {});

    await prisma.eventPhoto.delete({ where: { id } });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

export async function addPhoto(req, res, next) {
  try {
    const eventId = Number(req.params.id);
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const imageUrl = (req.body.imageUrl || '').trim();
    const caption = (req.body.caption || '').trim();
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const photo = await prisma.eventPhoto.create({
      data: {
        eventId,
        imageUrl,
        caption: caption || null,
      },
    });

    res.status(201).json(photo);
  } catch (err) {
    next(err);
  }
}

