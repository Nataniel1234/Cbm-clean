import { Link } from 'react-router-dom';
import { IconeDoServico, IconeVisto } from '@/components/Icons';
import type { Servico } from '@/data/services';

type Props = { servico: Servico; detalhado?: boolean };

export function ServiceCard({ servico, detalhado = false }: Props) {
  return (
    <article
      id={servico.slug}
      className="scroll-mt-28 rounded-xl2 border border-menta-50 bg-white p-7 transition-colors hover:border-folha-400"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-menta-50 text-floresta-700">
        <IconeDoServico nome={servico.icon} className="h-6 w-6" />
      </span>

      <h3 className="mt-5 text-xl">{servico.name}</h3>
      <p className="mt-1 font-semibold text-folha-500">{servico.tagline}</p>
      <p className="mt-3 leading-relaxed">{servico.description}</p>

      {detalhado && (
        <ul className="mt-5 space-y-2.5 border-t border-menta-50 pt-5">
          {servico.features.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <IconeVisto className="mt-1 h-4 w-4 shrink-0 text-folha-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/contactos?servico=${servico.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 font-bold text-floresta-800 underline decoration-folha-400 decoration-2 underline-offset-4 hover:decoration-laranja-500"
      >
        Pedir orçamento para este serviço
      </Link>
    </article>
  );
}
