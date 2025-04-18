import express from 'express';
import { handleTTS } from '../controllers/tts.controller';
import { asyncHandler } from '../service/asyncHandler';

const router = express.Router();

// Endpoint to handle TTS generation
router.post('/', asyncHandler(handleTTS));

export default router;