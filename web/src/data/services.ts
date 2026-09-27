export type IconeServico = 'home' | 'briefcase' | 'sparkle' | 'building' | 'recycle';

export type Servico = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: IconeServico;
  position: number;
};

/**
 * O site lê os serviços da API (/api/services). Esta lista é o conteúdo de
 * origem — serve de seed da base de dados e mantém o site utilizável caso a
 * API esteja indisponível.
 */
export const servicos: Servico[] = [
  {
    slug: 'apartamentos-e-moradias',
    name: 'Apartamentos e moradias',
    tagline: 'Limpeza regular ou profunda para a sua casa',
    description:
      'Cuidamos da sua casa com a atenção que ela merece: cozinhas, casas de banho, quartos, vidros e áreas exteriores. Pode escolher uma limpeza pontual, uma limpeza profunda de fundo ou visitas regulares com a mesma equipa.',
    features: [
      'Limpeza profunda ou manutenção semanal',
      'Produtos seguros para crianças e animais',
      'Equipa fixa e sempre identificada',
    ],
    icon: 'home',
    position: 1,
  },
  {
    slug: 'escritorios-e-lojas',
    name: 'Escritórios e lojas',
    tagline: 'Espaços comerciais prontos a receber clientes',
    description:
      'Mantemos o seu espaço impecável fora do horário de atendimento, para que a equipa chegue a um escritório limpo e os clientes encontrem sempre uma loja cuidada. Incluímos reposição de consumíveis e higienização dos pontos de maior contacto.',
    features: [
      'Limpezas ao final do dia ou de madrugada',
      'Higienização de zonas de maior contacto',
      'Reposição de consumíveis sanitários',
    ],
    icon: 'briefcase',
    position: 2,
  },
  {
    slug: 'limpezas-pos-obra',
    name: 'Limpezas pós-obra',
    tagline: 'Do estaleiro à chave na mão',
    description:
      'Removemos pó fino, restos de tinta, cola, cimento e detritos deixados por remodelações e construções. Entregamos o espaço pronto a habitar, com vidros, rodapés, cantos e caixilharias tratados um a um.',
    features: [
      'Remoção de pó fino e resíduos de obra',
      'Vidros, caixilharias e rodapés incluídos',
      'Recolha e encaminhamento de entulho leve',
    ],
    icon: 'sparkle',
    position: 3,
  },
  {
    slug: 'manutencao-de-condominios',
    name: 'Manutenção de condomínios',
    tagline: 'Áreas comuns tratadas com rotina e registo',
    description:
      'Escadas, halls de entrada, elevadores, garagens e arrecadações limpos segundo um plano acordado com a administração. Cada visita fica registada, para que o condomínio saiba exatamente o que foi feito.',
    features: [
      'Plano de limpeza acordado com a administração',
      'Registo de cada visita e checklist assinada',
      'Lavagem de garagens e zonas exteriores',
    ],
    icon: 'building',
    position: 4,
  },
  {
    slug: 'recolha-de-lixo-porta-a-porta',
    name: 'Recolha de lixo porta a porta',
    tagline: 'Os resíduos saem, sem ninguém ter de descer',
    description:
      'Recolhemos os resíduos à porta de cada fração em horário fixo e encaminhamos para os contentores ou ecopontos. Um serviço simples que faz diferença no dia a dia de condomínios, lojas e escritórios.',
    features: [
      'Horário fixo, combinado consigo',
      'Separação e encaminhamento para ecoponto',
      'Higienização periódica dos contentores',
    ],
    icon: 'recycle',
    position: 5,
  },
];
