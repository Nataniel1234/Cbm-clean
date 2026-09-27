import { useEffect, useRef, useState } from 'react';
import { IconeFechar, IconeWhatsApp } from '@/components/Icons';
import { contactos, linkWhatsApp } from '@/data/company';

/**
 * Botão fixo no canto inferior direito. Como a empresa tem três números,
 * abre um pequeno painel para o visitante escolher o mais adequado.
 */
export function WhatsAppButton() {
  const [aberto, setAberto] = useState(false);
  const painel = useRef<HTMLDivElement>(null);
  const numeros = contactos.filter((contacto) => contacto.whatsapp);

  useEffect(() => {
    if (!aberto) return;

    const aoClicarFora = (evento: MouseEvent) => {
      if (painel.current && !painel.current.contains(evento.target as Node)) setAberto(false);
    };
    const aoEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setAberto(false);
    };

    document.addEventListener('mousedown', aoClicarFora);
    document.addEventListener('keydown', aoEscape);
    return () => {
      document.removeEventListener('mousedown', aoClicarFora);
      document.removeEventListener('keydown', aoEscape);
    };
  }, [aberto]);

  return (
    <div
      ref={painel}
      className="fixed right-4 z-50 flex flex-col items-end gap-3 sm:right-6"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {aberto && (
        <div className="w-72 overflow-hidden rounded-xl2 bg-white shadow-2xl ring-1 ring-floresta-900/10">
          <div className="bg-floresta-800 px-5 py-4 text-white">
            <p className="font-bold">Falar por WhatsApp</p>
            <p className="mt-0.5 text-[0.85rem] text-folha-100/80">
              Escolha a equipa e envie-nos as medidas do espaço.
            </p>
          </div>
          <ul className="divide-y divide-menta-50">
            {numeros.map((contacto) => (
              <li key={contacto.raw}>
                <a
                  href={linkWhatsApp(contacto.raw)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-menta-50"
                >
                  <IconeWhatsApp className="h-5 w-5 shrink-0 text-folha-500" />
                  <span>
                    <span className="block font-bold text-floresta-900">{contacto.etiqueta}</span>
                    <span className="block text-[0.85rem] text-carvao-400">{contacto.display}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-label={aberto ? 'Fechar opções de WhatsApp' : 'Falar connosco por WhatsApp'}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-folha-500 text-white shadow-lg transition-transform hover:scale-105 ${
          aberto ? '' : 'pulso'
        }`}
      >
        {aberto ? <IconeFechar className="h-6 w-6" /> : <IconeWhatsApp className="h-7 w-7" />}
      </button>
    </div>
  );
}
