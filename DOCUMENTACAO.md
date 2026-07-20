# Guia técnico e de manutenção

Este documento explica como o projeto funciona para quem está começando em React, APIs ou WordPress headless. Os comentários dentro do código complementam este guia e explicam decisões próximas às respectivas regras.

## 1. Arquitetura atual

O navegador nunca renderiza um tema WordPress. Ele recebe o frontend React e consulta o WordPress apenas como CMS (sistema de gerenciamento de conteúdo).

```text
Visitante
   │
   ▼
React + Vite (client)
   │  GET conteúdo e páginas
   │  POST agendamentos e mensagens
   ▼
REST API do WordPress
   │
   ▼
Plugin Alonguebe Headless CMS + banco do WordPress
```

Em desenvolvimento, o navegador chama URLs relativas como `/wp-json/...`. O proxy do Vite repassa essas chamadas a `http://alonguebe-cms.local`. Em produção, `VITE_WORDPRESS_URL` faz o frontend montar URLs absolutas.

O diretório `server/` é uma implementação anterior. Ele continua executável pelo comando opcional `npm run start:legacy-api`, mas os componentes atuais não chamam `/api/appointments`; eles chamam as rotas do WordPress.

## 2. Inicialização do frontend

1. `client/index.html` oferece o elemento `<div id="root">` e os metadados de SEO.
2. `client/src/main.jsx` cria a raiz React dentro desse elemento.
3. `CmsProvider` envolve `App`, tornando o resultado do CMS acessível a qualquer componente.
4. `App.jsx` calcula os dados gerais do salão e renderiza as seções na ordem visual.
5. Cada componente usa conteúdo do CMS quando disponível e um valor local como fallback.

`React.StrictMode` ajuda a revelar efeitos colaterais durante o desenvolvimento. Por isso um `useEffect` pode parecer executar duas vezes localmente; esse teste adicional não ocorre da mesma forma no build de produção.

## 3. As duas fontes de conteúdo WordPress

O frontend consulta duas APIs diferentes, ambas sob `/wp-json`.

### API personalizada do plugin

`CmsContext.jsx` chama `GET /wp-json/alonguebe/v1/content` uma vez. A resposta tem este formato simplificado:

```json
{
  "settings": { "phone": "...", "hero_title": "..." },
  "services": [],
  "gallery": [],
  "testimonials": [],
  "faq": []
}
```

O contexto compartilha três valores:

- `content`: resposta recebida ou `null`;
- `loading`: informa se a primeira consulta ainda está em andamento;
- `error`: guarda a falha sem impedir a renderização.

Componentes acessam esses valores por `useCms()`. A expressão `cms.valor || 'fallback'` significa: use o valor do painel se ele existir; caso contrário, use o texto local.

### API padrão de páginas

`useWordPressPage(slug)` usa `services/wordpress.js` para consultar `/wp-json/wp/v2/pages`. Atualmente:

- a página `inicio` pode substituir título, conteúdo e imagem da Hero;
- a página `sobre` pode substituir título e conteúdo da seção Sobre.

Um `AbortController` cancela a requisição se o componente for desmontado. Isso evita tentar atualizar o estado de uma tela que já não existe.

### Prioridade dos fallbacks

A prioridade exata varia ligeiramente conforme o campo:

- dados gerais e títulos de seção: plugin personalizado → constante/texto local;
- título de Hero e Sobre: configuração do plugin → página WordPress → texto local;
- corpo de Hero e Sobre: conteúdo da página WordPress → configuração/texto local;
- listas: itens publicados no plugin → arrays locais completos.

Assim, o site continua visível sem o CMS. Porém os formulários dependem do WordPress para persistir dados.

## 4. Estado e comunicação entre componentes

### Seleção de serviço

`Services` não conhece o estado interno de `AppointmentForm`. O fluxo passa pelo pai:

```text
clique no card → Services chama onSelectService
              → App atualiza selectedService
              → AppointmentForm recebe a nova prop
              → useEffect preenche o select
```

Esse padrão é chamado de “elevar o estado”: o dado compartilhado fica no ancestral comum mais próximo.

### Formulários controlados

Nos formulários, cada `value` vem de um estado React e cada `onChange` atualiza esse estado. O atributo `name` do campo indica qual propriedade deve mudar:

```js
setFormData((previous) => ({ ...previous, [name]: value }));
```

`...previous` preserva os outros campos e `[name]` atualiza somente o campo digitado.

## 5. Fluxo dos formulários

### Agendamento

