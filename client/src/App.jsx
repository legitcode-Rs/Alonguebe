/**
 * Componente raiz do site. Ele organiza as seções na ordem visual e distribui
 * configurações e estado compartilhado para os componentes filhos via props.
 */
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import AppointmentForm from './components/AppointmentForm';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollAnimations from './components/ScrollAnimations';
import { useCms } from './context/CmsContext';

// Configurações Globais do Salão (Fácil edição)
const SALON_CONFIG = {
  whatsappNumber: '5551999999999', // Apenas números, com DDI (55) e DDD (51)
  phoneFormatted: '+55 (51) 99999-9999',
  instagramUsername: 'alonguebe',
  address: 'Rua XV de Novembro, 123 - Centro, Canoas - RS',
  addressEncoded: 'Rua+XV+de+Novembro,+123+-+Centro,+Canoas+-+RS',
};

function App() {
  const { content } = useCms();
  const cms = content?.settings || {};
  const salonConfig = {
    whatsappNumber: cms.whatsapp || SALON_CONFIG.whatsappNumber,
    phoneFormatted: cms.phone || SALON_CONFIG.phoneFormatted,
    instagramUsername: cms.instagram || SALON_CONFIG.instagramUsername,
    address: cms.address || SALON_CONFIG.address,
    addressEncoded: encodeURIComponent(cms.address || SALON_CONFIG.address),
  };
  // Serviço escolhido em Services; é enviado ao formulário para pré-seleção.
  const [selectedService, setSelectedService] = useState('');

  // Callback entregue a Services para que o componente filho atualize este estado.
  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
  };

  // Link reutilizado pelos botões que abrem uma conversa no WhatsApp.
  const whatsappUrl = `https://wa.me/${salonConfig.whatsappNumber}?text=Olá!%20Gostaria%20de%20agendar%20um%20horário%20no%20salão%20Alonguebe.`;

  return (
    <>
      {/* Efeitos progressivos de entrada para as seções da página. */}
      <ScrollAnimations />
      {/* Header recebe o telefone por prop para não duplicar configuração. */}
      <Header whatsappNumber={salonConfig.whatsappNumber} />
      
      <main>
        {/* 2. Hero Section */}
        <Hero whatsappNumber={salonConfig.whatsappNumber} />

        {/* 3. Sobre a Alonguebe */}
        <About />

        {/* 4. Serviços */}
        <Services onSelectService={handleSelectService} />

        {/* 5. Diferenciais */}
        <section className="section-padding diff-bg">
          <div className="container">
            <div className="section-header">
              <span>{cms.differentials_tag || 'Por que nos escolher?'}</span>
              <h2>{cms.differentials_title || 'Nossos Diferenciais'}</h2>
              <p>{cms.differentials_text || 'Trabalhamos focados em oferecer excelência em cada atendimento, garantindo resultados excepcionais.'}</p>
            </div>

            <div className="diff-grid">
              <div className="diff-card">
                <div className="diff-icon" aria-hidden="true">
                  {/* Pessoas com um coração representam cuidado e atendimento humano. */}
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
                    <path d="M2.5 20v-2.2A4.8 4.8 0 0 1 7.3 13h1.4c1.1 0 2.1.4 2.9 1" />
                    <path d="M16.8 20.2s-4.1-2.4-4.1-5.5a2.4 2.4 0 0 1 4.1-1.7 2.4 2.4 0 0 1 4.1 1.7c0 3.1-4.1 5.5-4.1 5.5Z" />
                  </svg>
                </div>
                <h3>{cms.differential_1_title || 'Atendimento Humanizado'}</h3>
                <p>{cms.differential_1_text || 'Nossa equipe recebe você com empatia, dedicação e atenção total aos seus desejos e estilo.'}</p>
              </div>

              <div className="diff-card">
                <div className="diff-icon" aria-hidden="true">
                  {/* Selo com estrela comunica qualidade e confiança nos produtos. */}
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="m12 3 2.1 2.1 3-.4.5 3 2.7 1.4-1.4 2.7 1.4 2.7-2.7 1.4-.5 3-3-.4L12 21l-2.1-2.1-3 .4-.5-3-2.7-1.4 1.4-2.7-1.4-2.7 2.7-1.4.5-3 3 .4L12 3Z" />
                    <path d="m9.3 12.2 1.8 1.8 3.9-4" />
                  </svg>
                </div>
                <h3>{cms.differential_2_title || 'Produtos de Qualidade'}</h3>
                <p>{cms.differential_2_text || 'Utilizamos apenas marcas renomadas no mercado, garantindo saúde e brilho prolongados para seus fios.'}</p>
              </div>

              <div className="diff-card">
                <div className="diff-icon" aria-hidden="true">
                  {/* Folhas e brilho remetem a relaxamento, beleza e bem-estar. */}
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M12 20c0-6.2 2.8-10.3 7.5-12.5.2 5.5-2.3 9-7.5 10.2" />
                    <path d="M12 20c0-4.8-2.3-7.9-6.5-9.7-.1 4.4 2 7.1 6.5 8.4" />
                    <path d="M12 20v-7" />
                    <path d="M5 4v3M3.5 5.5h3M18 2v3M16.5 3.5h3" />
                  </svg>
                </div>
                <h3>{cms.differential_3_title || 'Experiência de Bem-estar'}</h3>
                <p>{cms.differential_3_text || 'Um ambiente aconchegante, café quentinho e cadeiras de massagem para que sua visita seja revigorante.'}</p>
              </div>

              <div className="diff-card">
                <div className="diff-icon" aria-hidden="true">
                  {/* Pin de mapa identifica de imediato o diferencial de localização. */}
                  <svg viewBox="0 0 24 24" role="img">
                    <path d="M20 10c0 5.3-8 11-8 11S4 15.3 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>
                <h3>{cms.differential_4_title || 'Localização Central'}</h3>
                <p>{cms.differential_4_text || 'Situado no coração de Canoas, com fácil acesso e estacionamento nas proximidades para sua comodidade.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Sistema de Agendamento */}
        {/* A prop selectedService conecta a escolha do card ao formulário. */}
        <AppointmentForm 
          selectedService={selectedService} 
          whatsappNumber={salonConfig.whatsappNumber} 
        />

        {/* 7. Galeria */}
        <Gallery />

        {/* 8. Depoimentos */}
        <Testimonials />

        {/* 9. Localização */}
        <Location 
          address={salonConfig.address}
          addressEncoded={salonConfig.addressEncoded}
          phoneFormatted={salonConfig.phoneFormatted}
        />

        {/* 10. Chamada para Ação */}
        <section className="section-padding cta-section">
          <div className="cta-container">
            <span style={{ 
              fontSize: '13px', 
              textTransform: 'uppercase', 
              fontWeight: '600', 
              letterSpacing: '2px', 
              color: 'var(--primary-rose-dark)', 
              display: 'block', 
              marginBottom: '15px' 
            }}>
              {cms.cta_tag || 'Sua beleza merece o melhor'}
            </span>
            <h2>{cms.cta_title || 'Pronta para renovar seu visual?'}</h2>
            <p>
              {cms.cta_text || 'Agende seu horário na Alonguebe e viva uma experiência única de beleza com cuidado, atenção especial e profissionalismo.'}
            </p>
            <div className="cta-buttons">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.907h.004c4.368 0 7.926-3.558 7.93-7.93a7.897 7.897 0 0 0-2.327-5.617zm-5.604 12.355A6.57 6.57 0 0 1 4.79 13.9a.9.9 0 0 0-.708-.047L1.76 14.55l.696-2.543a.9.9 0 0 0-.074-.75 6.561 6.561 0 0 1-1.01-3.414c.003-3.623 2.955-6.575 6.58-6.575a6.58 6.58 0 0 1 4.654 1.93 6.58 6.58 0 0 1 1.93 4.656c-.004 3.623-2.956 6.575-6.58 6.575zM11.522 10.02c-.193-.096-1.14-.564-1.317-.627-.176-.064-.305-.096-.432.096-.128.192-.497.627-.609.75-.112.124-.224.137-.417.04-.194-.096-.82-.302-1.562-.962-.577-.514-.967-1.15-.108-1.246.108-.096.193-.2.288-.302.09-.104.124-.176.182-.294.06-.117.03-.22-.015-.316-.045-.096-.432-1.04-.593-1.426-.156-.379-.313-.328-.43-.33-.11-.003-.237-.004-.364-.004a.7.7 0 0 0-.503.235c-.176.192-.672.656-.672 1.6s.688 1.854.784 1.982c.096.128 1.353 2.067 3.279 2.898.459.198.816.316 1.096.406.462.146.88.125 1.212.076.37-.056 1.14-.464 1.302-.912.16-.448.16-.83.112-.912-.048-.083-.176-.128-.369-.224z"/>
                </svg>
                Agendar pelo WhatsApp
              </a>
              <a href="#agendamento" className="btn btn-secondary">
                Solicitar agendamento online
              </a>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <FAQ address={salonConfig.address} phoneFormatted={salonConfig.phoneFormatted} />

        {/* 12. Contato */}
        <Contact 
          address={salonConfig.address} 
          whatsappNumber={salonConfig.whatsappNumber}
          phoneFormatted={salonConfig.phoneFormatted}
          instagramUsername={salonConfig.instagramUsername}
        />
      </main>

      {/* 13. Footer */}
      <Footer 
        address={salonConfig.address}
        whatsappNumber={salonConfig.whatsappNumber}
        instagramUsername={salonConfig.instagramUsername}
      />

      {/* BOTÃO FIXO DE WHATSAPP NO CANTO INFERIOR DIREITO */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Fale conosco no WhatsApp"
      >
        <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.907h.004c4.368 0 7.926-3.558 7.93-7.93a7.897 7.897 0 0 0-2.327-5.617zm-5.604 12.355A6.57 6.57 0 0 1 4.79 13.9a.9.9 0 0 0-.708-.047L1.76 14.55l.696-2.543a.9.9 0 0 0-.074-.75 6.561 6.561 0 0 1-1.01-3.414c.003-3.623 2.955-6.575 6.58-6.575a6.58 6.58 0 0 1 4.654 1.93 6.58 6.58 0 0 1 1.93 4.656c-.004 3.623-2.956 6.575-6.58 6.575zM11.522 10.02c-.193-.096-1.14-.564-1.317-.627-.176-.064-.305-.096-.432.096-.128.192-.497.627-.609.75-.112.124-.224.137-.417.04-.194-.096-.82-.302-1.562-.962-.577-.514-.967-1.15-.108-1.246.108-.096.193-.2.288-.302.09-.104.124-.176.182-.294.06-.117.03-.22-.015-.316-.045-.096-.432-1.04-.593-1.426-.156-.379-.313-.328-.43-.33-.11-.003-.237-.004-.364-.004a.7.7 0 0 0-.503.235c-.176.192-.672.656-.672 1.6s.688 1.854.784 1.982c.096.128 1.353 2.067 3.279 2.898.459.198.816.316 1.096.406.462.146.88.125 1.212.076.37-.056 1.14-.464 1.302-.912.16-.448.16-.83.112-.912-.048-.083-.176-.128-.369-.224z"/>
        </svg>
      </a>
    </>
  );
}

export default App;
