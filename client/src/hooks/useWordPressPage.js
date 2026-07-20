import { useEffect, useState } from 'react';
import { getPageBySlug } from '../services/wordpress';

/**
 * Carrega uma página do CMS sem interromper a interface quando o WordPress
 * estiver desligado. Nesse caso, os componentes mantêm seu conteúdo fallback.
 */
export function useWordPressPage(slug) {
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    getPageBySlug(slug, { signal: controller.signal })
      .then((result) => {
        setPage(result);
        setError(null);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          console.warn(`Conteúdo WordPress "${slug}" indisponível:`, requestError);
          setError(requestError);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [slug]);

  return { page, isLoading, error };
}