1. `AppointmentForm` valida os campos para dar retorno rápido ao visitante.
2. Envia JSON para `POST /wp-json/alonguebe/v1/appointments`.
3. O plugin valida nome e e-mail, higieniza os dados e cria um post `along_appointment`.
4. Cada informação pesquisável é salva como metadado; observações também ficam no conteúdo do post.
5. O painel mostra o registro em **Agendamentos** com status inicial `Pendente`.
6. Após sucesso, o React guarda uma cópia dos dados, limpa o formulário e oferece envio adicional por WhatsApp.

### Contato

1. `Contact` verifica se nome, e-mail e mensagem foram preenchidos.
2. Envia JSON para `POST /wp-json/alonguebe/v1/messages`.
3. O plugin cria um post `along_message`.
4. O registro aparece em **Mensagens**.

A validação do navegador melhora a experiência, mas nunca substitui a validação do servidor: qualquer pessoa pode chamar uma API sem usar a interface React.

## 6. Plugin WordPress

O arquivo `alonguebe-headless-cms.php` contém todo o plugin.

### Configurações globais

`alonguebe_setting_fields()` é a fonte única dos campos do menu **Alonguebe CMS**. Cada entrada possui rótulo administrativo e valor padrão. Os valores são salvos juntos na option `alonguebe_site_settings`.

### Tipos de conteúdo

O plugin registra seis Custom Post Types (CPTs):

| Tipo interno | Menu | Uso |
| --- | --- | --- |
| `along_service` | Serviços | Cards e opções do formulário |
| `along_gallery` | Galeria | Imagens e legendas |
| `along_testimonial` | Depoimentos | Nome, cidade, texto e estrelas |
| `along_faq` | Perguntas frequentes | Pergunta e resposta |
| `along_appointment` | Agendamentos | Solicitações recebidas |
| `along_message` | Mensagens | Contatos recebidos |

Os quatro primeiros são conteúdo público consultável. Agendamentos e mensagens aparecem no painel, mas não devem formar páginas públicas.

### Metadados

Metadados são informações extras ligadas a um post. O prefixo `_along_` evita colisões com outros plugins. Exemplos: `_along_category`, `_along_stars`, `_along_service` e `_along_status`.

O nonce da caixa **Detalhes do item** comprova que um salvamento veio de um formulário legítimo do painel. `current_user_can` confirma que o usuário tem permissão para editar.

### Rotas REST

| Método e rota | Entrada | Resultado |
| --- | --- | --- |
| `GET /alonguebe/v1/content` | nenhuma | configurações e listas publicadas |
| `POST /alonguebe/v1/appointments` | dados do agendamento | cria um agendamento, HTTP 201 |
| `POST /alonguebe/v1/messages` | dados de contato | cria uma mensagem, HTTP 201 |

As rotas usam `permission_callback => __return_true` porque visitantes não autenticados precisam ler o site e enviar formulários. Os callbacks de envio aplicam quatro proteções no servidor: campo-isca (honeypot), tempo mínimo de preenchimento, bloqueio de conteúdo idêntico por 15 minutos e limite de 5 tentativas por IP/tipo de formulário a cada 10 minutos. O IP é usado apenas para gerar uma chave temporária com hash. Se o volume ou o padrão de abuso exigir, CAPTCHA pode ser acrescentado como uma camada adicional.

## 7. Mapa de arquivos

### Raiz

- `package.json`: atalhos `start`, `dev` e `share`.
- `scripts/start.js`: cria o processo do Vite e o encerra ao receber `Ctrl+C`.
- `README.md`: instalação, execução, WordPress e publicação.
- `robots.txt` e `sitemap.xml`: descoberta do site por buscadores.
- `.node-bin/`: Node.js portátil; não editar manualmente.
- `.tools/cloudflared`: executável usado pelo comando de compartilhamento.

### Frontend

- `client/index.html`: SEO estático, fontes, JSON-LD e ponto de montagem.
- `client/vite.config.js`: plugin React, porta 3000 e proxies locais.
- `client/src/main.jsx`: entrada e `CmsProvider`.
- `client/src/App.jsx`: ordem das seções, fallbacks gerais e serviço selecionado.
- `client/src/context/CmsContext.jsx`: API personalizada e estado global do CMS.
- `client/src/services/wordpress.js`: consulta à API padrão de páginas.
- `client/src/hooks/useWordPressPage.js`: ciclo de carregamento de uma página.
- `client/src/styles.css`: tokens visuais, layouts, animações e media queries.
- `client/public/`: arquivos copiados sem transformação para o build.

### Componentes

