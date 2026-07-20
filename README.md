# Alonguebe — site institucional com React e WordPress headless

Site institucional do salão Alonguebe, em Canoas/RS. A interface é feita em **React 18 + Vite** e o conteúdo administrativo fica em um **WordPress headless**: o WordPress fornece dados por API, enquanto o React é responsável por exibir a página.

> Este README ensina a instalar e executar o projeto. Para entender o código, os fluxos de dados e onde fazer cada alteração, consulte também [`DOCUMENTACAO.md`](DOCUMENTACAO.md).

## Visão geral

O projeto possui três partes:

- `client/`: site que o visitante vê;
- `wordpress/alonguebe-headless-cms/`: plugin que cria o painel e a API usados pelo site;
- `server/`: API Express antiga, mantida apenas como referência e compatibilidade. O frontend atual não envia dados para ela.

Quando o WordPress está disponível, seus dados substituem os textos e listas locais. Se ele estiver desligado, o site continua abrindo com conteúdo padrão escrito nos componentes React. Agendamentos e mensagens, porém, só podem ser enviados quando a API do WordPress estiver disponível.

## Requisitos

- macOS com o Node.js portátil presente em `.node-bin/`; ou Node.js 20+ e npm instalados normalmente;
- um site WordPress local acessível em `http://alonguebe-cms.local` para editar conteúdo e receber formulários;
- o plugin **Alonguebe Headless CMS** instalado e ativado nesse WordPress.

As pastas `client/node_modules/` e `server/node_modules/` já podem existir na cópia local, mas são geradas pelo npm e não devem ser editadas.

## Início rápido

Na raiz do projeto, instale as dependências do frontend:

```bash
PATH="$PWD/.node-bin/bin:$PATH" npm --prefix client install
```

Inicie o site:

```bash
PATH="$PWD/.node-bin/bin:$PATH" npm --prefix client run dev
```

Abra `http://localhost:3000`.

O Vite encaminha requisições iniciadas por `/wp-json` para `http://alonguebe-cms.local`. Portanto, para carregar o conteúdo administrativo e enviar formulários, o WordPress Local também precisa estar ligado.

### Comando principal da raiz

Também existe o comando abaixo:

```bash
PATH="$PWD/.node-bin/bin:$PATH" npm start
```

Ele inicia o Vite na porta `3000`. Pressione `Ctrl+C` para encerrar o processo.

Se precisar estudar ou testar separadamente a API Express antiga, use `npm run start:legacy-api`. Ela não é necessária para o site atual.

## Configurar o WordPress

1. Copie a pasta `wordpress/alonguebe-headless-cms` para `wp-content/plugins/` da instalação WordPress.
2. Ative **Alonguebe Headless CMS** em **Plugins**.
3. Use o menu **Alonguebe CMS** para editar contatos, textos de seções, botões e imagens da seção Sobre.
4. Cadastre as listas nos menus **Serviços**, **Galeria**, **Depoimentos** e **Perguntas frequentes**.
5. Consulte os envios recebidos nos menus **Agendamentos** e **Mensagens**.

Para os itens de lista, use:

- **título** para nome ou pergunta;
- **editor** para descrição, depoimento ou resposta;
- **imagem destacada** para serviços e galeria;
- caixa **Detalhes do item** para categoria, cidade, estrelas e ordem, conforme o tipo.

As páginas comuns do WordPress com os slugs `inicio` e `sobre` são opcionais. Quando publicadas, podem substituir o conteúdo principal da Hero e o texto institucional da seção Sobre.

## Variável de ambiente

Em desenvolvimento não é necessário criar `.env`, pois o proxy do Vite já aponta para o WordPress Local.

Em produção, defina a URL pública do WordPress antes de gerar o build:

```bash
cp client/.env.example client/.env.production
```

Depois edite `client/.env.production`:

```dotenv
VITE_WORDPRESS_URL=https://cms.seudominio.com.br
```

Informe apenas a origem do WordPress, sem `/wp-json` no final. Variáveis Vite são incorporadas durante o build; após alterá-las, gere o build novamente.

