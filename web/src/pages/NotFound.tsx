import { Link } from 'react-router-dom';
import { useSeo } from '@/lib/seo';
import { empresa } from '@/data/company';

export function NotFound() {
  useSeo({
    title: `Página não encontrada — ${empresa.nome}`,
    description: 'A página que procura não existe ou mudou de endereço.',
    path: '/404',
  });

  return (
    <section className="container-cbm flex min-h-[60vh] flex-col justify-center py-20">
      <p className="font-bold text-folha-500">Erro 404</p>
      <h1 className="mt-3 text-4xl">Esta página não existe</h1>
      <p className="mt-4 max-w-md text-lg">
        O endereço pode ter mudado. Comece pela página inicial ou veja a lista de serviços.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn-acao">
          Voltar ao início
        </Link>
        <Link to="/servicos" className="btn-claro">
          Ver serviços
        </Link>
      </div>
    </section>
  );
}
