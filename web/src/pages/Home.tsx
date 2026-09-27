import { Link } from 'react-router-dom';
import { useSeo } from '@/lib/seo';
import { useServicos } from '@/lib/useServicos';
import { ServiceCard } from '@/components/ServiceCard';
import {
  IconeDoServico,
  IconeGota,
  IconeTelefone,
  IconeVisto,
  IconeWhatsApp,
} from '@/components/Icons';
import { contactos, empresa, linkWhatsApp } from '@/data/company';

const garantias = [
  {
    titulo: 'Equipas próprias e identificadas',
    texto: 'Os mesmos profissionais em cada visita, com formação e seguro de trabalho.',
  },
  {
    titulo: 'Orçamento claro, sem surpresas',
    texto: 'O valor apresentado inclui material, deslocação e horas de trabalho.',
  },
  {
    titulo: 'Horários que respeitam o seu',
    texto: 'Limpamos fora do horário de atendimento ou quando a casa está vazia.',
  },
  {
    titulo: 'Produtos com registo e segurança',
    texto: 'Detergentes certificados, seguros para crianças, animais e superfícies delicadas.',
  },
];

const passos = [
  {
    titulo: 'Conte-nos o que precisa',
    texto: 'Pelo formulário ou por WhatsApp, com a área do espaço e o tipo de limpeza.',
  },
  {
    titulo: 'Recebe o orçamento',
    texto: 'Respondemos no dia útil seguinte com o preço, a duração e o que fica incluído.',
  },
  {
    titulo: 'A equipa entra em ação',
    texto: 'Marcamos a data, a equipa chega com todo o material e deixa o espaço pronto.',
  },
];

