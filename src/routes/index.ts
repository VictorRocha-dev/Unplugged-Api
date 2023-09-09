import express from 'express';
import userRoutes from './userRoutes';
import meditationRoutes from './meditationRoutes';
import binauralRoutes from './binauralRoutes';
import commentRoutes from './commentRoutes';
import moduleRoutes from './moduleRoutes';
import contentRoutes from './contentRoutes';
import habitRoutes from './habitRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/meditations', meditationRoutes);
router.use('/binaurals', binauralRoutes);
router.use('/comments', commentRoutes);
router.use('/modules', moduleRoutes);
router.use('/contents', contentRoutes);
router.use('/habits', habitRoutes);

export default router;
