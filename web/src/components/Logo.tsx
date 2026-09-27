import { empresa } from '@/data/company';

type Props = {
  /** 'claro' para fundos escuros, 'escuro' para fundos claros */
  variante?: 'claro' | 'escuro';
  className?: string;
};

/**
 * Marca da CBM Clean: duas folhas a abraçar uma gota de água.
 * Placeholder fiel à identidade — substitua pelo ficheiro oficial quando o tiver.
 */
export function Logo({ variante = 'escuro', className = '' }: Props) {
  const texto = variante === 'claro' ? 'text-white' : 'text-floresta-900';
  const secundario = variante === 'claro' ? 'text-folha-100/80' : 'text-carvao-400';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden>
        <circle cx="24" cy="24" r="24" className="fill-floresta-800" />
        <path
          d="M24 9c5.6 6.8 8.8 11.5 8.8 15.6a8.8 8.8 0 0 1-17.6 0C15.2 20.5 18.4 15.8 24 9Z"
          className="fill-agua-200"
        />
        <path
          d="M24 13.5c3.6 4.6 5.6 7.8 5.6 10.4a5.6 5.6 0 0 1-11.2 0c0-2.6 2-5.8 5.6-10.4Z"
          className="fill-folha-500"
        />
        <path d="M13 31c4 .6 6.6 2.6 8 6-4 .4-6.8-1.4-8-6Z" className="fill-folha-400" />
        <path d="M35 31c-4 .6-6.6 2.6-8 6 4 .4 6.8-1.4 8-6Z" className="fill-folha-400" />
        <circle cx="34" cy="14" r="2" className="fill-ambar-400" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-[1.35rem] font-extrabold tracking-tight ${texto}`}>
          {empresa.nome}
        </span>
        <span className={`mt-1 text-[0.68rem] font-semibold tracking-[0.14em] ${secundario}`}>
          limpeza · higiene
        </span>
      </span>
    </span>
  );
}
