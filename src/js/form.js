import { CONTACT } from "./config.js";

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const fields = Array.from(form.querySelectorAll("[required]"));

  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      field.dataset.touched = "true";
      showFieldError(field);
    });
    field.addEventListener("input", () => {
      if (field.dataset.touched === "true") showFieldError(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    fields.forEach((field) => {
      field.dataset.touched = "true";
      showFieldError(field);
    });

    if (!form.checkValidity()) {
      setStatus(status, "error", "Verifique os campos destacados antes de enviar.");
      form.querySelector(":invalid")?.focus();
      return;
    }

    sendViaMailto(form);
    setStatus(
      status,
      "success",
      "Abrimos seu aplicativo de e-mail com a mensagem preenchida. Não recebeu? Escreva direto para " +
        CONTACT.email +
        "."
    );
    form.reset();
    fields.forEach((field) => delete field.dataset.touched);
  });
}

function showFieldError(field) {
  const errorEl = field
    .closest(".form-field")
    ?.querySelector("[data-field-error]");
  if (!errorEl) return;

  if (field.validity.valid) {
    errorEl.textContent = "";
    return;
  }

  if (field.validity.valueMissing) {
    errorEl.textContent = "Este campo é obrigatório.";
  } else if (field.validity.typeMismatch || field.validity.patternMismatch) {
    errorEl.textContent = "Verifique o formato preenchido.";
  } else {
    errorEl.textContent = "Campo inválido.";
  }
}

/**
 * PONTO DE INTEGRAÇÃO FUTURA
 * -----------------------------------------------------------------------
 * Como este projeto é HTML/CSS/JS puro, sem backend, o envio hoje abre
 * o cliente de e-mail do usuário via `mailto:` com os dados preenchidos.
 *
 * Para substituir por um envio real (API própria, Formspree, EmailJS,
 * Netlify Forms etc.), troque apenas o corpo desta função por uma
 * chamada `fetch(...)` para o serviço escolhido, usando `formData` abaixo.
 * O restante do formulário (validação, mensagens de estado) continua igual.
 */
function sendViaMailto(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const subject = `Solicitação de atendimento — ${data.assunto || "Contato pelo site"}`;
  const body = [
    `Nome: ${data.nome || ""}`,
    `Contato: ${data.contato || ""}`,
    `Tipo de equipamento: ${data.equipamento || ""}`,
    `Assunto: ${data.assunto || ""}`,
    "",
    "Mensagem:",
    data.mensagem || "",
  ].join("\n");

  const link = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = link;
}

function setStatus(el, state, message) {
  if (!el) return;
  el.textContent = message;
  el.dataset.state = state;
}
