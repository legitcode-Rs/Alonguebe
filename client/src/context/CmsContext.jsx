/**
 * Estado global do CMS.
 *
 * Este arquivo busca a resposta agregada do plugin uma única vez e a entrega
 * a toda a árvore React. Assim, cada seção não precisa repetir a mesma chamada.
 */
import React, { createContext, useContext, useEffect, useState } from 'react';

// Estes valores também servem antes de a primeira requisição terminar.
const CmsContext = createContext({ content: null, loading: true, error: null });
// Em produção usa a origem definida no build; localmente usa o proxy do Vite.
const WORDPRESS_URL = (import.meta.env.VITE_WORDPRESS_URL || '').replace(/\/$/, '');
const CMS_API = WORDPRESS_URL ? `${WORDPRESS_URL}/wp-json` : '/wp-json';

export function CmsProvider({ children }) {
  const [state, setState] = useState({ content: null, loading: true, error: null });

  useEffect(() => {
    // O controller permite cancelar o fetch quando o Provider for desmontado.
    const controller = new AbortController();
    fetch(`${CMS_API}/alonguebe/v1/content`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`CMS respondeu com HTTP ${response.status}`);
        return response.json();
      })
      .then((content) => setState({ content, loading: false, error: null }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.warn('CMS indisponível; usando conteúdo local.', error);
          setState({ content: null, loading: false, error });
        }
      });
    return () => controller.abort();
  }, []);

  return <CmsContext.Provider value={state}>{children}</CmsContext.Provider>;
}

/** Atalho usado pelos componentes para ler content, loading e error. */
export const useCms = () => useContext(CmsContext);
/** Monta uma rota da API personalizada sem duplicar barras. */
export const getCmsApiUrl = (path) => `${CMS_API}/alonguebe/v1/${path.replace(/^\//, '')}`;
