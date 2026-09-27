# MCosta Tech — Landing Page

## Sobre

Landing page institucional da **MCosta Tech**, empresa de suporte, manutenção
e soluções em tecnologia para pessoas e pequenos negócios. Construída em
HTML5, CSS3 e JavaScript puro (sem frameworks), mobile-first, com tema
claro/escuro, formulário de contato validado e SEO on-page básico.

## Tecnologias

- HTML5 semântico
- CSS3 (Custom Properties, Grid, Flexbox, `clamp()`)
- JavaScript ES6+ (módulos nativos, sem build step)

Nenhuma dependência externa além das fontes do Google Fonts.

## Estrutura do projeto

```text
mcosta-tech/
├── src/
│   ├── assets/
│   │   ├── favicon.svg        (placeholder — ver "Antes de publicar")
│   │   └── images/            (pasta para imagens reais, ex.: social-preview.jpg)
│   │
│   ├── styles/
│   │   ├── variables.css      (tokens: cor, tipografia, espaçamento, tema)
│   │   ├── base.css            (reset, tipografia base, acessibilidade)
│   │   ├── layout.css          (container, grids, header/footer)
│   │   ├── components.css      (botões, cartões, accordion, formulário...)
│   │   └── sections.css        (estilos específicos de hero, sobre, CTA final)
│   │
│   └── js/
│       ├── config.js           (dados de contato centralizados)
│       ├── theme.js             (alternância de tema claro/escuro)
│       ├── navigation.js        (menu mobile + barra fixa de CTA)
│       ├── accordion.js         (FAQ acessível)
│       ├── form.js              (validação do formulário + envio via mailto)
│       └── main.js              (ponto de entrada; liga os módulos acima)
│
├── index.html
└── README.md
```

A pasta `src/assets/` está pronta para receber `logo.svg` quando o arquivo
da logo oficial estiver disponível — veja a seção "Antes de publicar".

## Como executar localmente

Por usar módulos ES (`type="module"`), o navegador bloqueia o carregamento
via `file://`. Use um servidor local simples, por exemplo:

- **VS Code**: extensão *Live Server* → botão "Go Live"
- **Node.js**: `npx serve .` na raiz do projeto
- **Python**: `python3 -m http.server` na raiz do projeto

Depois acesse `http://localhost:<porta>`.

## Tema claro/escuro

O tema segue a preferência do sistema (`prefers-color-scheme`) por padrão.
Ao clicar no botão de alternância, a escolha manual é salva em
`localStorage` e passa a ter prioridade sobre a preferência do sistema. Um
pequeno script inline no `<head>` aplica essa escolha salva antes da
primeira renderização, evitando o flash do tema errado.

## Formulário

O formulário de contato faz validação 100% no front-end (HTML5 + JS) e,
hoje, sem backend: ao enviar, ele abre o cliente de e-mail do usuário
(`mailto:`) já com os dados preenchidos, endereçado para
`mcostatech@hotmail.com`.

Para trocar por um envio real (API própria, Formspree, EmailJS, Netlify
Forms etc.), edite apenas a função `sendViaMailto` em `src/js/form.js` —
ela já está isolada e comentada como ponto de integração. O restante do
formulário (validação, mensagens de sucesso/erro) não precisa mudar.

## Deploy

O projeto é 100% estático — basta publicar a pasta inteira. Algumas opções
gratuitas:

- **GitHub Pages**: subir o repositório e ativar Pages apontando para a
  branch principal
- **Cloudflare Pages**, **Netlify** ou **Vercel**: conectar o repositório
  e usar o deploy padrão para site estático (sem comando de build)

Nenhuma plataforma é obrigatória — qualquer hospedagem de arquivos
estáticos funciona.

## Evolução futura

A arquitetura foi pensada para crescer sem precisar refazer a identidade
do site:

- Integração real do WhatsApp e de um backend de formulário
- Analytics (o `<head>` já indica, em comentário, onde adicionar scripts de medição quando necessário)
- Depoimentos reais na seção "Avaliações" (hoje com placeholder honesto)
- Páginas individuais por serviço
- Blog
- Seção dedicada e mais completa para pequenos negócios
- SEO local mais avançado assim que houver endereço/telefone públicos
