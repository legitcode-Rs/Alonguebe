/** Galeria visual: o array local define imagens, textos alternativos e tamanhos. */
import React from 'react';
import { useCms } from '../context/CmsContext';

const Gallery = () => {
  const { content } = useCms();
  const cms = content?.settings || {};
  const galleryItems = [
    {
      id: 1,
      category: 'Alongamentos',
      title: 'Alongamento premium natural',
      imgSrc: '/images/galeria-alongamento.png',
      altText: 'Alongamento de cabelo no salão Alonguebe em Canoas'
    },
    {
      id: 2,
      category: 'Mechas & Luzes',
      title: 'Mechas loiras iluminadas',
      imgSrc: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&q=80&w=500',
      altText: 'Resultado de mechas em salão de beleza em Canoas'
    },
    {
      id: 3,
      category: 'Finalização',
      title: 'Corte e escova com brilho',
      imgSrc: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=500',
      altText: 'Serviço de beleza realizado pela Alonguebe'
    },
    {
      id: 4,
      category: 'Unhas',
      title: 'Esmaltação em gel sofisticada',
      imgSrc: '/images/galeria-manicure.png',
      altText: 'Manicure elegante realizada na Alonguebe Canoas'
    },
    {
      id: 5,
      category: 'Sobrancelhas',
      title: 'Design e definição do olhar',
      imgSrc: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=500',
      altText: 'Design de sobrancelhas profissional em Canoas'
    },
    {
      id: 6,
      category: 'Maquiagem',
      title: 'Make glam para festas',
      imgSrc: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=500',
      altText: 'Maquiagem sofisticada no salão Alonguebe'
    },
    {
      id: 7,
      category: 'Ambiente',
      title: 'Nosso espaço de beleza',
      imgSrc: '/images/diferenciais-salao-background.png',
      altText: 'Ambiente moderno e acolhedor do salão Alonguebe em Canoas'
    },
    {
      id: 8,
      category: 'Antes e Depois',
      title: 'Transformação capilar completa',
      imgSrc: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=500',
      altText: 'Antes e depois alongamento de cabelo em Canoas'
    }
  ];

  const displayedItems = content?.gallery?.length
    ? content.gallery.map((item) => ({ id: item.id, imgSrc: item.image, altText: item.title, category: item.category || 'Alonguebe', title: item.title }))
    : galleryItems;

  return (
    <section id="galeria" className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
      <div className="container">
        <div className="section-header">
          <span>{cms.gallery_tag || 'Inspiração e Resultados'}</span>
          <h2>{cms.gallery_title || 'Nossa Galeria'}</h2>
          <p>{cms.gallery_text || 'Confira alguns dos trabalhos incríveis realizados em nosso espaço e veja a transformação que podemos fazer em seu visual.'}</p>
        </div>

        <div className="gallery-grid">
          {displayedItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <img 
                src={item.imgSrc} 
                alt={item.altText} 
                loading="lazy" 
              />
              <div className="gallery-overlay">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
