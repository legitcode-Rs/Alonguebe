/**
 * Seção de contato. Recebe dados de SALON_CONFIG (App.jsx), monta os links
 * externos e usa estado para controlar o pequeno formulário de mensagem.
 */
import React, { useRef, useState } from 'react';
import { getCmsApiUrl, useCms } from '../context/CmsContext';

const Contact = ({ address, whatsappNumber, phoneFormatted, instagramUsername }) => {
  const { content } = useCms();
  const cms = content?.settings || {};
  // Mantém os três inputs sincronizados com a interface.
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const formStartedAt = useRef(Date.now());
  // `status` escolhe entre mensagem de sucesso, erro ou nenhuma mensagem.
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Atualiza dinamicamente a propriedade cujo nome corresponde ao input alterado.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Envia a mensagem ao WordPress, onde ela aparece no menu Mensagens.
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Por favor, preencha todos os campos do formulário.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const response = await fetch(getCmsApiUrl('messages'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, form_started_at: formStartedAt.current }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Não foi possível enviar a mensagem.');
      setStatus('success');
      setErrorMessage('');
      setFormData({ name: '', email: '', message: '', website: '' });
      formStartedAt.current = Date.now();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setErrorMessage(error.message || 'Não foi possível enviar a mensagem.');
      setStatus('error');
    }
  };

  // URLs são derivadas das props para manter os dados principais centralizados.
  const instagramUrl = `https://instagram.com/${instagramUsername}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida%20sobre%20o%20salão.`;

  return (
    <section id="contato" className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
      <div className="container">
        <div className="section-header">
          <span>{cms.contact_tag || 'Fale Conosco'}</span>
          <h2>{cms.contact_title || 'Contato'}</h2>
          <p>{cms.contact_text || 'Tem alguma dúvida sobre nossos procedimentos ou quer conversar conosco? Escolha o canal de sua preferência.'}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-list">
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.907h.004c4.368 0 7.926-3.558 7.93-7.93a7.897 7.897 0 0 0-2.327-5.617zm-5.604 12.355A6.57 6.57 0 0 1 4.79 13.9a.9.9 0 0 0-.708-.047L1.76 14.55l.696-2.543a.9.9 0 0 0-.074-.75 6.561 6.561 0 0 1-1.01-3.414c.003-3.623 2.955-6.575 6.58-6.575a6.58 6.58 0 0 1 4.654 1.93 6.58 6.58 0 0 1 1.93 4.656c-.004 3.623-2.956 6.575-6.58 6.575zM11.522 10.02c-.193-.096-1.14-.564-1.317-.627-.176-.064-.305-.096-.432.096-.128.192-.497.627-.609.75-.112.124-.224.137-.417.04-.194-.096-.82-.302-1.562-.962-.577-.514-.967-1.15-.108-1.246.108-.096.193-.2.288-.302.09-.104.124-.176.182-.294.06-.117.03-.22-.015-.316-.045-.096-.432-1.04-.593-1.426-.156-.379-.313-.328-.43-.33-.11-.003-.237-.004-.364-.004a.7.7 0 0 0-.503.235c-.176.192-.672.656-.672 1.6s.688 1.854.784 1.982c.096.128 1.353 2.067 3.279 2.898.459.198.816.316 1.096.406.462.146.88.125 1.212.076.37-.056 1.14-.464 1.302-.912.16-.448.16-.83.112-.912-.048-.083-.176-.128-.369-.224z"/>
                </svg>
              </div>
              <div className="contact-info-content">
                <h4>WhatsApp / Telefone</h4>
                <p>{phoneFormatted}</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-rose-dark)', fontSize: '13px', fontWeight: '600', marginTop: '5px', display: 'inline-block' }}>
                  Iniciar conversa
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.999 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </div>
              <div className="contact-info-content">
                <h4>Instagram</h4>
                <p>@{instagramUsername}</p>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-rose-dark)', fontSize: '13px', fontWeight: '600', marginTop: '5px', display: 'inline-block' }}>
                  Acompanhar trabalhos
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.03 6.862L8 8.417l-6.97 4.828A1 1 0 0 0 2 14h12a1 1 0 0 0 .97-.755zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                </svg>
              </div>
              <div className="contact-info-content">
                <h4>E-mail Comercial</h4>
                <p>{cms.email || 'contato@alonguebe.com.br'}</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path d="M11 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1z"/>
                </svg>
              </div>
              <div className="contact-info-content">
                <h4>Horários de Atendimento</h4>
                <p>
                  {cms.opening_hours || 'Segunda a Sexta: 09h às 19h\nSábado: 09h às 18h\nDomingo: Fechado'}
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h3 style={{ fontFamily: 'var(--font-main)', fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: 'var(--text-dark)' }}>
              {cms.contact_form_title || 'Envie uma Mensagem Rápida'}
            </h3>

            {status === 'success' && (
              <div className="form-message form-message-success">
                Sua mensagem foi enviada! Agradecemos o contato e responderemos em breve.
              </div>
            )}
            {status === 'error' && (
              <div className="form-message form-message-error">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSendMessage}>
              <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="contact-website">Não preencha este campo</label>
                <input id="contact-website" name="website" type="text" tabIndex="-1" autoComplete="off" value={formData.website} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">{cms.form_name_label || 'Nome Completo'}</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  className="form-control" 
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">{cms.form_email_label || 'E-mail de Contato'}</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  className="form-control" 
                  placeholder="seuemail@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">{cms.contact_message_label || 'Sua Mensagem'}</label>
                <textarea 
                  id="contact-message" 
                  name="message" 
                  className="form-control" 
                  placeholder="Como podemos te ajudar hoje?"
                  value={formData.message}
                  onChange={handleChange}
                  style={{ minHeight: '120px' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'loading'}>
                {status === 'loading' ? 'Enviando...' : (cms.contact_submit_label || 'Enviar Mensagem')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
