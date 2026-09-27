import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';

/** Valida e substitui req.body pelo resultado tipado do schema. */
export const validateBody =
  (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return next(result.error);
    req.body = result.data;
    next();
  };
