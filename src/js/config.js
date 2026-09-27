/**
 * Ponto único de configuração dos dados de contato.
 * Troque os valores abaixo quando os dados reais estiverem disponíveis —
 * nenhum outro arquivo precisa ser alterado, pois os links são montados
 * a partir daqui (ver main.js -> applyContactInfo).
 *
 * IMPORTANTE: mantenha os placeholders entre colchetes até ter o dado real.
 * Consulte o README, seção "Antes de publicar".
 */
export const CONTACT = {
  email: "mcostatech@hotmail.com",
  whatsapp: "51997783444", // ex.: 5515999999999 (DDI+DDD+número, somente dígitos)
  instagram: "mcostatech", // ex.: mcostatech
  domain: "mcostatech.com.br", // ex.: mcostatech.com.br
  region: "Sorocaba, São Paulo", // ex.: Sorocaba e região
  googleBusinessUrl: "https://share.google/dbe4NRW8xmJuUsm4e",
};

const isPlaceholder = (value) => /^\[.*\]$/.test(value.trim());

/** Retorna o link de WhatsApp, ou null enquanto o número for um placeholder. */
export function getWhatsappLink(message = "") {
  if (isPlaceholder(CONTACT.whatsapp)) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${CONTACT.whatsapp}${text}`;
}

export function getInstagramLink() {
  if (isPlaceholder(CONTACT.instagram)) return null;
  return `https://instagram.com/${CONTACT.instagram}`;
}

export function getMailLink(subject = "") {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${CONTACT.email}${query}`;
}

export function isConfigured(value) {
  return !isPlaceholder(value);
}
