import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { IconeFechar, IconeMenu, IconeTelefone } from '@/components/Icons';
import { contactos } from '@/data/company';

const navegacao = [
  { to: '/', label: 'Início' },
  { to: '/servicos', label: 'Os nossos serviços' },
  { to: '/contactos', label: 'Contactos' },
];

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [comFundo, setComFundo] = useState(false);
  const { pathname } = useLocation();
  const principal = contactos[0];

  useEffect(() => setAberto(false), [pathname]);

  useEffect(() => {
    const aoDeslizar = () => setComFundo(window.scrollY > 8);
    aoDeslizar();
    window.addEventListener('scroll', aoDeslizar, { passive: true });
    return () => window.removeEventListener('scroll', aoDeslizar);
  }, []);

  return (
    <header
      className={`sticky z-40 w-full transition-colors duration-200 ${
        comFundo ? 'bg-white/95 shadow-sm backdrop-blur' : 'bg-white'
      }`}
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-floresta-800 focus:px-5 focus:py-2 focus:text-white"
      >
        Saltar para o conteúdo
      </a>

      <div className="container-cbm flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label="CBM Clean — página inicial">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {navegacao.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${
                  isActive
                    ? 'bg-menta-50 text-floresta-800'
                    : 'text-carvao-600 hover:text-floresta-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:+${principal.raw}`}
            className="flex items-center gap-2 text-[0.95rem] font-bold text-floresta-800"
          >
            <IconeTelefone className="h-5 w-5 text-folha-500" />
            {principal.display}
          </a>
          <Link to="/contactos" className="btn-acao">
            Pedir orçamento
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="rounded-full p-2 text-floresta-800 lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
        >
          {aberto ? <IconeFechar className="h-7 w-7" /> : <IconeMenu className="h-7 w-7" />}
        </button>
      </div>

      {aberto && (
        <div id="menu-movel" className="border-t border-menta-50 bg-white lg:hidden">
          <nav className="container-cbm flex flex-col py-4" aria-label="Principal (telemóvel)">
            {navegacao.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `border-b border-menta-50 py-3.5 text-lg font-bold ${
                    isActive ? 'text-floresta-800' : 'text-carvao-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contactos" className="btn-acao mt-5">
              Pedir orçamento
            </Link>
            <a href={`tel:+${principal.raw}`} className="btn-claro mt-3">
              Ligar {principal.display}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
