# Relatório final de testes

Data: 29 de outubro de 2026

| Verificação | Resultado | Evidência |
|---|---:|---|
| Layout em 360 px | PASS | Sem rolagem horizontal; CTA e destaque legíveis |
| Layout em 390 px | PASS | Sem rolagem horizontal; cards em coluna |
| Layout em 768 px | PASS | Sem rolagem horizontal; hierarquia preservada |
| Layout desktop em 1440 px | PASS | Hero em duas colunas e ofertas equilibradas |
| Kit de 5 caixas primeiro no celular | PASS | Ordem visual verificada em 360, 390 e 768 px |
| Kit de 5 caixas com maior destaque | PASS | Borda, selo e elevação exclusivos |
| Kits de 8 e 12 caixas acessíveis | PASS | Seção expansível testada no navegador |
| Ofertas de 2, 4, 6 caixas e mensal ocultas | PASS | `SHOW_SPECIAL_OFFERS: false`; ativação por uma configuração |
| Cinco links públicos corretos | PASS | `pl`, `ck` e `af=afidn9137l` validados |
| Links especiais documentados | PASS | Quatro links preservados no arquivo de configuração |
| Propagação de UTMs e `fbclid` | PASS | URL real dos cards conferida com parâmetros de QA |
| Proteção dos parâmetros essenciais | PASS | Entrada externa não substitui `pl`, `ck` ou `af` |
| Garantia de 90 dias | PASS | Condição verificada na página atual do produtor; configuração, hero, selo, seção e FAQ coerentes |
| Imagens nos cinco kits | PASS | Imagens locais autorizadas, quantidade visível e carregamento tardio |
| Feedbacks de clientes | PASS | Quatro registros visuais e dois relatos reais sobre recebimento; nome, foto, telefone e etiquetas foram ocultados; aviso esclarece que não representam promessa de resultado |
| Identificação e contato | PASS | Responsável legal e e-mail comercial exibidos nas páginas públicas e documentos legais |
| Domínio preparado | PASS | Canonical, configuração, Open Graph, sitemap e robots preparados para `nuvessabemestar.com.br` |
| Busca por referências antigas e alegações indevidas | PASS | Nenhuma ocorrência encontrada no código publicável |
| Consentimento de cookies | PASS | Aceitar, recusar e rever testados |
| Meta Pixel vazio | PASS | Nenhum script da Meta carregado e nenhum erro no console |
| Páginas legais | PASS | Privacidade, Termos e Aviso Legal retornaram HTTP 200 |
| Página 404 | PASS | Rota inexistente retornou HTTP 404 com página própria |
| Recursos internos | PASS | Imagem, CSS, JS, favicon e links internos encontrados |
| Console do navegador | PASS | Zero erros e zero avisos durante a QA |
| Auditoria equivalente a Lighthouse | PASS | HTML semântico, árvore acessível, foco, contraste, SEO, dimensões de imagem, preload, recursos locais, segurança e peso dos recursos revisados; CLI Lighthouse não estava disponível no ambiente |
| Build estático | PASS | Conteúdo gerado em `dist/` e servido localmente |

Auditoria automatizada: **53 PASS / 0 FAIL**.

## Limitações documentadas

- A composição e o modo de uso foram omitidos nesta versão até revisão regulatória do rótulo atual.
- Prazo de entrega absoluto não foi publicado.
- O domínio está preparado no código, mas ainda precisa ser registrado e conectado; o Meta Pixel permanece vazio até a criação do ID.
- A publicação remota não foi executada porque não há conta/projeto de hospedagem conectado neste ambiente; o pacote está pronto para GitHub e Cloudflare Pages.
