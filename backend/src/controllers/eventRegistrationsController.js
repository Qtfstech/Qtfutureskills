import { prisma } from '../db.js';
import { validateEventRegistration } from '../validators/eventRegistrationValidator.js';
import { fromPassId, withPassId } from '../utils/passId.js';
import { sendRegistrationConfirmationEmail } from '../services/emailService.js';

export async function createEventRegistration(req, res, next) {
  try {
    const errors = validateEventRegistration(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const { name, mobile, email, address } = req.body;
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();

    const existing = await prisma.eventRegistration.findFirst({
      where: {
        OR: [
          { email: trimmedEmail },
          { mobile: trimmedMobile },
        ],
      },
    });

    if (existing) {
      const dupErrors = {};
      if (existing.email.toLowerCase() === trimmedEmail.toLowerCase()) {
        dupErrors.email = 'This email is already registered. Please use another email.';
      }
      if (existing.mobile === trimmedMobile) {
        dupErrors.mobile = 'This mobile number is already registered.';
      }
      return res.status(409).json({
        error: 'You have already registered for this event.',
        errors: dupErrors,
      });
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        name: name.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        address: address.trim(),
      },
    });

    const result = withPassId(registration);

    sendRegistrationConfirmationEmail({
      name: result.name,
      email: result.email,
      mobile: result.mobile,
      passId: result.passId,
    }).catch((err) => console.error('[Email] Uncaught error:', err.message));

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function listEventRegistrations(_req, res, next) {
  try {
    const registrations = await prisma.eventRegistration.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(registrations.map(withPassId));
  } catch (err) {
    next(err);
  }
}

export async function checkInRegistration(req, res, next) {
  try {
    const id = fromPassId(req.body.passId);
    if (!id) {
      return res.status(400).json({ error: 'Enter a valid Pass ID, e.g. FSS-001' });
    }

    const registration = await prisma.eventRegistration.findUnique({ where: { id } });
    if (!registration) {
      return res.status(404).json({ error: 'Pass not found. Check the ID and try again.' });
    }

    if (registration.checkedIn) {
      return res.json({ alreadyCheckedIn: true, registration: withPassId(registration) });
    }

    const updated = await prisma.eventRegistration.update({
      where: { id },
      data: { checkedIn: true },
    });

    res.json({ alreadyCheckedIn: false, registration: withPassId(updated) });
  } catch (err) {
    next(err);
  }
}
