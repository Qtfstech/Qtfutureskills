import { Router } from 'express';
import {
  createEventRegistration,
  listEventRegistrations,
  checkInRegistration,
} from '../controllers/eventRegistrationsController.js';

const router = Router();

router.post('/', createEventRegistration);
router.get('/', listEventRegistrations);
router.post('/checkin', checkInRegistration);

export default router;
