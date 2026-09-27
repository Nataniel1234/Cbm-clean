import { useSearchParams } from 'react-router-dom';
import { useSeo } from '@/lib/seo';
import { QuoteForm } from '@/components/QuoteForm';
import {
  IconeEmail,
  IconeMapa,
  IconeRelogio,
  IconeTelefone,
  IconeWhatsApp,
} from '@/components/Icons';
import { contactos, empresa, linkWhatsApp } from '@/data/company';

export function Contact() {
  const [params] = useSearchParams();
  const servicoInicial = params.get('servico') ?? undefined;

  useSeo({
    title: `Contactos e orçamentos — ${empresa.nome}`,
    description: `Peça um orçamento de limpeza em ${empresa.cidade}. Telefone, WhatsApp e formulário online — resposta no próximo dia útil.`,
    path: '/contactos',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      mainEntity: {
        '@type': 'LocalBusiness',
        name: empresa.nome,
        email: empresa.email,
        telephone: `+${contactos[0].raw}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: empresa.morada,
          addressLocality: empresa.cidade,
          addressCountry: 'PT',
        },
      },
    },
  });

  return (
    <>
      <section className="bg-floresta-900 py-16 text-folha-100/85 lg:py-20">
        <div className="container-cbm max-w-3xl">
          <h1 className="text-[2.2rem] leading-tight text-white sm:text-5xl">
            Peça o seu orçamento
          </h1>
          <p className="mt-5 text-lg leading-relaxed">
            Preencha o formulário com a área e o tipo de limpeza. Se preferir resposta imediata,
            ligue-nos ou envie mensagem para um dos números abaixo.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-cbm grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="text-2xl">Formulário de orçamento</h2>
            <p className="mt-2">Leva menos de dois minutos.</p>
            <div className="mt-6">
              <QuoteForm servicoInicial={servicoInicial} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl2 border border-menta-50 bg-white p-7">
              <h2 className="text-xl">Contactos diretos</h2>
              <ul className="mt-5 space-y-5">
                {contactos.map((contacto) => (
                  <li key={contacto.raw}>
                    <p className="text-[0.85rem] font-semibold text-carvao-400">
                      {contacto.etiqueta}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <a
                        href={`tel:+${contacto.raw}`}
                        className="flex items-center gap-2 font-bold text-floresta-900"
                      >
                        <IconeTelefone className="h-5 w-5 text-folha-500" />
                        {contacto.display}
                      </a>
                      {contacto.whatsapp && (
                        <a
                          href={linkWhatsApp(contacto.raw)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-folha-100 px-3 py-1 text-[0.8rem] font-bold text-floresta-800"
                        >
                          <IconeWhatsApp className="h-4 w-4" />
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:${empresa.email}`}
                className="mt-6 flex items-center gap-2 border-t border-menta-50 pt-5 font-bold text-floresta-900"
              >
                <IconeEmail className="h-5 w-5 text-folha-500" />
                {empresa.email}
              </a>
            </div>

            <div className="rounded-xl2 bg-menta-50 p-7">
              <h2 className="text-xl">Onde estamos</h2>
              <p className="mt-4 flex items-start gap-2.5">
                <IconeMapa className="mt-0.5 h-5 w-5 shrink-0 text-folha-500" />
                {empresa.morada}
              </p>
              <ul className="mt-5 space-y-2.5">
                {empresa.horario.map((linha) => (
                  <li key={linha.dias} className="flex items-start gap-2.5">
                    <IconeRelogio className="mt-0.5 h-5 w-5 shrink-0 text-folha-500" />
                    <span>
                      <span className="font-bold text-floresta-900">{linha.dias}</span>
                      <span className="block text-[0.9rem]">{linha.horas}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
