/** Depoimentos: cada objeto do array `reviews` é transformado em um card. */
import React from 'react';
import { useCms } from '../context/CmsContext';

const Testimonials = () => {
  const { content } = useCms();
  const cms = content?.settings || {};
  // Conteúdo editável; `id` deve ser único para servir como key do React.
  const reviews = [
    {
      id: 1,
      name: 'Mariana Medeiros',
      city: 'Canoas/RS',
      text: 'Fui muito bem atendida na Alonguebe. O resultado ficou maravilhoso e o ambiente é super acolhedor. Com certeza virei cliente fiel.',
      stars: 5,
      avatarInitials: 'MM'
    },
    {
      id: 2,
      name: 'Carla Souza',
      city: 'Porto Alegre/RS',
      text: 'Excelente salão de beleza em Canoas. Atendimento profissional, cuidadoso e com muito carinho. Meu cabelo nunca esteve tão saudável!',
      stars: 5,
      avatarInitials: 'CS'
    },
    {
      id: 3,
      name: 'Patrícia Lima',
      city: 'Esteio/RS',
      text: 'Amei meu cabelo! O alongamento ficou natural e super bonito. O método deles é indolor e super seguro. Recomendo muito!',
      stars: 5,
      avatarInitials: 'PL'
    }
  ];

  const displayedReviews = content?.testimonials?.length
    ? content.testimonials.map((item) => ({ id: item.id, name: item.title, city: item.city, text: item.excerpt || item.content.replace(/<[^>]*>/g, ''), stars: item.stars, avatarInitials: item.title.split(' ').map((part) => part[0]).slice(0, 2).join('') }))
    : reviews;

  return (
    <section id="depoimentos" className="section-padding testimonials-bg">
      <div className="container">
        <div className="section-header">
          <span>{cms.testimonials_tag || 'Quem Confia em Nós'}</span>
          <h2>{cms.testimonials_title || 'Depoimentos'}</h2>
          <p>{cms.testimonials_text || 'Veja a opinião de quem já passou pela experiência Alonguebe e renovou sua autoestima conosco.'}</p>
        </div>

        <div className="testimonials-grid">
          {displayedReviews.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="quote-icon">“</div>
              <div className="testimonial-stars">
                {/* Cria uma estrela para cada unidade definida em review.stars. */}
                {Array.from({ length: review.stars }).map((_, i) => (
                  <span key={i} style={{ marginRight: '2px' }}>★</span>
                ))}
              </div>
              <p>"{review.text}"</p>
              <div className="testimonial-user">
                <div className="user-avatar">
                  {review.avatarInitials}
                </div>
                <div className="user-info">
                  <h4>{review.name}</h4>
                  <span>{review.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
