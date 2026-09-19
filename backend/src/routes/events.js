import { Router } from 'express';
import {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  uploadPhotos,
  deletePhoto,
} from '../controllers/eventsController.js';
import { uploadEventPhotos } from '../utils/upload.js';

const router = Router();

router.get('/', listEvents);
router.get('/:slug', getEvent);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/photos', uploadEventPhotos.array('photos', 20), uploadPhotos);
router.delete('/photos/:photoId', deletePhoto);

export default router;
