import express from 'express';
import { postEvents } from '../controllers/events-controller.js';

const router = express.Router();

router.post('/subscriptions', postEvents);

export default router;
