import { Router } from 'express';
import { servicesRouter } from './services.routes.js';
import { quotesRouter } from './quotes.routes.js';
import { prisma } from '../lib/prisma.js';

export const apiRouter = Router();

apiRouter.get('/health', async (_req, res) => {
  const startedAt = Date.now();
  let database = 'up';
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    database = 'down';
  }
  res.json({ status: database === 'up' ? 'ok' : 'degraded', database, latencyMs: Date.now() - startedAt });
});

apiRouter.use('/services', servicesRouter);
apiRouter.use('/quotes', quotesRouter);