- `Header`: navegação desktop/mobile e visual compacto depois da rolagem.
- `Hero`: primeira dobra, página `inicio`, imagem e CTAs.
- `About`: apresentação, página `sobre` e mosaico de imagens.
- `Services`: catálogo e conexão com o agendamento.
- `AppointmentForm`: validação, POST, feedback e WhatsApp.
- `Gallery`: imagens locais ou publicadas no CMS.
- `Testimonials`: avaliações e estrelas.
- `Location`: endereço, horário e URLs do Google Maps.
- `FAQ`: acordeão controlado por índice.
- `Contact`: canais do salão e envio de mensagem.
- `Footer`: navegação, contatos e ano calculado.
- `ScrollAnimations`: observa elementos e adiciona classes de entrada.

### Backend legado

- `server/server.js`: API Express antiga em `/api/appointments`.
- `server/appointments.json`: persistência local antiga.
- `server/package.json`: dependências do Express.

O backend legado usa leitura e escrita síncronas e não possui autenticação no GET. Ele é adequado somente para estudo/local e não participa do fluxo atual.

## 8. Alterações comuns

### Editar textos sem programar

Use **Alonguebe CMS** no painel. Para serviços, galeria, depoimentos e FAQ, use os menus próprios. Publique os itens para que entrem na resposta da API.

### Adicionar um novo campo global

1. Adicione a entrada em `alonguebe_setting_fields()` no plugin.
2. Use `cms.nome_do_campo` no componente React.
3. Inclua um fallback local compreensível.
4. Teste com o campo preenchido, vazio e com o WordPress desligado.

### Adicionar um campo a agendamento

1. Acrescente-o a `initialFormState` e ao JSX de `AppointmentForm`.
2. Atualize validação e mensagem do WhatsApp, se aplicável.
3. Inclua-o no salvamento e na exibição administrativa do plugin.
4. Registre o metadado caso precise consultá-lo separadamente.
5. Documente se é obrigatório e teste respostas de erro.

### Alterar serviços

Cadastre-os no WordPress. Quando existir ao menos um serviço publicado, a lista do CMS substitui toda a lista local e também alimenta o `<select>` do formulário. Se quiser atualizar o modo offline, altere os arrays locais em `Services.jsx` e `AppointmentForm.jsx` mantendo os nomes iguais.

### Alterar aparência

Comece pelas variáveis em `:root` no início de `styles.css`. Elas centralizam cores, fontes, sombras, raios e largura máxima. Depois localize o bloco identificado pelo nome do componente. Verifique as media queries no fim do arquivo para telas menores.

### Alterar domínio ou dados locais

Atualize o painel, os fallbacks em `App.jsx`, `client/index.html`, `robots.txt` e `sitemap.xml`. O JSON-LD de `index.html` é estático e não recebe automaticamente os valores do CMS.

## 9. Conceitos usados

- **Componente:** função que retorna JSX, a estrutura visual da tela.
- **Prop:** valor passado do componente pai ao filho.
- **Estado (`useState`):** dado que provoca nova renderização ao mudar.
- **Efeito (`useEffect`):** sincronização com algo externo, como rede ou DOM.
- **Contexto:** forma de compartilhar dados sem repassar props por muitos níveis.
- **Hook:** função iniciada por `use` que reutiliza lógica de estado/efeito.
- **Renderização condicional:** escolha do JSX conforme um valor.
- **`map`:** transformação de cada item de uma lista em um elemento.
- **`key`:** identidade estável de cada item renderizado.
- **REST API:** conjunto de endereços HTTP que recebe e devolve dados.
- **Headless CMS:** painel de conteúdo separado da interface exibida ao visitante.
- **CPT:** tipo de conteúdo personalizado do WordPress.
- **Fallback:** conteúdo reserva usado quando a fonte principal não responde.

## 10. Cuidados de manutenção

- Não edite `package-lock.json`, `node_modules/`, `client/dist/` ou `.node-bin/` manualmente.
- JSON não aceita comentários; explique arquivos JSON na documentação externa.
- Não repita segredos em variáveis `VITE_*` ou componentes React.
- Preserve `AbortController` nas consultas para evitar atualizações tardias.
- Ao renderizar HTML com `dangerouslySetInnerHTML`, aceite conteúdo apenas de editores confiáveis.
- Adicione CAPTCHA, rate limiting e monitoramento antes de divulgar formulários públicos.
- Faça backup do banco WordPress; agendamentos e mensagens atuais estão nele.
- Depois de alterações, execute o build e teste navegação, fallback do CMS e os dois formulários.
