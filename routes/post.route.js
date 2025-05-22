import { Router } from 'express';
import { createPost ,getAllPost } from '../controllers/post.controller.js';

const router = Router();

router.post('/create-post' , createPost);
router.get('/all-post' , getAllPost);
 
export default router;