/**
 * Catálogo de serviços. Cada objeto do array vira um card por meio de map().
 * `onSelectService` comunica a escolha ao App, que a encaminha ao formulário.
 */
import React from 'react';
import { useCms } from '../context/CmsContext';

const Services = ({ onSelectService }) => {
  const { content } = useCms();
  const cms = content?.settings || {};
  // Fonte de dados dos cards; novos serviços devem ser incluídos também no form.
  const servicesList = [
    {
      id: 'alongamento',
      name: 'Alongamento de Cabelo',
      description: 'Alongamento de cabelo em Canoas com acabamento natural, cuidado profissional e resultado pensado para valorizar seu estilo.',
      category: 'Cabelo',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.122 12.036a5 5 0 01-5.143 5.143m5.143-5.143a5 5 0 00-5.143-5.143m5.143 5.143H14.5M3 12h11.5m0 0a5 5 0 00-5.143-5.143m5.143 5.143a5 5 0 01-5.143 5.143M9.357 6.857a5 5 0 00-5.143 5.143m5.143-5.143a5 5 0 01-5.143 5.143m0 0h1.5" />
        </svg>
      )
    },
    {
      id: 'corte-fem',
      name: 'Corte Feminino',
      description: 'Cortes modernos e clássicos que valorizam o formato do seu rosto e combinam com a sua personalidade.',
      category: 'Cabelo',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 7a3 3 0 11-6 0 3 3 0 016 0zm0 0v-1a2 2 0 012-2h4a2 2 0 012 2v1m-8 0a4 4 0 00-4 4v2m8-6a4 4 0 014 4v2M18 7a3 3 0 11-6 0 3 3 0 016 0zm0 0v-1a2 2 0 00-2-2h-4a2 2 0 00-2 2v1m8 0a4 4 0 014 4v2m-8-6a4 4 0 00-4 4v2" />
        </svg>
      )
    },
    {
      id: 'corte-masc',
      name: 'Corte Masculino',
      description: 'Atendimento especializado para o público masculino, com cortes modernos, clássicos e acabamento perfeito.',
      category: 'Cabelo',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096M9 21h8M9 4h6m-3 0v12m-9 0a3 3 0 106 0v-1m0 1a3 3 0 116 0v-1" />
        </svg>
      )
    },
    {
      id: 'escova',
      name: 'Escova e Finalização',
      description: 'Modelagem profissional com secador e chapinha para ocasiões especiais ou para o seu dia a dia.',
      category: 'Cabelo',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.022 12.022l-.707.707" />
        </svg>
      )
    },
    {
      id: 'coloracao',
      name: 'Coloração',
      description: 'Coloração capilar completa com produtos de alta performance que protegem os fios e garantem cores vibrantes.',
      category: 'Cabelo',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3" />
        </svg>
      )
    },
    {
      id: 'mechas',
      name: 'Mechas e Luzes',
      description: 'Técnicas modernas de clareamento (Balayage, Ombré hair, Luzes tradicionais) para iluminar seu visual com saúde.',
      category: 'Cabelo',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 113.536 0" />
        </svg>
      )
    },
    {
      id: 'tratamentos',
      name: 'Tratamentos Capilares',
      description: 'Cronograma capilar, reconstrução profunda e cauterização para recuperar a vitalidade e brilho dos fios danificados.',
      category: 'Cabelo',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.13a2 2 0 01-1.022-.547l-1.022-1.022a2 2 0 01-.547-1.022l-.477-2.387a6 6 0 01.517-3.86l.158-.318a6 6 0 00.517-3.86L3.26 2.6a2 2 0 01.547-1.022" />
        </svg>
      )
    },
    {
      id: 'hidratacao',
      name: 'Hidratação Capilar',
      description: 'Hidratação profunda com máscaras nutritivas selecionadas para devolver a umidade natural e maciez do seu cabelo.',
      category: 'Cabelo',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    },
    {
      id: 'manicure',
      name: 'Manicure e Pedicure',
      description: 'Cuidados completos para unhas das mãos e pés, com esmaltação tradicional, em gel e técnicas de cutilagem segura.',
      category: 'Unhas',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11c0-1.28-.19-2.517-.545-3.684m0 0A13.978 13.978 0 019 3v4M3.736 9.579a20.44 20.44 0 01-.252-4.236m0 0L3 5m.484.343l-.707.707" />
        </svg>
      )
    },
    {
      id: 'sobrancelhas',
      name: 'Design de Sobrancelhas',
      description: 'Modelagem de sobrancelhas com pinça ou linha, henna e tintura para realçar e harmonizar o seu olhar.',
      category: 'Estética',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'maquiagem',
      name: 'Maquiagem Profissional',
      description: 'Maquiagem para casamentos, formaturas, eventos sociais e ensaios fotográficos, adaptada ao seu estilo.',
      category: 'Estética',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0l-3-3a4 4 0 010-5.656l3-3a4 4 0 015.656 0l3 3a4 4 0 010 5.656l-3 3z" />
        </svg>
      )
    },
    {
      id: 'depilacao',
      name: 'Depilação',
      description: 'Depilação corporal e facial com ceras descartáveis e hipoalergênicas, garantindo cuidado especial com a sua pele.',
      category: 'Estética',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-7-7m7 7l-7 7" />
        </svg>
      )
    },
    {
      id: 'estetica-facial',
      name: 'Estética Facial',
      description: 'Limpeza de pele profunda, hidratação revitalizante e tratamentos anti-idade para devolver o brilho e saúde do seu rosto.',
      category: 'Estética',
      iconPath: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  // Itens cadastrados no WordPress substituem a lista local quando existirem.
  const displayedServices = content?.services?.length
    ? content.services.map((service, index) => ({
        id: service.id,
        name: service.title,
        description: service.excerpt || service.content.replace(/<[^>]*>/g, ''),
        category: service.category || 'Beleza',
        iconPath: servicesList[index % servicesList.length].iconPath,
      }))
    : servicesList;

  // Preenche o formulário e leva o usuário suavemente até ele.
  const handleBooking = (serviceName) => {
    if (onSelectService) {
      onSelectService(serviceName);
    }
    // Procura a seção pelo ID definido em AppointmentForm.jsx.
    const formElement = document.getElementById('agendamento');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicos" className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
      <div className="container">
        <div className="section-header">
          <span>{cms.services_tag || 'O que fazemos por você'}</span>
          <h2>{cms.services_title || 'Nossos Serviços'}</h2>
          <p>{cms.services_text || 'Oferecemos serviços completos de beleza e bem-estar, realizados por profissionais especializados e apaixonados pelo que fazem.'}</p>
        </div>

        <div className="services-grid">
          {/* map evita repetir manualmente a mesma estrutura HTML para cada item. */}
          {displayedServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-bg">
                {service.iconPath}
              </div>
              <span style={{ 
                fontSize: '11px', 
                textTransform: 'uppercase', 
                fontWeight: '700', 
                color: 'var(--primary-rose-dark)', 
                display: 'block', 
                marginBottom: '8px' 
              }}>
                {service.category}
              </span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <button 
                onClick={() => handleBooking(service.name)}
                className="btn-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Solicitar Horário
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
