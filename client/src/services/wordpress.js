/**
 * Cliente público da REST API do WordPress.
 * Em desenvolvimento usa o proxy `/wp-json`; em produção pode receber a URL
 * completa por `VITE_WORDPRESS_URL` durante o build.
 */
const WORDPRESS_URL = (import.meta.env.VITE_WORDPRESS_URL || '').replace(/\/$/, '');
const WORDPRESS_API_URL = WORDPRESS_URL ? `${WORDPRESS_URL}/wp-json/wp/v2` : '/wp-json/wp/v2';

/** Busca uma página publicada pelo slug e inclui sua imagem destacada. */
export async function getPageBySlug(slug, { signal } = {}) {
  const params = new URLSearchParams({
    slug,
    _embed: '1',
    _fields: 'id,slug,title,content,excerpt,featured_media,_embedded',
  });

  const response = await fetch(`${WORDPRESS_API_URL}/pages?${params}`, { signal });

  if (!response.ok) {
    throw new Error(`WordPress respondeu com HTTP ${response.status}.`);
  }

  const pages = await response.json();
  return pages[0] || null;
}

/** Retorna a URL da imagem destacada incluída pelo parâmetro `_embed`. */
export function getFeaturedImageUrl(page) {
  return page?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
}
