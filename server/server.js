/**
 * API LEGADA DE AGENDAMENTOS DA ALONGUEBE
 *
 * Responsabilidade deste arquivo:
 * 1. criar o servidor HTTP com Express;
 * 2. receber e validar pedidos de agendamento;
 * 3. persistir os pedidos em appointments.json;
 * 4. disponibilizar uma rota para consultar os pedidos salvos.
 *
 * O frontend atual envia agendamentos ao plugin WordPress. Este servidor foi
 * mantido como referência da implementação anterior e não deve ser usado para
 * dados reais sem autenticação, proteção contra abuso e banco apropriado.
 */

// Express cria as rotas HTTP; CORS permite chamadas vindas de outra origem.
const express = require('express');
const cors = require('cors');
// Módulos nativos do Node para manipular arquivos e caminhos do sistema.
const fs = require('fs');
const path = require('path');

// `app` representa a aplicação Express que receberá as rotas abaixo.
const app = express();
// Hospedagens costumam fornecer PORT; localmente usamos 5001 como padrão.
const PORT = process.env.PORT || 5001;

// Libera acesso à API e converte automaticamente corpos JSON em `req.body`.
app.use(cors());
app.use(express.json());

// `__dirname` garante que o JSON seja encontrado mesmo ao iniciar em outra pasta.
const appointmentsFilePath = path.join(__dirname, 'appointments.json');

/**
 * Lê todos os agendamentos armazenados.
 * @returns {Array<object>} Lista de agendamentos ou lista vazia em caso de erro.
 */
const readAppointments = () => {
  try {
    // Na primeira execução, cria o arquivo com uma lista JSON vazia.
    if (!fs.existsSync(appointmentsFilePath)) {
      fs.writeFileSync(appointmentsFilePath, JSON.stringify([]));
      return [];
    }
    // Lê como texto e transforma o JSON em um array JavaScript.
    const data = fs.readFileSync(appointmentsFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    // Registra o erro no terminal sem derrubar todo o servidor.
    console.error('Erro ao ler arquivo de agendamentos:', error);
    return [];
  }
};

/**
 * Substitui o conteúdo do JSON pela lista atualizada.
 * @param {Array<object>} appointments Lista completa que será persistida.
 * @returns {boolean} `true` quando salvou; `false` quando ocorreu erro.
 */
const writeAppointments = (appointments) => {
  try {
    // Os argumentos `null, 2` formatam o JSON com recuo legível de dois espaços.
    fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointments, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar agendamento:', error);
    return false;
  }
};

// Valida apenas o formato básico texto@dominio.extensao.
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// POST /api/appointments: recebe um novo agendamento enviado pelo formulário.
app.post('/api/appointments', (req, res) => {
  // Extrai somente os campos esperados do corpo da requisição.
  const { name, email, phone, service, date, time, notes } = req.body;

  // Acumula todas as falhas para devolvê-las juntas ao cliente.
  const errors = [];
  if (!name || name.trim() === '') errors.push('O nome é obrigatório.');
  if (!email || !isValidEmail(email)) errors.push('Um e-mail válido é obrigatório.');
  if (!phone || phone.trim() === '') errors.push('O telefone/WhatsApp é obrigatório.');
  if (!service || service.trim() === '') errors.push('O serviço é obrigatório.');
  if (!date || date.trim() === '') errors.push('A data é obrigatória.');
  if (!time || time.trim() === '') errors.push('O horário é obrigatório.');

  if (errors.length > 0) {
    // HTTP 400 indica que os dados enviados pelo usuário são inválidos.
    return res.status(400).json({ error: errors.join(' ') });
  }

  // Preserva registros antigos antes de adicionar o novo.
  const appointments = readAppointments();

  // Monta o formato oficial de um agendamento salvo pela API.
  const newAppointment = {
    // Combina horário e texto aleatório para reduzir IDs repetidos.
    id: 'appt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    service: service.trim(),
    date: date,
    time: time,
    notes: notes ? notes.trim() : '',
    status: 'Pendente', // A equipe ainda precisa confirmar o horário.
    // ISO é um formato de data padronizado e fácil de ordenar.
    createdAt: new Date().toISOString()
  };

  // Altera o array em memória e depois persiste sua versão completa.
  appointments.push(newAppointment);

  if (writeAppointments(appointments)) {
    // HTTP 201 informa que um novo recurso foi criado com sucesso.
    return res.status(201).json({
      message: 'Agendamento recebido com sucesso.',
      appointment: newAppointment
    });
  } else {
    // HTTP 500 representa falha interna, neste caso ao escrever o arquivo.
    return res.status(500).json({ error: 'Erro interno ao salvar o agendamento no servidor.' });
  }
});

// GET /api/appointments: devolve a lista completa para testes ou futuro painel.
app.get('/api/appointments', (req, res) => {
  const appointments = readAppointments();
  res.json(appointments);
});

// Abre a porta e mantém o processo aguardando requisições HTTP.
app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
