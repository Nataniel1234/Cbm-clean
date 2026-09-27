import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { notFound } from '../lib/errors.js';

export async function listServices(_req: Request, res: Response) {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { position: 'asc' },
  });
  res.json({ data: services });
}

export async function getService(req: Request, res: Response) {
  const service = await prisma.service.findFirst({
    where: { slug: req.params.slug, active: true },
  });
  if (!service) throw notFound('Servico nao encontrado');
  res.json({ data: service });
}
