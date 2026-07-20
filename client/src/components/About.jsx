/** Seção institucional: apresenta o salão, imagens e quatro características. */
import React from 'react';
import { useWordPressPage } from '../hooks/useWordPressPage';
import { useCms } from '../context/CmsContext';

const About = () => {
  // A página publicada com slug `sobre` substitui título e texto institucional.
  const { page } = useWordPressPage('sobre');
  const { content } = useCms();
  const cms = content?.settings || {};
  const aboutImages = [
    cms.about_image_1 || 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600',
    cms.about_image_2 || 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&q=80&w=400',
    cms.about_image_3 || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400',
  ];

  return (
    <section id="sobre" className="section-padding">
      <div className="container about-grid">
        <div className="about-images">
          <div className="about-img-card tall">
            <img 
              src={aboutImages[0]} 
              alt="Atendimento personalizado no salão Alonguebe Canoas" 
              loading="lazy"
            />
          </div>
          <div className="about-img-card">
            <img 
              src={aboutImages[1]} 
              alt="Ambiente elegante e confortável Alonguebe" 
              loading="lazy"
            />
          </div>
          <div className="about-img-card">
            <img 
              src={aboutImages[2]} 
              alt="Cuidado profissional cabelo e beleza" 
              loading="lazy"
            />
          </div>
        </div>

        <div className="about-content">
          <span style={{ 
            fontSize: '13px', 
            textTransform: 'uppercase', 
            fontWeight: '600', 
            letterSpacing: '2px', 
            color: 'var(--primary-rose-dark)', 
            display: 'block', 
            marginBottom: '10px' 
          }}>
            {cms.about_tag || 'Nossa Essência'}
          </span>
          <h2>{cms.about_title || page?.title?.rendered || 'Sobre a Alonguebe'}</h2>
          {page?.content?.rendered ? (
            <div
              className="about-wordpress-content"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
          ) : (
            <>
              <p className="lead">
                {cms.about_lead || 'A Alonguebe é um salão de beleza em Canoas, na Região Metropolitana de Porto Alegre, criado para oferecer uma experiência completa de cuidado, beleza e autoestima.'}
              </p>
              <p>
                {cms.about_text || 'Nosso atendimento é feito com carinho, atenção aos detalhes e foco em entregar resultados que valorizam a beleza única de cada cliente. Combinamos técnicas modernas com produtos de altíssima qualidade para garantir que cada visita seja um momento especial de autocuidado e relaxamento.'}
              </p>
            </>
          )}

          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
              </div>
              <div>
                <h4>Atendimento Personalizado</h4>
                <p>Consultoria para entender o seu desejo e valorizar seus traços únicos.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.066.082a.5.5 0 0 1 .868 0l2.54 4.887 5.376.812a.5.5 0 0 1 .277.853l-3.882 3.834 1.003 5.385a.5.5 0 0 1-.726.528L8 13.973l-4.832 2.505a.5.5 0 0 1-.726-.528l1.003-5.385-3.882-3.834a.5.5 0 0 1 .277-.853l5.376-.812L8.066.082z"/>
                </svg>
              </div>
              <div>
                <h4>Ambiente Acolhedor</h4>
                <p>Um espaço aconchegante, feito para você se sentir em casa e relaxar.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </div>
              <div>
                <h4>Foco em Autoestima</h4>
                <p>Nossa missão é fazer você se sentir ainda mais confiante e radiante.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.248 10.461 11.517 8.02l.73-2.441a1 1 0 0 0-.756-1.264l-2.442-.73-2.441.73a1 1 0 0 0-.756 1.264l.73 2.441-.73 2.441a1 1 0 0 0 .756 1.264l2.442.73 2.441-.73a1 1 0 0 0 .756-1.264zm-3.08-2.441a1.163 1.163 0 1 1 2.326 0 1.163 1.163 0 0 1-2.326 0z"/>
                </svg>
              </div>
              <div>
                <h4>Diferentes Estilos</h4>
                <p>Serviços completos e versáteis de beleza para atender todos os estilos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
