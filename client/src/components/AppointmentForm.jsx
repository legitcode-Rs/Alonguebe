/**
 * Formulário controlado de agendamento.
 * Props:
 * - selectedService: serviço escolhido anteriormente em Services;
 * - whatsappNumber: número usado para montar o link wa.me.
 *
 * Fluxo: usuário digita -> estado formData -> validação -> POST na API ->
 * mensagem de sucesso/erro -> opção de encaminhar os dados ao WhatsApp.
 */
import React, { useState, useEffect, useRef } from 'react';
import { getCmsApiUrl, useCms } from '../context/CmsContext';

const AppointmentForm = ({ selectedService, whatsappNumber }) => {
  const { content } = useCms();
  const cms = content?.settings || {};
  // Molde usado tanto no primeiro carregamento quanto para limpar o formulário.
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
    website: '',
  };

  // Estado central com os valores de todos os inputs controlados.
  const [formData, setFormData] = useState(initialFormState);
  // Objeto no formato { nomeDoCampo: 'mensagem de erro' }.
  const [errors, setErrors] = useState({});
  // Evita envio duplicado e troca o texto do botão durante a requisição.
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [successData, setSuccessData] = useState(null);
  const formStartedAt = useRef(Date.now());

  // Sincroniza a escolha feita nos cards sempre que a prop mudar.
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  // Deve permanecer alinhada aos serviços exibidos em Services.jsx.
  const services = [
    'Alongamento de Cabelo',
    'Corte Feminino',
    'Corte Masculino',
    'Escova e Finalização',
    'Coloração',
    'Mechas e Luzes',
    'Tratamentos Capilares',
    'Hidratação Capilar',
    'Manicure e Pedicure',
    'Design de Sobrancelhas',
    'Maquiagem Profissional',
    'Depilação',
    'Estética Facial',
  ];
  const displayedServices = content?.services?.length
    ? content.services.map((service) => service.title)
    : services;

  // Valida no navegador para dar retorno rápido antes de chamar a API.
  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'O nome completo é obrigatório.';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Por favor, insira um e-mail válido.';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'O telefone / WhatsApp é obrigatório.';
    }

    if (!formData.service) tempErrors.service = 'Por favor, selecione um serviço.';
    if (!formData.date) tempErrors.date = 'A data desejada é obrigatória.';
    if (!formData.time) tempErrors.time = 'O horário desejado é obrigatório.';

    // Atualiza as mensagens visuais e informa ao submit se pode continuar.
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Um handler genérico atende todos os campos por meio do atributo `name`.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Remove o erro do campo assim que o usuário volta a editá-lo.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Executado pelo evento onSubmit do <form>.
  const handleSubmit = async (e) => {
    // Evita que o navegador recarregue a página, comportamento padrão de forms.
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // A URL relativa passa pelo proxy configurado em vite.config.js.
      const response = await fetch(getCmsApiUrl('appointments'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // A API espera JSON, não dados de formulário tradicionais.
        body: JSON.stringify({ ...formData, form_started_at: formStartedAt.current }),
      });

      const data = await response.json();

      // `response.ok` cobre respostas HTTP entre 200 e 299.
      if (response.ok) {
        setSubmitStatus('success');
        setSuccessData(formData);
        setFormData(initialFormState); // Limpa os inputs após salvar.
        formStartedAt.current = Date.now();
      } else {
        setSubmitStatus('error');
        setErrors({ server: data.message || 'Ocorreu um erro ao processar sua solicitação.' });
      }
    } catch (err) {
      console.error('Erro de envio:', err);
      setSubmitStatus('error');
      setErrors({ server: 'Erro de conexão com o servidor. Verifique se ele está rodando.' });
      // `finally` sempre executa, havendo sucesso, erro HTTP ou falha de rede.
    } finally {
      setIsSubmitting(false);
    }
  };

  // Formata os dados como mensagem e abre uma nova aba do WhatsApp.
  const handleWhatsAppSend = (data) => {
    // Após sucesso usa a cópia salva; antes do envio usa os dados atuais.
    const appointmentData = data || formData;
    // Converte AAAA-MM-DD em DD/MM/AAAA para leitura humana.
    const dateFormatted = appointmentData.date.split('-').reverse().join('/');
    
    const message = `Olá, gostaria de agendar um horário na Alonguebe.

*Nome:* ${appointmentData.name}
*E-mail:* ${appointmentData.email}
*Telefone:* ${appointmentData.phone}
*Serviço desejado:* ${appointmentData.service}
*Data:* ${dateFormatted}
*Horário:* ${appointmentData.time}
*Observações:* ${appointmentData.notes || 'Nenhuma'}`;

    // encodeURIComponent protege espaços, acentos e quebras de linha na URL.
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <section id="agendamento" className="section-padding appt-section">
      <div className="container appt-grid">
        <div className="appt-info">
          <span style={{ 
            fontSize: '13px', 
            textTransform: 'uppercase', 
            fontWeight: '600', 
            letterSpacing: '2px', 
            color: 'var(--primary-rose-dark)', 
            display: 'block', 
            marginBottom: '10px' 
          }}>
            {cms.appointment_tag || 'Reserve seu Momento'}
          </span>
          <h2>{cms.appointment_title || 'Agende seu Horário'}</h2>
          <p>
            {cms.appointment_text || 'Preencha seus dados e solicite seu horário na Alonguebe. Nossa equipe entrará em contato rapidamente para confirmar a disponibilidade do horário escolhido.'}
          </p>

          <ul className="appt-steps">
            <li className="appt-step-item">
              <div className="step-number">1</div>
              <div>
                <h4>Escolha o Serviço e Dados</h4>
                <p>Selecione o procedimento de beleza desejado, a data ideal e a hora da sua preferência.</p>
              </div>
            </li>
            <li className="appt-step-item">
              <div className="step-number">2</div>
              <div>
                <h4>Recebemos no Painel</h4>
                <p>Nossa equipe valida a agenda e reserva o espaço com os melhores profissionais.</p>
              </div>
            </li>
            <li className="appt-step-item">
              <div className="step-number">3</div>
              <div>
                <h4>Confirmação Rápida</h4>
                <p>Entramos em contato via WhatsApp ou e-mail confirmando o seu horário e dando dicas pré-atendimento.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="appt-card">
          {submitStatus === 'success' ? (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div className="form-message form-message-success">
                <strong>Obrigado! Sua solicitação de agendamento foi recebida.</strong>
                <p style={{ marginTop: '8px', fontSize: '13.5px' }}>
                  A equipe da Alonguebe entrará em contato em breve para confirmar o seu horário.
                </p>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-medium)', marginBottom: '20px' }}>
                Deseja agilizar o atendimento? Envie também os detalhes diretamente pelo WhatsApp do salão:
              </p>
              <button 
                type="button" 
                onClick={() => handleWhatsAppSend(successData)} 
                className="btn btn-whatsapp"
                style={{ width: '100%', padding: '15px' }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '8px' }}>
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.907h.004c4.368 0 7.926-3.558 7.93-7.93a7.897 7.897 0 0 0-2.327-5.617zm-5.604 12.355A6.57 6.57 0 0 1 4.79 13.9a.9.9 0 0 0-.708-.047L1.76 14.55l.696-2.543a.9.9 0 0 0-.074-.75 6.561 6.561 0 0 1-1.01-3.414c.003-3.623 2.955-6.575 6.58-6.575a6.58 6.58 0 0 1 4.654 1.93 6.58 6.58 0 0 1 1.93 4.656c-.004 3.623-2.956 6.575-6.58 6.575zM11.522 10.02c-.193-.096-1.14-.564-1.317-.627-.176-.064-.305-.096-.432.096-.128.192-.497.627-.609.75-.112.124-.224.137-.417.04-.194-.096-.82-.302-1.562-.962-.577-.514-.967-1.15-.108-1.246.108-.096.193-.2.288-.302.09-.104.124-.176.182-.294.06-.117.03-.22-.015-.316-.045-.096-.432-1.04-.593-1.426-.156-.379-.313-.328-.43-.33-.11-.003-.237-.004-.364-.004a.7.7 0 0 0-.503.235c-.176.192-.672.656-.672 1.6s.688 1.854.784 1.982c.096.128 1.353 2.067 3.279 2.898.459.198.816.316 1.096.406.462.146.88.125 1.212.076.37-.056 1.14-.464 1.302-.912.16-.448.16-.83.112-.912-.048-.083-.176-.128-.369-.224z"/>
                </svg>
                Enviar via WhatsApp
              </button>
              <button 
                type="button" 
                onClick={() => setSubmitStatus(null)} 
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '12px', padding: '12px' }}
              >
                Solicitar novo agendamento
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="appointment-website">Não preencha este campo</label>
                <input id="appointment-website" name="website" type="text" tabIndex="-1" autoComplete="off" value={formData.website} onChange={handleChange} />
              </div>
              {errors.server && (
                <div className="form-message form-message-error">
                  {errors.server}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="name">{cms.form_name_label || 'Nome Completo'} *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  className="form-control"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">{cms.form_email_label || 'E-mail'} *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="form-control"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">{cms.form_phone_label || 'Telefone / WhatsApp'} *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    className="form-control"
                    placeholder="(51) 99999-9999"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <div className="form-error">{errors.phone}</div>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="service">{cms.form_service_label || 'Serviço Desejado'} *</label>
                <select 
                  id="service" 
                  name="service"
                  className="form-control"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Selecione um serviço...</option>
                  {displayedServices.map((svc) => (
                    <option key={svc} value={svc}>{svc}</option>
                  ))}
                </select>
                {errors.service && <div className="form-error">{errors.service}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="date">{cms.form_date_label || 'Data Desejada'} *</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]} // restrict past dates
                  />
                  {errors.date && <div className="form-error">{errors.date}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="time">{cms.form_time_label || 'Horário Desejado'} *</label>
                  <input 
                    type="time" 
                    id="time" 
                    name="time"
                    className="form-control"
                    value={formData.time}
                    onChange={handleChange}
                  />
                  {errors.time && <div className="form-error">{errors.time}</div>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="notes">{cms.form_notes_label || 'Observações Adicionais'}</label>
                <textarea 
                  id="notes" 
                  name="notes"
                  className="form-control"
                  placeholder="Alguma restrição, preferência de profissional ou detalhe extra?"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary form-submit-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processando...' : (cms.appointment_submit_label || 'Solicitar Agendamento')}
              </button>

              <div className="whatsapp-direct-box">
                <p>Prefere agendar diretamente conversando no chat?</p>
                <button 
                  type="button" 
                  onClick={() => handleWhatsAppSend()} 
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '12px', fontSize: '14px' }}
                >
                  Agendar direto via WhatsApp
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
