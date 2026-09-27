import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { servicos as fallback, type Servico } from '@/data/services';

/**
 * Lê os serviços da API. Se a API não responder, o site continua a funcionar
 * com o catálogo local — o visitante nunca vê uma página vazia.
 */
export function useServicos() {
  const [dados, setDados] = useState<Servico[]>(fallback);
  const [aCarregar, setACarregar] = useState(true);

  useEffect(() => {
    let ativo = true;

    api
      .listarServicos()
      .then((lista) => {
        if (ativo && lista.length > 0) setDados(lista);
      })
      .catch(() => {
        /* mantém o catálogo local */
      })
      .finally(() => {
        if (ativo) setACarregar(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  return { servicos: dados, aCarregar };
}
