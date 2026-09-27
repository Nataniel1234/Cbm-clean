import type { ReactElement, SVGProps } from 'react';
import type { IconeServico } from '@/data/services';

type Props = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const IconeCasa = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5" />
    <path d="M10 21v-6h4v6" />
  </svg>
);

export const IconeEscritorio = (p: Props) => (
  <svg {...base} {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
    <path d="M3 12.5h18" />
  </svg>
);

export const IconeBrilho = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M11 3.5 12.8 8 17.5 9.8 12.8 11.6 11 16.2 9.2 11.6 4.5 9.8 9.2 8Z" />
    <path d="M17.5 14.5 18.4 17 21 17.9 18.4 18.8 17.5 21.3 16.6 18.8 14 17.9 16.6 17Z" />
  </svg>
);

export const IconePredio = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
    <path d="M15 10h3a2 2 0 0 1 2 2v9" />
    <path d="M2.5 21h19" />
    <path d="M8 7.5h3M8 11.5h3M8 15.5h3" />
  </svg>
);

export const IconeReciclagem = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M9.6 5.3 12 2l2.4 3.3" />
    <path d="M12 2v7" />
    <path d="m5.2 12.4-1.7 3.9 3.9.6" />
    <path d="m3.5 16.3 6.2-3.3" />
    <path d="m18.8 12.4 1.7 3.9-3.9.6" />
    <path d="M20.5 16.3 14.3 13" />
    <path d="M8 21h8" />
  </svg>
);

export const IconeWhatsApp = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.88 9.88 0 0 0 12.04 2Zm0 18.16h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.24 8.24 0 0 1 12.78-10.2 8.16 8.16 0 0 1 2.42 5.85c0 4.56-3.7 8.2-8.23 8.2Zm4.52-6.15c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

export const IconeTelefone = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.2 2 2 0 0 1 6.5 3Z" />
  </svg>
);

export const IconeEmail = (p: Props) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const IconeRelogio = (p: Props) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </svg>
);

export const IconeMapa = (p: Props) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconeVisto = (p: Props) => (
  <svg {...base} {...p}>
    <path d="m4.5 12.5 4.5 4.5 10.5-11" />
  </svg>
);

export const IconeGota = (p: Props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.5c4.2 5.1 6.6 8.6 6.6 11.6a6.6 6.6 0 1 1-13.2 0c0-3 2.4-6.5 6.6-11.6Z" />
  </svg>
);

export const IconeMenu = (p: Props) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconeFechar = (p: Props) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

const mapa = {
  home: IconeCasa,
  briefcase: IconeEscritorio,
  sparkle: IconeBrilho,
  building: IconePredio,
  recycle: IconeReciclagem,
} satisfies Record<IconeServico, (p: Props) => ReactElement>;

export function IconeDoServico({ nome, ...props }: Props & { nome: string }) {
  const Componente = mapa[nome as IconeServico] ?? IconeBrilho;
  return <Componente {...props} />;
}
