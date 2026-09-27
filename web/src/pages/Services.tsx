import { Link } from 'react-router-dom';
import { useSeo } from '@/lib/seo';
import { useServicos } from '@/lib/useServicos';
import { ServiceCard } from '@/components/ServiceCard';
import { IconeWhatsApp } from '@/components/Icons';
import { contactos, empresa, linkWhatsApp } from '@/data/company';

export function Services() {
  const { servicos } = useServicos();

  useSeo({
    title: `Serviços de limpeza — ${empresa.nome}`,
    description: `Limpeza de apartamentos e moradias, escritórios e lojas, pós-obra, condomínios e recolha de lixo porta a porta em ${empresa.cidade}.`,
    path: '/servicos',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: servicos.map((servico, indice) => ({
        '@type': 'ListItem',
        position: indice + 1,
        item: {
          '@type': 'Service',
          name: servico.name,
          description: servico.description,
          areaServed: empresa.cidade,
          provider: { '@type': 'LocalBusiness', name: empresa.nome },
        },
      })),
    },
  });

  return (
    <>
      <section className="bg-floresta-900 py-16 text-folha-100/85 lg:py-20">
        <div className="container-cbm max-w-3xl">
          <h1 className="text-[2.2rem] leading-tight text-white sm:text-5xl">
            Os nossos serviços
          </h1>
          <p className="mt-5 text-lg leading-relaxed">
            Cinco serviços, uma forma de trabalhar: plano combinado consigo, equipa fixa e material
            profissional. Escolha o que se aproxima do seu caso — ajustamos o resto no orçamento.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-cbm grid gap-6 lg:grid-cols-2">
          {servicos.map((servico) => (
            <ServiceCard key={servico.slug} servico={servico} detalhado />
          ))}
        </div>
      </section>

      <section className="border-t border-menta-50 py-16">
        <div className="container-cbm max-w-3xl">
          <h2 className="text-2xl">Precisa de algo que não está nesta lista?</h2>
          <p className="mt-3 leading-relaxed">
            Fazemos também limpezas de fim de arrendamento, montras, espaços de eventos e
            higienização de contentores. Descreva-nos o espaço e dizemos-lhe se é um trabalho para
            nós.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/contactos" className="btn-acao">
              Pedir orçamento
            </Link>
            <a
              href={linkWhatsApp(contactos[0].raw)}
              target="_blank"
              rel="noreferrer"
              className="btn-claro"
            >
              <IconeWhatsApp className="h-5 w-5" />
              Perguntar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
