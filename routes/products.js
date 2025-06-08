import express from 'express';
import { getProduct } from '../controllers/products-controller.js';
import { checkAccess } from '../middleware/check-access.js';

const router = express.Router();

router.get('/', checkAccess, getProduct);

export default router;
