/** Ponto de entrada do frontend: conecta a árvore React ao elemento #root do HTML. */
import React from 'react'
import ReactDOM from 'react-dom/client'
// App é o componente raiz; styles.css concentra o visual de toda a página.
import App from './App.jsx'
import './styles.css'
import { CmsProvider } from './context/CmsContext.jsx'

// Procura <div id="root"> em index.html e renderiza a aplicação dentro dela.
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode ajuda a encontrar efeitos colaterais durante o desenvolvimento.
  <React.StrictMode>
    {/* Disponibiliza o conteúdo WordPress para todos os componentes. */}
    <CmsProvider>
      <App />
    </CmsProvider>
  </React.StrictMode>,
)
