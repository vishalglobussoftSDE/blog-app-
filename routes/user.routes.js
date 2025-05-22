// routes/user.routes.js
import { Router } from 'express';
import { register, login } from '../controllers/user.controller.js';

const router = Router();

// Register endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', login);

export default router;
