import express from "express";

export const asyncHandler = (
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