export function Home() {
  const { servicos } = useServicos();

  useSeo({
    title: `${empresa.nome} — Empresa de limpeza em ${empresa.cidade}`,
    description: `Limpeza de apartamentos, escritórios, condomínios e pós-obra em ${empresa.cidade} e no ${empresa.regiao}. Equipas próprias e orçamento sem compromisso.`,
    path: '/',
  });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-floresta-900 text-folha-100/85">
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, var(--color-folha-500), transparent 65%)',
          }}
          aria-hidden
        />
        <IconeGota
          className="pointer-events-none absolute -bottom-16 right-[8%] hidden h-80 w-80 text-white/5 lg:block"
          aria-hidden
        />

        <div className="container-cbm relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[0.85rem] font-semibold text-folha-100">
              <IconeGota className="h-3.5 w-3.5 text-folha-500" />
              {empresa.cidade} e todo o {empresa.regiao}
            </p>

            <h1 className="mt-6 text-[2.6rem] leading-[1.05] tracking-tight text-white sm:text-[3.4rem] lg:text-display">
              {empresa.slogan}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              Limpamos casas, escritórios, condomínios e espaços em obra com equipas próprias,
              material profissional e um plano combinado consigo. Pede o orçamento hoje, recebe-o no
              próximo dia útil.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/contactos" className="btn-acao">
                Pedir orçamento
              </Link>
              <a
                href={linkWhatsApp(contactos[0].raw)}
                target="_blank"
                rel="noreferrer"
                className="btn-contorno"
              >
                <IconeWhatsApp className="h-5 w-5" />
                WhatsApp
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <dt className="text-2xl font-extrabold text-white">24h</dt>
                <dd className="mt-1 text-[0.85rem]">para receber o orçamento</dd>
              </div>
              <div>
                <dt className="text-2xl font-extrabold text-white">5</dt>
                <dd className="mt-1 text-[0.85rem]">serviços, do T1 ao condomínio</dd>
              </div>
              <div>
                <dt className="text-2xl font-extrabold text-white">6 dias</dt>
                <dd className="mt-1 text-[0.85rem]">por semana, com horários flexíveis</dd>
              </div>
            </dl>
          </div>

          {/* Escolha rápida do serviço — leva o visitante direto ao formulário */}
          <div className="rounded-xl2 bg-white p-6 shadow-2xl sm:p-7">
            <h2 className="text-xl text-floresta-900">De que precisa hoje?</h2>
            <p className="mt-1 text-[0.95rem] text-carvao-600">
              Escolha o serviço e recebe um orçamento à medida do espaço.
            </p>

            <ul className="mt-5 space-y-2">
              {servicos.map((servico) => (
                <li key={servico.slug}>
                  <Link
                    to={`/contactos?servico=${servico.slug}`}
                    className="flex items-center gap-3.5 rounded-2xl border border-menta-50 px-4 py-3.5 transition-colors hover:border-folha-400 hover:bg-menta-50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-menta-50 text-floresta-700">
                      <IconeDoServico nome={servico.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-bold text-floresta-900">{servico.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href={`tel:+${contactos[0].raw}`}
              className="mt-5 flex items-center justify-center gap-2 text-[0.95rem] font-bold text-floresta-800"
            >
              <IconeTelefone className="h-5 w-5 text-folha-500" />
              Prefere falar? {contactos[0].display}
            </a>
          </div>
        </div>
      </section>

      {/* ── Serviços ─────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="container-cbm">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl">Serviços de limpeza para cada tipo de espaço</h2>
            <p className="mt-4 text-lg">
              Cada espaço tem exigências diferentes. Adaptamos a equipa, o material e a
              periodicidade ao que a sua casa, loja ou condomínio precisa.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicos.map((servico) => (
              <ServiceCard key={servico.slug} servico={servico} />
            ))}
          </div>

          <Link to="/servicos" className="btn-claro mt-10">
            Ver todos os serviços em detalhe
          </Link>
        </div>
      </section>

      {/* ── Como trabalhamos (sequência real) ────────────── */}
      <section className="bg-menta-50 py-20 lg:py-24">
        <div className="container-cbm">
          <h2 className="max-w-2xl text-3xl sm:text-4xl">Do pedido à casa limpa em três passos</h2>

          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {passos.map((passo, indice) => (
              <li key={passo.titulo} className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-floresta-800 text-lg font-extrabold text-white">
                  {indice + 1}
                </span>
                <h3 className="mt-5 text-xl">{passo.titulo}</h3>
                <p className="mt-2 leading-relaxed">{passo.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Garantias ────────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <div className="container-cbm grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl sm:text-4xl">Porque é que os clientes ficam connosco</h2>
            <p className="mt-4 text-lg">
              A limpeza nota-se sobretudo quando é feita sempre da mesma forma. É isso que
              garantimos em cada visita.
            </p>
            <Link to="/contactos" className="btn-escuro mt-8">
              Falar com a nossa equipa
            </Link>
          </div>

          <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {garantias.map((item) => (
              <li key={item.titulo}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-folha-100 text-floresta-700">
                  <IconeVisto className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg">{item.titulo}</h3>
                <p className="mt-1.5 leading-relaxed">{item.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Área de atuação (SEO local) ──────────────────── */}
      <section className="border-t border-menta-50 py-16">
        <div className="container-cbm">
          <h2 className="text-2xl">Onde trabalhamos</h2>
          <p className="mt-3 max-w-3xl leading-relaxed">
            A {empresa.nome} presta serviços de limpeza em {empresa.cidade} e nas localidades
            vizinhas. Se a sua morada não estiver na lista, pergunte — deslocamo-nos a todo o{' '}
            {empresa.regiao}.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {empresa.localidadesServidas.map((local) => (
              <li
                key={local}
                className="rounded-full border border-menta-50 bg-menta-50 px-4 py-2 text-[0.9rem] font-semibold text-floresta-800"
              >
                Limpeza em {local}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Chamada final ────────────────────────────────── */}
      <section className="bg-floresta-800">
        <div className="container-cbm flex flex-col items-start gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl text-white">Peça o seu orçamento hoje</h2>
            <p className="mt-2 text-folha-100/80">
              Diga-nos a área e o tipo de limpeza. Respondemos no próximo dia útil.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/contactos" className="btn-acao">
              Preencher formulário
            </Link>
            <a
              href={linkWhatsApp(contactos[0].raw)}
              target="_blank"
              rel="noreferrer"
              className="btn-contorno"
            >
              <IconeWhatsApp className="h-5 w-5" />
              Enviar mensagem
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
