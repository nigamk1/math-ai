import express from 'express';
import { handleAvatar } from '../controllers/avatar.controller'; // Import the controller function

const router = express.Router();

const asyncHandler = (fn: (req: express.Request, res: express.Response) => Promise<any>) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    fn(req, res).catch(next);
  };
};
// Route for generating or fetching avatar
router.post('/', asyncHandler(handleAvatar)); // Use the controller function to handle the POST request

export default router;