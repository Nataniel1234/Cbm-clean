import { z } from 'zod';

export const frequencies = ['PONTUAL', 'SEMANAL', 'QUINZENAL', 'MENSAL', 'DIARIA'] as const;

/** Schema partilhado entre o formulario (React Hook Form) e a API. */
export const quoteRequestSchema = z.object({
  name: z.string().trim().min(3, 'Indique o seu nome completo').max(120),
  email: z.string().trim().email('Indique um email valido').max(160),
  phone: z
    .string()
    .trim()
    .min(9, 'Indique um numero de telefone valido')
    .max(20)
    .regex(/^[+\d\s().-]+$/, 'O telefone so pode conter numeros e os sinais + ( ) - .'),
  city: z.string().trim().min(2, 'Indique a localidade do servico').max(80),
  address: z.string().trim().max(160).optional().or(z.literal('')),
  serviceSlug: z.string().trim().min(2, 'Escolha o servico pretendido'),
  area: z.coerce.number().int().positive().max(100000).optional(),
  frequency: z.enum(frequencies).default('PONTUAL'),
  message: z.string().trim().min(10, 'Descreva o espaco em duas ou tres linhas').max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: 'E necessario aceitar o tratamento dos dados' }) }),
  // Campo-armadilha: preenchido apenas por robos.
  website: z.string().max(0).optional(),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
