import express from 'express';
import explainRoutes from './explain.routes';
import ttsRoutes from './tts.routes';
import avatarRoutes from './avatar.routes';

const router = express.Router();

// Use route files for modularity
router.use('/api/explain', explainRoutes);
router.use('/api/tts', ttsRoutes);
router.use('/api/avatar', avatarRoutes);

export default router;
