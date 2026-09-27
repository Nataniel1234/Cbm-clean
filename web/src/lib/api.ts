import type { Servico } from '@/data/services';
import type { QuoteRequestInput } from '@/lib/quoteSchema';

const BASE = import.meta.env.VITE_API_URL ?? '';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly fields?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      payload?.error ?? 'Não foi possível contactar o servidor.',
      response.status,
      payload?.fields,
    );
  }

  return payload as T;
}

export const api = {
  listarServicos: () => request<{ data: Servico[] }>('/services').then((r) => r.data),

  enviarPedido: (dados: QuoteRequestInput) =>
    request<{ data: { id: string }; message: string }>('/quotes', {
      method: 'POST',
      body: JSON.stringify(dados),
    }),
};
