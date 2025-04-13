import express from 'express';
import { handleExplain } from '../controllers/explain.controller'; // Import the existing function

const router = express.Router();

// Async middleware wrapper to handle errors
const asyncHandler = (fn: (req: express.Request, res: express.Response) => Promise<any>) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    fn(req, res).catch(next);
  };
};

// Wrap the async handler with the middleware
router.post('/', asyncHandler(handleExplain));

export default router;