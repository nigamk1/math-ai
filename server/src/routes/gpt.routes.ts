import express from "express";
import { handleGPTResponse } from "../controllers/gpt.controller";

const router = express.Router();
// Async error handling wrapper
const asyncHandler = (
  fn: (req: express.Request, res: express.Response) => Promise<any>
) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    fn(req, res).catch(next);
  };
};
// Endpoint to handle GPT response generation
router.post("/", asyncHandler(handleGPTResponse));

export default router;
