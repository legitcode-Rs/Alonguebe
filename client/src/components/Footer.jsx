/** Rodapé com navegação, contatos recebidos por props e informações legais. */
import React from 'react';
import { useCms } from '../context/CmsContext';

const Footer = ({ address, whatsappNumber, instagramUsername }) => {
  const { content } = useCms();
  const cms = content?.settings || {};
  const currentYear = new Date().getFullYear();
  const instagramUrl = `https://instagram.com/${instagramUsername}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="footer-bg">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>{cms.brand_name || <>Alongue<span>be</span></>}</h3>
            <p>
              {cms.footer_text || 'Realçando sua beleza com cuidado, elegância e profissionalismo. Especialistas em alongamento de cabelo, mechas, estética e cuidados completos no coração de Canoas.'}
            </p>
            <div className="footer-socials">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Acesse nosso Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.999 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Acesse nosso WhatsApp">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.907h.004c4.368 0 7.926-3.558 7.93-7.93a7.897 7.897 0 0 0-2.327-5.617zm-5.604 12.355A6.57 6.57 0 0 1 4.79 13.9a.9.9 0 0 0-.708-.047L1.76 14.55l.696-2.543a.9.9 0 0 0-.074-.75 6.561 6.561 0 0 1-1.01-3.414c.003-3.623 2.955-6.575 6.58-6.575a6.58 6.58 0 0 1 4.654 1.93 6.58 6.58 0 0 1 1.93 4.656c-.004 3.623-2.956 6.575-6.58 6.575zM11.522 10.02c-.193-.096-1.14-.564-1.317-.627-.176-.064-.305-.096-.432.096-.128.192-.497.627-.609.75-.112.124-.224.137-.417.04-.194-.096-.82-.302-1.562-.962-.577-.514-.967-1.15-.108-1.246.108-.096.193-.2.288-.302.09-.104.124-.176.182-.294.06-.117.03-.22-.015-.316-.045-.096-.432-1.04-.593-1.426-.156-.379-.313-.328-.43-.33-.11-.003-.237-.004-.364-.004a.7.7 0 0 0-.503.235c-.176.192-.672.656-.672 1.6s.688 1.854.784 1.982c.096.128 1.353 2.067 3.279 2.898.459.198.816.316 1.096.406.462.146.88.125 1.212.076.37-.056 1.14-.464 1.302-.912.16-.448.16-.83.112-.912-.048-.083-.176-.128-.369-.224z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>{cms.footer_navigation_title || 'Navegação'}</h4>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#sobre">Sobre Nós</a></li>
              <li><a href="#servicos">Nossos Serviços</a></li>
              <li><a href="#galeria">Galeria</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>{cms.footer_links_title || 'Links Úteis'}</h4>
            <ul>
              <li><a href="#depoimentos">Depoimentos</a></li>
              <li><a href="#localizacao">Localização</a></li>
              <li><a href="#faq">Perguntas Frequentes</a></li>
              <li><a href="#agendamento">Agendamento</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>{cms.footer_address_title || 'Endereço'}</h4>
            <p style={{ fontSize: '14px', color: '#a89491', lineHeight: '1.8' }}>
              {address}
              <br />
              Canoas - RS
              <br />
              CEP: 92010-000
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} Alonguebe. Todos os direitos reservados.
          </p>
          <span className="footer-seo-tag">
            Salão de beleza em Canoas - Região Metropolitana de Porto Alegre/RS
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
