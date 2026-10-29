(() => {
  "use strict";
  const cfg = window.NERVO_CONFIG;
  const qs = new URLSearchParams(location.search);
  const eventQueue = window.siteEventQueue = window.siteEventQueue || [];

  function recordEvent(name, detail = {}) {
    const event = { name, detail, timestamp: Date.now() };
    eventQueue.push(event);
    window.dispatchEvent(new CustomEvent("nervocure:event", { detail: event }));
    if (window.fbq && consentState() === "accepted") window.fbq("trackCustom", name, detail);
  }

  function trackedCheckout(rawUrl) {
    const url = new URL(rawUrl);
    const required = { ...cfg.ESSENTIAL_AFFILIATE_PARAMS, pl: url.searchParams.get("pl") };
    cfg.TRACKABLE_PARAMS.forEach((key) => {
      const value = qs.get(key);
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value.slice(0, 250));
    });
    Object.entries(required).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
    return url.toString();
  }

  function offerCard(offer, special = false) {
    const article = document.createElement("article");
    article.className = `offer-card${offer.featured ? " offer-card--featured" : ""}`;
    article.dataset.offerId = offer.id;
    if (offer.featured) article.dataset.mobileOrder = "first";
    const image = offer.image || "assets/images/frasco-oficial-02.webp";
    const imageClass = offer.imageClass || "offer-image--product";
    article.innerHTML = `
      ${offer.featured ? '<p class="offer-badge">Mais escolhido</p>' : ""}
      <div class="offer-visual">
        <img class="offer-image ${imageClass}" src="${image}" width="${imageClass === 'offer-image--photo' ? 720 : 768}" height="${imageClass === 'offer-image--photo' ? 1280 : 768}" loading="lazy" decoding="async" alt="Imagem do NervoCure Max para o kit de ${offer.boxes} ${offer.boxes === 1 ? "caixa" : "caixas"}">
        <div class="offer-image-labels">
        <span class="offer-quantity" aria-label="Quantidade: ${offer.boxes} caixas">×${offer.boxes}</span>
        ${offer.gift && !offer.gift.startsWith("Sem") ? '<span class="offer-gift-chip">+ brinde</span>' : ""}
        </div>
      </div>
      <p class="offer-eyebrow">${special ? "Oferta especial" : offer.label}</p>
      <h3>${offer.boxes} ${offer.boxes === 1 ? "caixa" : "caixas"}</h3>
      ${offer.gift ? `<p class="offer-gift">${offer.gift}</p>` : ""}
      <p class="offer-price">${offer.price}</p>
      <a class="button button--buy" href="${trackedCheckout(offer.url)}" data-offer="${offer.id}" rel="sponsored noopener">Escolher este kit</a>
      <p class="offer-note">A compra é concluída em ambiente de pagamento seguro.</p>`;
    return article;
  }

  function renderOffers() {
    const main = document.querySelector("#main-offers");
    const extended = document.querySelector("#extended-offers");
    cfg.OFFERS.forEach((offer) => (offer.placement === "main" ? main : extended).append(offerCard(offer)));
    const specialSection = document.querySelector("#special-offers-section");
    if (cfg.SHOW_SPECIAL_OFFERS) {
      specialSection.hidden = false;
      cfg.SPECIAL_OFFERS.forEach((offer) => document.querySelector("#special-offers").append(offerCard(offer, true)));
    }
  }

  function consentState() { return localStorage.getItem("nervocure_consent") || "unset"; }

  function loadMetaPixel() {
    if (!cfg.META_PIXEL_ID || consentState() !== "accepted" || window.fbq) return;
    /* Meta Pixel base code is injected only after affirmative consent. */
    window.fbq = function () { window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments); };
    window.fbq.queue = []; window.fbq.loaded = true; window.fbq.version = "2.0";
    const script = document.createElement("script");
    script.async = true; script.src = "https://connect.facebook.net/pt_BR/fbevents.js";
    document.head.append(script);
    window.fbq("init", cfg.META_PIXEL_ID);
    window.fbq("track", "PageView");
  }

  function setConsent(value) {
    localStorage.setItem("nervocure_consent", value);
    document.querySelector("#cookie-banner").hidden = true;
    document.querySelector("#cookie-status").textContent = value === "accepted" ? "Cookies opcionais aceitos." : "Cookies opcionais recusados.";
    if (value === "accepted") loadMetaPixel();
  }

  function setupConsent() {
    const banner = document.querySelector("#cookie-banner");
    if (consentState() === "unset") banner.hidden = false;
    document.querySelector("#accept-cookies").addEventListener("click", () => setConsent("accepted"));
    document.querySelector("#reject-cookies").addEventListener("click", () => setConsent("rejected"));
    document.querySelector("#review-cookies").addEventListener("click", () => { banner.hidden = false; banner.focus(); });
    if (consentState() === "accepted") loadMetaPixel();
  }

  function setupPage() {
    document.querySelectorAll('.proof-photo').forEach((figure) => {
      const image = figure.querySelector('img');
      const link = document.createElement('a');
      link.href = image.getAttribute('src');
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'proof-enlarge';
      link.textContent = 'Ampliar imagem ↗';
      link.setAttribute('aria-label', `Ampliar: ${image.alt} (abre em nova aba)`);
      figure.querySelector('figcaption').append(link);
    });
    document.querySelectorAll("[data-guarantee]").forEach((node) => node.textContent = cfg.GUARANTEE_DAYS);
    document.querySelectorAll("[data-email]").forEach((node) => node.textContent = cfg.COMMERCIAL_EMAIL);
    document.querySelectorAll("[data-email-link]").forEach((node) => node.href = `mailto:${cfg.COMMERCIAL_EMAIL}`);
    document.querySelectorAll("[data-responsible]").forEach((node) => node.textContent = cfg.LEGAL_RESPONSIBLE);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = new URL(location.pathname.replace(/index\.html$/, ""), cfg.BASE_URL).toString();
    document.addEventListener("click", (event) => {
      const offer = event.target.closest("[data-offer]");
      const offersAnchor = event.target.closest("a[href^='#ofertas']");
      if (offer) recordEvent("select_offer", { offer_id: offer.dataset.offer });
      if (offersAnchor) recordEvent("view_offers");
    }, { capture: true });
    document.querySelector("#year").textContent = new Date().getFullYear();
  }

  renderOffers();
  setupConsent();
  setupPage();
})();
