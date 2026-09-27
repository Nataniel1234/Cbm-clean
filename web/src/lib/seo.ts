import { useEffect } from 'react';
import { empresa } from '@/data/company';

type SeoConfig = {
  title: string;
  description: string;
  path: string;
  /** Dados estruturados adicionais (schema.org) para esta página. */
  jsonLd?: Record<string, unknown>;
};

function upsertMeta(key: 'name' | 'property', value: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(key, value);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/** Atualiza title, descrição, canonical, Open Graph e JSON-LD a cada mudança de rota. */
export function useSeo({ title, description, path, jsonLd }: SeoConfig) {
  useEffect(() => {
    const url = `${empresa.siteUrl}${path}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertCanonical(url);

    if (!jsonLd) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => script.remove();
  }, [title, description, path, jsonLd]);
}
