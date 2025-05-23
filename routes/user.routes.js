// routes/user.routes.js
import { Router } from 'express';
import { register, login, logout } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout' , authenticate , logout);

export default router;
