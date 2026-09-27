import { Router } from 'express';
import { createQuote } from '../controllers/quotes.controller.js';
import { validateBody } from '../middleware/validate.js';
import { quoteLimiter } from '../middleware/rateLimit.js';
import { quoteRequestSchema } from '../schemas/quote.schema.js';
import { asyncHandler } from '../lib/asyncHandler.js';

export const quotesRouter = Router();

quotesRouter.post('/', quoteLimiter, validateBody(quoteRequestSchema), asyncHandler(createQuote));
