/** Seção de localização, horário, contato e mapa incorporado do Google. */
import React from 'react';
import { useCms } from '../context/CmsContext';

const Location = ({ address, addressEncoded, phoneFormatted }) => {
  const { content } = useCms();
  const cms = content?.settings || {};
  // addressEncoded evita caracteres inválidos no parâmetro de destino da URL.
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressEncoded}`;
  // O modo `output=embed` gera um mapa incorporável sem o frágil parâmetro pb.
  const mapEmbedUrl = `https://www.google.com/maps?q=${addressEncoded}&output=embed`;

  return (
    <section id="localizacao" className="section-padding" style={{ backgroundColor: 'var(--bg-cream)' }}>
      <div className="container">
        <div className="section-header">
          <span>{cms.location_tag || 'Onde Estamos'}</span>
          <h2>{cms.location_title || 'Salão de beleza em Canoas, perto de você'}</h2>
          <p>{cms.location_text || 'Localização privilegiada e de fácil acesso para quem vem de Canoas, Porto Alegre e demais cidades da Região Metropolitana.'}</p>
        </div>

        <div className="location-grid">
          <div className="location-info">
            <h3>Visite a Alonguebe</h3>
            <p>
              Estamos situados no centro de Canoas, em um local seguro e confortável. Atendemos clientes de <strong>Canoas, Porto Alegre, Esteio, Sapucaia do Sul, São Leopoldo</strong> e toda a Região Metropolitana do Rio Grande do Sul.
            </p>

            <ul className="location-details">
              <li>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <div>
                  <strong>Endereço:</strong>
                  <br />
                  {address}
                </div>
              </li>
              <li>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-.58-.658L1.721.512a.678.678 0 0 0-.765.424L.013 3.012a3.785 3.785 0 0 0 .548 3.53l1.82 2.16a11.86 11.86 0 0 0 5.252 5.252l2.16-1.82a3.784 3.784 0 0 0 3.53.548l2.576-1.02a.678.678 0 0 0 .424-.765L15.29 9.856a.678.678 0 0 0-.658-.58l-2.483-.23a.678.678 0 0 0-.657.348l-.893 1.64a10.142 10.142 0 0 1-4.828-4.829l1.64-.893a.678.678 0 0 0 .348-.657V2.485a.678.678 0 0 0-.58-.658L3.654 1.328z"/>
                </svg>
                <div>
                  <strong>Telefone / WhatsApp:</strong>
                  <br />
                  {phoneFormatted}
                </div>
              </li>
              <li>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
                <div>
                  <strong>Horário de Funcionamento:</strong>
                  <br />
                  {cms.opening_hours || 'Segunda a Sábado: 09h às 19h'}
                </div>
              </li>
            </ul>

            <a 
              href={directionsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                <path d="M15.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h11zm-10 1v10h10V3h-10z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Como Chegar
            </a>
          </div>

          <div className="map-container">
            {/* Mapa incorporado do Google centralizado em Canoas/RS. */}
            <iframe 
              title="Mapa de Localização do Salão Alonguebe em Canoas"
              src={mapEmbedUrl}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
