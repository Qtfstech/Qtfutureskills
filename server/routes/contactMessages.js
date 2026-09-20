import { Router } from 'express';
import { createContactMessage, listContactMessages } from '../controllers/contactMessagesController.js';

const router = Router();

router.post('/', createContactMessage);
router.get('/', listContactMessages);

export default router;
