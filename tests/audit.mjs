import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const pass = [];
const fail = [];
const check = (condition, label) => (condition ? pass : fail).push(label);
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

const sandbox = { window: {} };
vm.runInNewContext(read("js/config.js"), sandbox);
const cfg = sandbox.window.NERVO_CONFIG;
const index = read("index.html");
const mainJs = read("js/main.js");
const deployFiles = ["index.html", "privacidade.html", "termos.html", "aviso-legal.html", "404.html", "css/styles.css", "js/config.js", "js/main.js"];
const content = deployFiles.map(read).join("\n").toLowerCase();

check(cfg.OFFERS.length === 5, "Cinco ofertas públicas configuradas");
check(cfg.OFFERS.filter(o => o.placement === "main").length === 3, "Primeira vitrine contém 1, 3 e 5 caixas");
check(cfg.OFFERS.find(o => o.id === "5-caixas")?.featured === true, "Kit de 5 caixas marcado como destaque");
check(cfg.OFFERS.filter(o => o.placement === "extended").map(o => o.boxes).join(",") === "8,12", "Kits de 8 e 12 caixas ficam na área expansível");
check(cfg.SHOW_SPECIAL_OFFERS === false && cfg.SPECIAL_OFFERS.length === 4, "Ofertas especiais ocultas e configuráveis por uma chave");
check(cfg.GUARANTEE_DAYS === 90 && index.includes("Garantia de 90 dias"), "Garantia consistente em 90 dias");
check(cfg.LEGAL_RESPONSIBLE === "NUVESSA BEM ESTAR LTDA" && cfg.COMMERCIAL_EMAIL === "nuvessabemestar@gmail.com", "Responsável e contato comercial configurados");
check(cfg.BASE_URL === "https://nuvessabemestar.com.br" && read("sitemap.xml").includes(cfg.BASE_URL), "Domínio futuro centralizado no SEO e sitemap");
check(index.includes('id="experiencias"') && index.includes("O meu pedido chegou, com uma embalagem segura e em perfeito estado.") && index.toLowerCase().includes("não representam promessa de benefício ou resultado de uso."), "Feedbacks reais, anônimos e com aviso de transparência");
check((index.match(/assets\/images\/social\/cliente-/g) || []).length === 3 && index.includes("kit-source-04.jpeg"), "Galeria de prova social contém quatro registros visuais locais");
check(!index.includes("Ermelinda") && !index.includes("94226-8188") && !index.includes("DESTINATÁRIO"), "Provas sociais publicadas sem dados pessoais visíveis no HTML");
check(!content.includes("[responsável legal a definir]") && !content.includes("[e-mail comercial a definir]") && !content.includes("seu-dominio-aqui"), "Nenhum placeholder público restante");
check(cfg.OFFERS.every(o => o.image && fs.existsSync(path.join(root, o.image))), "Todos os kits possuem imagem local configurada");
check(mainJs.includes('class="offer-quantity"') && mainJs.includes('loading="lazy"'), "Cards exibem quantidade e carregam imagens sob demanda");
check(cfg.META_PIXEL_ID === "", "Meta Pixel vazio por padrão");
check(mainJs.includes('consentState() !== "accepted"') && mainJs.includes("!cfg.META_PIXEL_ID"), "Pixel protegido por consentimento e configuração");

for (const offer of [...cfg.OFFERS, ...cfg.SPECIAL_OFFERS]) {
  const url = new URL(offer.url);
  check(url.hostname === "pay.braip.co" && url.searchParams.get("af") === "afidn9137l" && url.searchParams.get("ck") === "cherq188" && Boolean(url.searchParams.get("pl")), `Link ${offer.id} preserva pl, ck e afiliado`);
}

const sample = new URL(cfg.OFFERS[2].url);
const incoming = new URLSearchParams("utm_source=facebook&utm_campaign=teste&fbclid=abc123&af=tentativa");
for (const key of cfg.TRACKABLE_PARAMS) if (incoming.has(key) && !sample.searchParams.has(key)) sample.searchParams.set(key, incoming.get(key));
Object.entries({ ...cfg.ESSENTIAL_AFFILIATE_PARAMS, pl: new URL(cfg.OFFERS[2].url).searchParams.get("pl") }).forEach(([k,v]) => sample.searchParams.set(k,v));
check(sample.searchParams.get("utm_source") === "facebook" && sample.searchParams.get("fbclid") === "abc123", "UTMs e fbclid são propagados");
check(sample.searchParams.get("af") === "afidn9137l" && sample.searchParams.get("pl") === "plag1ngm", "Parâmetros essenciais não são sobrescritos por entrada externa");

const forbidden = [
  ["aprovado pela ", "anvisa"].join(""), ["aprovado pela ", "fda"].join(""),
  ["regenera os ", "nervos"].join(""), ["cura ", "garantida"].join(""),
  ["reversão da ", "neuropatia"].join(""), ["abandone seus ", "medicamentos"].join(""),
  ["estoque ", "acabando"].join(""), ["últimas ", "unidades"].join("")
];
for (const phrase of forbidden) check(!content.includes(phrase), `Ausência da alegação/urgência indevida: ${phrase}`);

const internalLinks = [...index.matchAll(/(?:href|src)="(?!https?:|#|mailto:)([^"?]+)"/g)].map(m => m[1]);
for (const target of internalLinks) check(fs.existsSync(path.join(root, target)), `Recurso interno existe: ${target}`);
check(index.includes('width="768" height="768"') && index.includes('fetchpriority="high"'), "Imagem principal tem dimensões e prioridade declaradas");
check(index.includes('id="cookie-banner"') && index.includes('id="reject-cookies"') && index.includes('id="review-cookies"'), "Consentimento permite aceitar, recusar e rever");
check(read("_headers").includes("Content-Security-Policy") && read("_headers").includes("X-Content-Type-Options"), "Cabeçalhos de segurança configurados");

console.log(`PASS: ${pass.length}`);
pass.forEach(item => console.log(`  ✓ ${item}`));
if (fail.length) {
  console.error(`FAIL: ${fail.length}`);
  fail.forEach(item => console.error(`  ✗ ${item}`));
  process.exitCode = 1;
} else console.log("FAIL: 0");
