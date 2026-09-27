import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api, ApiError } from '@/lib/api';
import { frequencias, quoteRequestSchema, type QuoteRequestInput } from '@/lib/quoteSchema';
import { useServicos } from '@/lib/useServicos';
import { IconeVisto, IconeWhatsApp } from '@/components/Icons';
import { contactos, linkWhatsApp } from '@/data/company';

type Props = { servicoInicial?: string };

export function QuoteForm({ servicoInicial }: Props) {
  const { servicos } = useServicos();
  const [enviado, setEnviado] = useState(false);
  const [erroServidor, setErroServidor] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteRequestInput>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      serviceSlug: servicoInicial ?? '',
      frequency: 'PONTUAL',
    },
  });

  const aoSubmeter = async (dados: QuoteRequestInput) => {
    setErroServidor(null);
    try {
      await api.enviarPedido(dados);
      reset();
      setEnviado(true);
    } catch (erro) {
      setErroServidor(
        erro instanceof ApiError
          ? erro.message
          : 'Não conseguimos enviar o pedido. Ligue-nos ou tente novamente dentro de momentos.',
      );
    }
  };

  if (enviado) {
    return (
      <div className="rounded-xl2 border border-folha-400 bg-menta-50 p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-folha-500 text-white">
          <IconeVisto className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl">Pedido recebido</h3>
        <p className="mt-2">
          Analisamos o seu espaço e respondemos com um orçamento no próximo dia útil. Se precisar de
          resposta hoje, fale connosco por WhatsApp.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={linkWhatsApp(contactos[0].raw)}
            target="_blank"
            rel="noreferrer"
            className="btn-acao"
          >
            <IconeWhatsApp className="h-5 w-5" />
            Falar agora
          </a>
          <button type="button" onClick={() => setEnviado(false)} className="btn-claro">
            Enviar outro pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(aoSubmeter)}
      noValidate
      className="rounded-xl2 border border-menta-50 bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Campo-armadilha: escondido de pessoas, visível para robôs. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Não preencher</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="serviceSlug" className="etiqueta">
            Serviço pretendido
          </label>
          <select
            id="serviceSlug"
            className={`campo ${errors.serviceSlug ? 'campo-erro' : ''}`}
            aria-invalid={Boolean(errors.serviceSlug)}
            {...register('serviceSlug')}
          >
            <option value="">Escolha um serviço</option>
            {servicos.map((servico) => (
              <option key={servico.slug} value={servico.slug}>
                {servico.name}
              </option>
            ))}
          </select>
          {errors.serviceSlug && <Erro>{errors.serviceSlug.message}</Erro>}
        </div>

        <div>
          <label htmlFor="name" className="etiqueta">
            Nome
          </label>
          <input
            id="name"
            className={`campo ${errors.name ? 'campo-erro' : ''}`}
            autoComplete="name"
            placeholder="Maria Santos"
            {...register('name')}
          />
          {errors.name && <Erro>{errors.name.message}</Erro>}
        </div>

        <div>
          <label htmlFor="phone" className="etiqueta">
            Telefone
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            className={`campo ${errors.phone ? 'campo-erro' : ''}`}
            autoComplete="tel"
            placeholder="+351 900 000 000"
            {...register('phone')}
          />
          {errors.phone && <Erro>{errors.phone.message}</Erro>}
        </div>

        <div>
          <label htmlFor="email" className="etiqueta">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`campo ${errors.email ? 'campo-erro' : ''}`}
            autoComplete="email"
            placeholder="maria@exemplo.pt"
            {...register('email')}
          />
          {errors.email && <Erro>{errors.email.message}</Erro>}
        </div>

        <div>
          <label htmlFor="city" className="etiqueta">
            Localidade
          </label>
          <input
            id="city"
            className={`campo ${errors.city ? 'campo-erro' : ''}`}
            autoComplete="address-level2"
            placeholder="Vila Real"
            {...register('city')}
          />
          {errors.city && <Erro>{errors.city.message}</Erro>}
        </div>

        <div>
          <label htmlFor="area" className="etiqueta">
            Área aproximada (m²) <Opcional />
          </label>
          <input
            id="area"
            type="number"
            min={1}
            className="campo"
            placeholder="120"
            {...register('area')}
          />
        </div>

        <div>
          <label htmlFor="frequency" className="etiqueta">
            Periodicidade
          </label>
          <select id="frequency" className="campo" {...register('frequency')}>
            {frequencias.map((opcao) => (
              <option key={opcao.valor} value={opcao.valor}>
                {opcao.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="etiqueta">
            Morada <Opcional />
          </label>
          <input
            id="address"
            className="campo"
            autoComplete="street-address"
            placeholder="Rua, número, andar"
            {...register('address')}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="etiqueta">
            O que precisa de ser limpo
          </label>
          <textarea
            id="message"
            rows={5}
            className={`campo resize-y ${errors.message ? 'campo-erro' : ''}`}
            placeholder="Ex.: T3 com 2 casas de banho, limpeza profunda depois de uma remodelação. Vidros incluídos."
            {...register('message')}
          />
          {errors.message && <Erro>{errors.message.message}</Erro>}
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-[0.9rem]">
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 rounded border-carvao-400/40 text-folha-500 focus:ring-folha-400"
              {...register('consent')}
            />
            <span>
              Autorizo a CBM Clean a usar estes dados para responder ao meu pedido de orçamento.
            </span>
          </label>
          {errors.consent && <Erro>{errors.consent.message}</Erro>}
        </div>
      </div>

      {erroServidor && (
        <p
          role="alert"
          className="mt-6 rounded-2xl border border-laranja-600/30 bg-laranja-500/10 px-4 py-3 text-[0.9rem] font-semibold text-laranja-600"
        >
          {erroServidor}
        </p>
      )}

      <button type="submit" className="btn-acao mt-7 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? 'A enviar…' : 'Enviar pedido de orçamento'}
      </button>
      <p className="mt-3 text-[0.85rem] text-carvao-400">
        Respondemos no próximo dia útil. Sem compromisso e sem custos.
      </p>
    </form>
  );
}

function Erro({ children }: { children?: string }) {
  return (
    <p role="alert" className="mt-1.5 text-[0.85rem] font-semibold text-laranja-600">
      {children}
    </p>
  );
}

function Opcional() {
  return <span className="font-medium text-carvao-400">(opcional)</span>;
}
