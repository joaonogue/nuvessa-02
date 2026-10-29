# Nuvessa Bem-Estar

Loja estática, mobile-first e sem dependências para apresentar o catálogo da Nuvessa Bem-Estar. A primeira vitrine apresenta o NervoCure Max e conclui a compra em ambiente externo seguro.

## Publicação rápida

### GitHub + Cloudflare Pages (recomendado)

1. Extraia `nervocuremax-github-completo.zip` em uma pasta.
2. Crie o repositório `nervocuremax-landing-afiliado` no GitHub e envie o conteúdo extraído. `index.html`, `build.mjs`, `assets`, `css` e `js` devem ficar na raiz do repositório. Não envie apenas o ZIP.
3. No Cloudflare Pages, crie um projeto conectado a esse repositório e selecione a branch `main`.
4. Framework: `None`. Comando de build: `node build.mjs`. Diretório de saída: `dist`. Diretório raiz: deixe vazio (raiz do repositório).
5. Publique e abra a URL `pages.dev` informada pelo Cloudflare. Atualizações enviadas à branch conectada geram novas publicações.
6. Para usar `nuvessabemestar.com.br`, registre o domínio e adicione-o como domínio personalizado no projeto Pages, seguindo as instruções de DNS.

O build usa Node.js e funciona no ambiente Linux do Cloudflare, sem instalar dependências. `build.ps1` é uma alternativa apenas para uso local no Windows.

### Cloudflare Pages por upload direto

Use `nervocuremax-cloudflare-publicar.zip`, que contém somente os arquivos públicos, com `index.html` na raiz. Envie esse ZIP na opção de upload de arquivos do Cloudflare Pages. Se a interface solicitar uma pasta, extraia o ZIP e selecione a pasta extraída. Não há comando de build nesse modo.

O nome e o e-mail já estão preenchidos. O domínio configurado é `https://nuvessabemestar.com.br`. Se usar outro endereço definitivo, ajuste `BASE_URL` em `js/config.js` e as URLs em `index.html`, `robots.txt` e `sitemap.xml`. Meta Pixel vazio é intencional.

### GitHub Pages (opcional)

Como o site não depende de servidor, o conteúdo de `dist/` também pode ser publicado no GitHub Pages. Para Cloudflare, mantenha `_headers` na raiz do diretório publicado.

## Configuração centralizada

Edite apenas `js/config.js` para alterar:

- `BUSINESS_NAME`: nome da loja (`Nuvessa Bem-Estar`);
- `LEGAL_RESPONSIBLE`: NUVESSA BEM ESTAR LTDA;
- `COMMERCIAL_EMAIL`: `nuvessabemestar@gmail.com`;
- `BASE_URL`: preparado para `https://nuvessabemestar.com.br`;
- `META_PIXEL_ID`: ID futuro do Meta Pixel;
- `GUARANTEE_DAYS`: configurado em `90`, conforme a página atual do produtor verificada em 29/10/2026;
- `SHOW_SPECIAL_OFFERS`: altere para `true` somente após confirmar as condições das ofertas ocultas;
- `OFFERS` e `SPECIAL_OFFERS`: links, valores e disponibilidade.

Com `META_PIXEL_ID: ""`, nenhum script da Meta é carregado. Mesmo após inserir um ID, o Pixel só é iniciado depois do consentimento para cookies opcionais.

## Testes

Execute:

```powershell
node .\tests\audit.mjs
powershell -ExecutionPolicy Bypass -File .\build.ps1
```

O teste automatizado verifica ofertas, destaque, garantia, links Braip, afiliado, propagação de UTMs, alegações indevidas, recursos internos, consentimento e cabeçalhos de segurança.

## Materiais utilizados

Apresentação `assets/videos/apresentacao-embalagem.mp4` e capa `.jpg`: origem `Remarketing Nervocuremax.mp4`, Drive `1OuFJz6ty_FC70986dSJJ2tQ3OzgNfzb1`. Recorte da metade direita abaixo das faixas promocionais (510 × 640), excluindo etiquetas de envio da metade esquerda. Áudio removido; vídeo H.264 a 30 fps, sem autoplay e com preload desativado. Capa extraída aos 13 segundos. Exibido após a apresentação textual e antes dos feedbacks.

