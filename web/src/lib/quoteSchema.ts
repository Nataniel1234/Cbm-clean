import { z } from 'zod';

/** Espelha o schema do servidor: a mesma regra valida o formulário e a API. */
export const frequencias = [
  { valor: 'PONTUAL', etiqueta: 'Serviço pontual' },
  { valor: 'SEMANAL', etiqueta: 'Semanal' },
  { valor: 'QUINZENAL', etiqueta: 'Quinzenal' },
  { valor: 'MENSAL', etiqueta: 'Mensal' },
  { valor: 'DIARIA', etiqueta: 'Diária' },
] as const;

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(3, 'Indique o seu nome completo').max(120),
  email: z.string().trim().email('Indique um email válido').max(160),
  phone: z
    .string()
    .trim()
    .min(9, 'Indique um número de telefone válido')
    .max(20)
    .regex(/^[+\d\s().-]+$/, 'O telefone só pode conter números e os sinais + ( ) - .'),
  city: z.string().trim().min(2, 'Indique a localidade do serviço').max(80),
  address: z.string().trim().max(160).optional().or(z.literal('')),
  serviceSlug: z.string().trim().min(2, 'Escolha o serviço pretendido'),
  area: z.coerce.number().int().positive().max(100000).optional(),
  frequency: z.enum(['PONTUAL', 'SEMANAL', 'QUINZENAL', 'MENSAL', 'DIARIA']).default('PONTUAL'),
  message: z.string().trim().min(10, 'Descreva o espaço em duas ou três linhas').max(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'É necessário aceitar o tratamento dos dados' }),
  }),
  /** Campo-armadilha, invisível para pessoas. */
  website: z.string().max(0).optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
