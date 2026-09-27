import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  {
    slug: 'apartamentos-e-moradias',
    name: 'Apartamentos e moradias',
    tagline: 'Limpeza regular ou profunda para a sua casa',
    description:
      'Cuidamos da sua casa com a atencao que ela merece: cozinhas, casas de banho, quartos, vidros e areas exteriores. Pode escolher uma limpeza pontual, uma limpeza profunda de fundo ou visitas regulares com a mesma equipa.',
    features: [
      'Limpeza profunda ou manutencao semanal',
      'Produtos seguros para criancas e animais',
      'Equipa fixa e sempre identificada',
    ],
    icon: 'home',
    position: 1,
  },
  {
    slug: 'escritorios-e-lojas',
    name: 'Escritorios e lojas',
    tagline: 'Espacos comerciais prontos a receber clientes',
    description:
      'Mantemos o seu espaco impecavel fora do horario de atendimento, para que a equipa chegue a um escritorio limpo e os clientes encontrem sempre uma loja cuidada. Incluimos reposicao de consumiveis e higienizacao de pontos de contacto.',
    features: [
      'Limpezas ao final do dia ou de madrugada',
      'Higienizacao de zonas de maior contacto',
      'Reposicao de consumiveis sanitarios',
    ],
    icon: 'briefcase',
    position: 2,
  },
  {
    slug: 'limpezas-pos-obra',
    name: 'Limpezas pos-obra',
    tagline: 'Do estaleiro a chave na mao',
    description:
      'Removemos po fino, restos de tinta, cola, cimento e detritos deixados por remodelacoes e construcoes. Entregamos o espaco pronto a habitar, com vidros, rodapes, cantos e caixilharias tratados um a um.',
    features: [
      'Remocao de po fino e residuos de obra',
      'Vidros, caixilharias e rodapes incluidos',
      'Recolha e encaminhamento de entulho leve',
    ],
    icon: 'sparkle',
    position: 3,
  },
  {
    slug: 'manutencao-de-condominios',
    name: 'Manutencao de condominios',
    tagline: 'Areas comuns tratadas com rotina e registo',
    description:
      'Escadas, halls de entrada, elevadores, garagens e arrecadacoes limpos segundo um plano acordado com a administracao. Cada visita fica registada, para que o condominio saiba exatamente o que foi feito.',
    features: [
      'Plano de limpeza acordado com a administracao',
      'Registo de cada visita e checklist assinada',
      'Lavagem de garagens e zonas exteriores',
    ],
    icon: 'building',
    position: 4,
  },
  {
    slug: 'recolha-de-lixo-porta-a-porta',
    name: 'Recolha de lixo porta a porta',
    tagline: 'Os residuos saem, sem ninguem ter de descer',
    description:
      'Recolhemos os residuos a porta de cada fracao em horario fixo e encaminhamos para os contentores ou ecopontos. Um servico simples que faz diferenca no dia a dia de condominios, lojas e escritorios.',
    features: [
      'Horario fixo, combinado consigo',
      'Separacao e encaminhamento para ecoponto',
      'Higienizacao periodica dos contentores',
    ],
    icon: 'recycle',
    position: 5,
  },
];

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`Seed concluido: ${services.length} servicos.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
