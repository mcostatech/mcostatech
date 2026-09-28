const STORAGE_KEY = "mcostatech-theme";

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* localStorage indisponível (modo privado etc.) — segue sem persistir */
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Liga o botão de alternância de tema.
 * A definição inicial do tema já acontece via script inline no <head>
 * (evita flash do tema errado); aqui só cuidamos da troca manual.
 */
export function initTheme() {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
    toggle.setAttribute(
      "aria-label",
      next === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
    );
  });

  // Se o usuário nunca escolheu manualmente, acompanha mudanças do sistema.
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (getStoredTheme()) return;
      applyTheme(event.matches ? "dark" : "light");
    });
}
