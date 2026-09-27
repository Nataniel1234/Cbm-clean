/**
 * Ponto único de edição dos dados da CBM Clean.
 * Substitua os valores marcados com «EDITAR» pelos dados reais da empresa.
 */

export type Contacto = {
  etiqueta: string;
  /** Formato apresentado ao visitante */
  display: string;
  /** Apenas dígitos, com indicativo — usado nos links tel: e wa.me */
  raw: string;
  whatsapp: boolean;
};

export const empresa = {
  nome: 'CBM Clean',
  slogan: 'Excelência em limpeza e higiene',
  descricaoCurta:
    'Equipas próprias de limpeza para casas, escritórios, condomínios e espaços em obra.',
  email: 'geral@cbmclean.pt', // EDITAR
  cidade: 'Vila Real', // EDITAR — usado no SEO local
  regiao: 'distrito de Vila Real', // EDITAR
  localidadesServidas: ['Vila Real', 'Régua', 'Chaves', 'Lamego', 'Mirandela'], // EDITAR
  morada: 'Rua Exemplo, 00 — 5000-000 Vila Real', // EDITAR
  nif: '000000000', // EDITAR
  horario: [
    { dias: 'Segunda a sexta', horas: '08:00 — 19:00' },
    { dias: 'Sábado', horas: '09:00 — 13:00' },
    { dias: 'Domingo', horas: 'Fechado' },
  ],
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://www.cbmclean.pt',
  redes: {
    facebook: 'https://facebook.com/cbmclean', // EDITAR
    instagram: 'https://instagram.com/cbmclean', // EDITAR
  },
} as const;

export const contactos: Contacto[] = [
  { etiqueta: 'Geral e orçamentos', display: '+351 900 000 001', raw: '351900000001', whatsapp: true }, // EDITAR
  { etiqueta: 'Condomínios', display: '+351 900 000 002', raw: '351900000002', whatsapp: true }, // EDITAR
  { etiqueta: 'Obras e eventos', display: '+351 900 000 003', raw: '351900000003', whatsapp: true }, // EDITAR
];

/** Número associado ao botão flutuante de WhatsApp. */
export const whatsappPrincipal = contactos[0];

export const mensagemWhatsApp =
  'Olá CBM Clean, gostaria de pedir um orçamento para um serviço de limpeza.';

export function linkWhatsApp(raw: string, mensagem = mensagemWhatsApp): string {
  return `https://wa.me/${raw}?text=${encodeURIComponent(mensagem)}`;
}
