import express from 'express';
import multer from 'multer';
import { handleDIDAvatarGeneration } from '../controllers/dld.controller';
import { asyncHandler } from '../service/asyncHandler'; 

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary directory for audio files

// POST route to handle D-ID Avatar generation
router.post('/', upload.single('audio'), asyncHandler(handleDIDAvatarGeneration));

export default router;