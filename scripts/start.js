/**
 * INICIALIZADOR DO AMBIENTE DE DESENVOLVIMENTO
 * Inicia o Vite como processo filho e garante seu encerramento com Ctrl+C.
 * O backend Express antigo não é necessário: conteúdo e formulários atuais
 * usam o WordPress. Não faz parte do site compilado para produção.
 */

// `spawn` inicia outros programas; `path` monta caminhos compatíveis com o SO.
const { spawn } = require('node:child_process');
const path = require('node:path');

// A raiz fica uma pasta acima de `scripts`; nela estão `client` e `server`.
const root = path.resolve(__dirname, '..');
// Guarda os processos filhos para encerrá-los juntos depois.
const processes = [];
// Impede que a rotina de encerramento seja executada duas vezes.
let stopping = false;
let finalExitCode = 0;

/** Inicia um arquivo Node e acompanha erros e encerramento do processo. */
function start(name, script, cwd) {
  // `process.execPath` reutiliza exatamente o executável Node atual.
  const child = spawn(process.execPath, [script], {
    // Cada aplicação executa dentro de sua própria pasta.
    cwd,
    // Repassa entradas e logs ao terminal atual.
    stdio: 'inherit',
    // Repassa variáveis como PORT e PATH.
    env: process.env,
  });

  processes.push(child);

  // Falha antes de o processo conseguir iniciar.
  child.on('error', (error) => {
    console.error(`[${name}] Não foi possível iniciar:`, error.message);
    stop(1);
  });

  // Se um dos dois fechar inesperadamente, encerra o outro também.
  child.on('exit', (code, signal) => {
    if (!stopping) {
      const reason = signal ? `sinal ${signal}` : `código ${code}`;
      console.error(`[${name}] Processo encerrado (${reason}).`);
      stop(code || 1);
    }

    // Quando todos terminaram, devolve ao terminal o código final apropriado.
    if (stopping && processes.every((process) => process.exitCode !== null || process.signalCode !== null)) {
      process.exit(finalExitCode);
    }
  });
}

/** Solicita encerramento gracioso de todos os processos iniciados. */
function stop(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  finalExitCode = exitCode;

  // SIGTERM permite que cada programa libere suas portas normalmente.
  for (const child of processes) {
    if (!child.killed) child.kill('SIGTERM');
  }

  // Após dois segundos, força somente processos que ignoraram o SIGTERM.
  setTimeout(() => {
    for (const child of processes) {
      if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
    }
  }, 2000).unref();
}

// Frontend Vite: chama diretamente o CLI instalado nas dependências do client.
console.log('Iniciando site em http://localhost:3000');
start(
  'site',
  path.join(root, 'client', 'node_modules', 'vite', 'bin', 'vite.js'),
  path.join(root, 'client'),
);

// Ctrl+C emite SIGINT; sistemas de deploy normalmente encerram com SIGTERM.
process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));
