import { initTheme } from "./theme.js";
import { initNavigation } from "./navigation.js";
import { initAccordion } from "./accordion.js";
import { initContactForm } from "./form.js";
import {
  CONTACT,
  getWhatsappLink,
  getInstagramLink,
  isConfigured,
} from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initAccordion();
  initContactForm();
  applyContactInfo();
  setFooterYear();
  initRevealOnScroll();
});

/**
 * Preenche todos os links de contato (WhatsApp, Instagram, Google Business)
 * a partir de src/js/config.js. Enquanto um dado for placeholder, o link
 * correspondente é desativado visualmente e explica o motivo em vez de
 * levar a um destino quebrado.
 */
function applyContactInfo() {
  document.querySelectorAll("[data-contact='whatsapp']").forEach((el) => {
    const href = getWhatsappLink(el.dataset.waMessage || "");
    setLinkOrDisable(el, href, "WhatsApp ainda não configurado");
  });

  document.querySelectorAll("[data-contact='instagram']").forEach((el) => {
    const href = getInstagramLink();
    setLinkOrDisable(el, href, "Instagram ainda não configurado");
  });

  document.querySelectorAll("[data-contact='google-business']").forEach((el) => {
    const href = isConfigured(CONTACT.googleBusinessUrl)
      ? CONTACT.googleBusinessUrl
      : null;
    setLinkOrDisable(el, href, "Perfil do Google ainda não configurado");
  });

  document.querySelectorAll("[data-contact='region']").forEach((el) => {
    el.textContent = isConfigured(CONTACT.region)
      ? CONTACT.region
      : el.dataset.fallback || el.textContent;
  });
}

function setLinkOrDisable(el, href, reason) {
  if (href) {
    el.href = href;
    el.removeAttribute("aria-disabled");
    el.removeAttribute("title");
    return;
  }
  el.href = "#contato";
  el.setAttribute("aria-disabled", "true");
  el.title = reason;
}

function setFooterYear() {
  const el = document.querySelector("[data-current-year]");
  if (el) el.textContent = new Date().getFullYear();
}

/** Revela seções e cartões discretamente ao entrarem na tela (uma vez só). */
function initRevealOnScroll() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}
