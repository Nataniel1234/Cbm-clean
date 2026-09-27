import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { IconeEmail, IconeMapa, IconeRelogio, IconeTelefone } from '@/components/Icons';
import { contactos, empresa } from '@/data/company';
import { servicos } from '@/data/services';

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-floresta-900 text-folha-100/75">
      <div className="container-cbm grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo variante="claro" />
          <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed">
            {empresa.descricaoCurta} Trabalhamos em {empresa.cidade} e em todo o {empresa.regiao}.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">Serviços</h3>
          <ul className="space-y-2.5 text-[0.95rem]">
            {servicos.map((servico) => (
              <li key={servico.slug}>
                <Link to={`/servicos#${servico.slug}`} className="hover:text-white">
                  {servico.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">Contactos</h3>
          <ul className="space-y-3 text-[0.95rem]">
            {contactos.map((contacto) => (
              <li key={contacto.raw}>
                <a
                  href={`tel:+${contacto.raw}`}
                  className="flex items-start gap-2.5 hover:text-white"
                >
                  <IconeTelefone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-folha-500" />
                  <span>
                    {contacto.display}
                    <span className="block text-[0.8rem] text-folha-100/50">
                      {contacto.etiqueta}
                    </span>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${empresa.email}`}
                className="flex items-center gap-2.5 hover:text-white"
              >
                <IconeEmail className="h-4.5 w-4.5 shrink-0 text-folha-500" />
                {empresa.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <IconeMapa className="mt-0.5 h-4.5 w-4.5 shrink-0 text-folha-500" />
              {empresa.morada}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">Horário</h3>
          <ul className="space-y-2.5 text-[0.95rem]">
            {empresa.horario.map((linha) => (
              <li key={linha.dias} className="flex items-start gap-2.5">
                <IconeRelogio className="mt-0.5 h-4.5 w-4.5 shrink-0 text-folha-500" />
                <span>
                  {linha.dias}
                  <span className="block text-[0.8rem] text-folha-100/50">{linha.horas}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link to="/contactos" className="btn-acao mt-6 w-full">
            Pedir orçamento
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-cbm flex flex-col gap-2 py-6 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {empresa.nome} · NIF {empresa.nif}
          </p>
          <p>
            Reclamações:{' '}
            <a
              href="https://www.livroreclamacoes.pt"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white"
            >
              Livro de Reclamações
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