## Comandos úteis

### Gerar o site de produção

```bash
PATH="$PWD/.node-bin/bin:$PATH" npm --prefix client run build
```

O resultado é criado em `client/dist/`.

### Conferir o build localmente

```bash
PATH="$PWD/.node-bin/bin:$PATH" npm --prefix client run preview
```

### Compartilhar uma prévia temporária

Com o Vite e o WordPress Local ligados, execute em outro terminal:

```bash
PATH="$PWD/.node-bin/bin:$PATH" npm run share
```

O endereço `https://...trycloudflare.com` muda a cada execução e só funciona enquanto o túnel, o site, o WordPress e o computador permanecerem ligados.

## Estrutura principal

```text
.
├── client/
│   ├── public/images/          # Imagens estáticas copiadas para o build
│   ├── src/components/         # Seções visuais da página
│   ├── src/context/            # Carregamento global do CMS
│   ├── src/hooks/              # Hook para páginas comuns do WordPress
│   ├── src/services/           # Cliente da REST API padrão do WordPress
│   ├── src/App.jsx             # Ordem das seções e dados locais principais
│   ├── src/main.jsx            # Entrada do React
│   ├── src/styles.css          # Design e responsividade
│   ├── index.html              # HTML base e SEO
│   └── vite.config.js          # Build, porta e proxies locais
├── wordpress/
│   └── alonguebe-headless-cms/ # Plugin, painel e rotas REST atuais
├── server/                     # Backend Express legado
├── scripts/start.js            # Inicializador do frontend em desenvolvimento
├── robots.txt                  # Regras para buscadores
├── sitemap.xml                 # URLs apresentadas aos buscadores
└── DOCUMENTACAO.md             # Guia técnico e de manutenção
```

## Onde alterar informações

- Conteúdo editorial: painel do WordPress, preferencialmente.
- Valores usados quando o CMS está fora do ar: `client/src/App.jsx` e componentes em `client/src/components/`.
- Cores, fontes, espaçamentos e responsividade: `client/src/styles.css`.
- Campos oferecidos pelo painel: `wordpress/alonguebe-headless-cms/alonguebe-headless-cms.php`.
- Metadados de SEO e dados estruturados: `client/index.html`, `robots.txt` e `sitemap.xml`.
- URL do WordPress local: proxy `/wp-json` em `client/vite.config.js`.

Mantenha os dados públicos — domínio, telefone, endereço, Instagram e horários — iguais no WordPress, nos fallbacks React e no SEO de `client/index.html`.

## Publicação

1. Configure `VITE_WORDPRESS_URL` com a origem pública do CMS.
2. Execute o build do frontend.
3. Publique `client/dist/` em uma hospedagem de arquivos estáticos.
4. Publique o WordPress em uma hospedagem PHP e ative o plugin do projeto.
5. Garanta que o WordPress aceite requisições vindas do domínio do frontend. Em domínios diferentes, pode ser necessário configurar CORS no servidor WordPress.
6. Atualize domínio, imagem social, telefone, endereço e coordenadas em `client/index.html`, `robots.txt` e `sitemap.xml`.

## Limitações e segurança

- As rotas de envio do plugin são públicas para permitir formulários sem login. Elas possuem honeypot, verificação de tempo de preenchimento, bloqueio de duplicatas e limite de 5 tentativas por IP/formulário a cada 10 minutos. Para ataques mais sofisticados, considere CAPTCHA como camada adicional.
- O plugin valida nome e e-mail no servidor; os demais campos são higienizados, mas o agendamento ainda precisa ser confirmado pela equipe.
- A página comum do WordPress é inserida como HTML em Hero/Sobre. Somente usuários confiáveis devem ter permissão para editar esse conteúdo.
- A API Express em `server/` grava em JSON e expõe uma listagem sem autenticação. Não a use para dados reais sem uma revisão de segurança.
- Não coloque senhas ou chaves secretas em arquivos `VITE_*`: elas ficam visíveis no JavaScript entregue ao navegador.
