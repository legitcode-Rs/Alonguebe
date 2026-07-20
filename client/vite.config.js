/**
 * Configuração do Vite, ferramenta que serve e compila o frontend React.
 * Altere `port` para mudar a porta do site durante o desenvolvimento.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Habilita transformação de JSX e atualização instantânea no navegador.
  plugins: [react()],
  server: {
    port: 3000,
    // /api mantém compatibilidade com o backend Express legado. O frontend
    // atual envia formulários para as rotas /wp-json do WordPress.
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        // Ajusta o cabeçalho Host para o destino do proxy.
        changeOrigin: true,
        // Permite destino HTTP local sem certificado HTTPS.
        secure: false,
      },
      // Permite ao React consumir o WordPress local pela mesma origem do Vite.
      '/wp-json': {
        target: 'http://alonguebe-cms.local',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
