import { prisma } from '../db.js';
import { validateContactMessage } from '../validators/contactMessageValidator.js';

export async function createContactMessage(req, res, next) {
  try {
    const errors = validateContactMessage(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const { name, email, message } = req.body;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      },
    });

    res.status(201).json(contactMessage);
  } catch (err) {
    next(err);
  }
}

export async function listContactMessages(_req, res, next) {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
}
