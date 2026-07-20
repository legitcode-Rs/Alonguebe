/**
 * Aplica animações de entrada quando elementos passam a aparecer na tela.
 * O IntersectionObserver é mais eficiente do que calcular posições a cada scroll.
 */
import { useEffect } from 'react';
import { useCms } from '../context/CmsContext';

const animatedSelectors = [
  '.section-header',
  '.about-images',
  '.about-content',
  '.service-card',
  '.diff-card',
  '.appt-info',
  '.appt-card',
  '.gallery-item',
  '.testimonial-card',
  '.location-info',
  '.map-container',
  '.faq-item',
  '.contact-info-card',
  '.contact-form-card',
  '.cta-container',
].join(',');

const ScrollAnimations = () => {
  // Refaz a observação quando listas vindas do WordPress substituem o fallback.
  const { content } = useCms();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(animatedSelectors));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('reveal-item', 'is-visible'));
      return undefined;
    }

    // O atraso alternado cria uma sequência natural nos grupos de cards.
    elements.forEach((element, index) => {
      element.classList.add('reveal-item');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -45px 0px' },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        element.classList.remove('reveal-item', 'is-visible');
        element.style.removeProperty('--reveal-delay');
      });
    };
  }, [content]);

  return null;
};

export default ScrollAnimations;
