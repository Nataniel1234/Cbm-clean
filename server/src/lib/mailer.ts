import nodemailer from 'nodemailer';
import { env } from '../env.js';
import { logger } from './logger.js';

const transporter = env.mailEnabled
  ? nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: env.MAIL_SECURE,
      auth: env.MAIL_USER ? { user: env.MAIL_USER, pass: env.MAIL_PASS } : undefined,
    })
  : null;

type QuoteMail = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  serviceName: string;
  frequency: string;
  message: string;
};

/** Envia a notificacao interna do pedido. Se o email nao estiver configurado, apenas regista. */
export async function sendQuoteNotification(quote: QuoteMail): Promise<void> {
  if (!transporter) {
    logger.info({ quoteId: quote.id }, 'Email desativado — pedido gravado apenas na base de dados');
    return;
  }

  const linhas = [
    `Servico: ${quote.serviceName}`,
    `Nome: ${quote.name}`,
    `Telefone: ${quote.phone}`,
    `Email: ${quote.email}`,
    `Localidade: ${quote.city}`,
    `Periodicidade: ${quote.frequency}`,
    '',
    quote.message,
  ].join('\n');

  await transporter.sendMail({
    from: env.MAIL_FROM,
    to: env.MAIL_TO,
    replyTo: quote.email,
    subject: `Novo pedido de orcamento — ${quote.serviceName} (${quote.city})`,
    text: linhas,
  });
}
