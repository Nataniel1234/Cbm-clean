import type { NextFunction, Request, RequestHandler, Response } from 'express';

/** O Express 4 nao encaminha rejeicoes de handlers async — este wrapper trata disso. */
export const asyncHandler =
  (handler: RequestHandler): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
