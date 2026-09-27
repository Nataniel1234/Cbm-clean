import rateLimit from 'express-rate-limit';
import { env } from '../env.js';

/** Protege o formulario publico contra submissoes automatizadas. */
export const quoteLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Recebemos varios pedidos deste dispositivo. Tente novamente mais tarde ou ligue-nos.' },
});
