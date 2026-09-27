import type { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { sendQuoteNotification } from '../lib/mailer.js';
import { logger } from '../lib/logger.js';
import type { QuoteRequestInput } from '../schemas/quote.schema.js';

export async function createQuote(req: Request, res: Response) {
  const input = req.body as QuoteRequestInput;

  // Campo-armadilha preenchido: respondemos como sucesso sem gravar nada.
  if (input.website) {
    return res.status(202).json({ data: { received: true } });
  }

  const service = await prisma.service.findUnique({ where: { slug: input.serviceSlug } });

  const quote = await prisma.quoteRequest.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone,
      city: input.city,
      address: input.address || null,
      area: input.area ?? null,
      frequency: input.frequency,
      message: input.message,
      consent: input.consent,
      serviceSlug: input.serviceSlug,
      serviceId: service?.id ?? null,
      ip: req.ip ?? null,
      userAgent: req.get('user-agent') ?? null,
    },
  });

  try {
    await sendQuoteNotification({
      id: quote.id,
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      city: quote.city,
      serviceName: service?.name ?? input.serviceSlug,
      frequency: quote.frequency,
      message: quote.message,
    });
  } catch (error) {
    // O pedido ja esta guardado: uma falha de email nao pode quebrar a resposta ao cliente.
    logger.error({ error, quoteId: quote.id }, 'Falha ao enviar a notificacao por email');
  }

  res.status(201).json({
    data: { id: quote.id, createdAt: quote.createdAt },
    message: 'Pedido recebido. Respondemos no proximo dia util.',
  });
}