Vídeo `assets/videos/recebimento-caixa.mp4`: trecho de 0 a 2,5 segundos de `WhatsApp Video 2026-02-23 at 14.29.56.mp4`, arquivo Drive `1v9_aNFWMUWhrzjb3U3Anq7atzREDYuh4`, pasta DEPOIMENTOS. Recorte superior para excluir papéis de fundo, áudio removido e trecho com etiqueta excluído. `recebimento-caixa.jpg` é um quadro do mesmo vídeo. Reprodução manual, sem carregamento antecipado. O segundo vídeo (`depoimento nervo.mp4`) foi excluído por mostrar apenas etiqueta com dados pessoais.

Identificação empresarial alterada para `NUVESSA BEM ESTAR LTDA` conforme informado pelo proprietário; cadastro empresarial não verificado e nenhum CNPJ adicionado.

| Arquivo local | Uso | Origem |
|---|---|---|
| `assets/images/frasco-oficial-02.webp` | Imagem principal do produto | Pasta pública “💊 FRASCOS PNG” no Drive principal fornecido pelo afiliado: `1gtRBG5jJjgROlyhknQoVGPDKDO4LZ3GR` |
| `assets/images/kit-source-02.jpeg` | Foto autorizada na vitrine do kit de 8 caixas | Pasta pública “💊 FRASCOS PNG” no mesmo Drive principal |
| `assets/images/kit-source-03.jpeg` | Foto autorizada na vitrine do kit de 12 caixas | Pasta pública “💊 FRASCOS PNG” no mesmo Drive principal |
| `assets/images/kit-source-04.jpeg` | Foto autorizada na vitrine do kit de 1 caixa | Pasta pública “💊 FRASCOS PNG” no mesmo Drive principal |
| `assets/images/social/cliente-recebimento-01.jpg` | Foto de produto recebido por cliente | Pasta pública “💚 DEPOIMENTOS” no Drive principal; arquivo `102bb9f0-...jpg` |
| `assets/images/social/cliente-relato-01.jpg` | Captura de relato e foto de recebimento | Pasta pública “💚 DEPOIMENTOS”; captura de 18/02/2026, anonimizada para ocultar nome e foto |
| `assets/images/social/cliente-relato-02.jpg` | Captura de relato e caixa aberta | Pasta pública “💚 DEPOIMENTOS”; captura de 08/05/2026, anonimizada para ocultar telefone, destinatário e etiquetas |
| `assets/icons/favicon.svg` | Símbolo abstrato neutro | Criado para este projeto; não representa certificação médica |
| Trechos textuais anônimos da seção “Experiências” | Relatos de recebimento, sem alegações de resultado | Pasta pública “💚 DEPOIMENTOS” no Drive principal; capturas de 18/02/2026 e 08/05/2026 |

Nenhuma imagem é carregada por hotlink. Os arquivos brutos que continham dados pessoais não fazem parte do pacote publicável.

## Pendências antes da publicação definitiva

- registrar e conectar `nuvessabemestar.com.br` à hospedagem;
- realizar pesquisa formal de disponibilidade da marca Nuvessa no INPI antes do registro;
- informar Meta Pixel ID, se for utilizado;
- revisar juridicamente o rótulo atual antes de eventual inclusão de composição, quantidades, advertências e modo de uso;
- fazer revisão jurídica final dos textos legais e das condições do produtor/Braip.

Composição, doses e posologia foram deliberadamente omitidas nesta versão até uma revisão regulatória do rótulo atual. A garantia de 90 dias foi conferida na página atual do produtor; a página não reproduz alegações terapêuticas, selos de autoridade, endossos, estudos, depoimentos ou prazos absolutos encontrados em materiais promocionais.

## Estrutura

```text
index.html
privacidade.html
termos.html
aviso-legal.html
404.html
assets/
css/styles.css
js/config.js
js/main.js
tests/audit.mjs
_headers
robots.txt
sitemap.xml
build.ps1
dist/                 # gerado pelo build
```

## Observação de afiliação

Os links preservam `pl`, `ck=cherq188` e `af=afidn9137l`. A função de navegação acrescenta, quando presentes, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` e `fbclid`, sem aceitar que a visita sobrescreva os parâmetros essenciais.
