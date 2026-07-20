/**
 * Perguntas frequentes em formato acordeão. O estado guarda qual pergunta está
 * aberta; editar o array local altera o conteúdo sem mudar o layout.
 */
import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';

const FAQ = ({ address, phoneFormatted }) => {
  const { content } = useCms();
  const cms = content?.settings || {};
  // null significa todas fechadas; um número identifica a pergunta aberta.
  const [activeIndex, setActiveIndex] = useState(null);

  // Clicar na pergunta aberta fecha; clicar em outra troca o índice ativo.
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Fecha a pergunta já aberta.
    } else {
      setActiveIndex(index);
    }
  };

  // Perguntas podem interpolar props, evitando endereço e telefone duplicados.
  const faqList = [
    {
      question: 'Onde fica a Alonguebe?',
      answer: `Nosso salão está localizado no Centro de Canoas, Rio Grande do Sul (Endereço: ${address}). O local é de fácil acesso e conta com segurança e conforto para nossos clientes.`
    },
    {
      question: 'A Alonguebe atende com horário marcado?',
      answer: 'Sim! Para garantir um atendimento personalizado, com calma e dedicação total a você, atendemos exclusivamente com horário pré-agendado.'
    },
    {
      question: 'Quais serviços o salão oferece?',
      answer: 'Oferecemos serviços de alongamento de cabelo (mega hair), corte feminino e masculino, coloração, mechas/luzes, escova, tratamentos capilares como reconstrução e hidratação profunda, manicure/pedicure, design de sobrancelhas, maquiagem profissional, depilação e estética facial.'
    },
    {
      question: 'O salão faz alongamento de cabelo em Canoas?',
      answer: 'Sim, somos especializados em alongamento de cabelo em Canoas. Trabalhamos com métodos modernos que garantem um acabamento natural e seguro para a saúde dos seus fios.'
    },
    {
      question: 'Como agendar um horário?',
      answer: `Você pode agendar um horário de duas formas fáceis: diretamente pelo nosso WhatsApp (${phoneFormatted}) ou enviando uma solicitação através do nosso formulário online nesta página.`
    },
    {
      question: 'Posso solicitar agendamento pelo site?',
      answer: 'Com certeza! Temos um formulário na seção "Agende seu horário". Basta preencher seus dados, escolher o serviço e o horário de preferência, e nossa equipe entrará em contato para finalizar a marcação.'
    },
    {
      question: 'A Alonguebe atende clientes de outras cidades da Região Metropolitana de Porto Alegre?',
      answer: 'Sim! Atendemos com muito carinho clientes vindas de Porto Alegre, Esteio, Sapucaia do Sul, São Leopoldo, Novo Hamburgo, Gravataí e toda a Região Metropolitana.'
    },
    {
      question: 'O agendamento online confirma automaticamente o horário?',
      answer: 'Não. O envio do formulário no site funciona como uma solicitação. Nossa equipe de recepção irá checar a disponibilidade da nossa agenda e entrará em contato com você via WhatsApp ou e-mail para confirmar oficialmente o horário reservado.'
    }
  ];

  const displayedFaq = content?.faq?.length
    ? content.faq.map((item) => ({ question: item.title, answer: item.content.replace(/<[^>]*>/g, '') }))
    : faqList;

  return (
    <section id="faq" className="section-padding faq-bg">
      <div className="container">
        <div className="section-header">
          <span>{cms.faq_tag || 'Dúvidas Frequentes'}</span>
          <h2>{cms.faq_title || 'FAQ - Perguntas Frequentes'}</h2>
          <p>{cms.faq_text || 'Tire suas dúvidas rápidas sobre nosso atendimento, localização e funcionamento do salão Alonguebe.'}</p>
        </div>

        <div className="faq-container">
          {displayedFaq.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <h3>{item.question}</h3>
                <span className="faq-icon">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </span>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
