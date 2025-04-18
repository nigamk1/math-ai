import express from 'express';
import multer from 'multer';
import { handleAudioUpload } from '../controllers/audio.controller';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for simplicity

// Async error handling wrapper
const asyncHandler = (fn: (req: express.Request, res: express.Response) => Promise<any>) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    fn(req, res).catch(next);
  };
};

// POST route for audio uploads
router.post('/', upload.single('audio'), asyncHandler(handleAudioUpload));

export default router;