export function initAccordion() {
  const items = document.querySelectorAll("[data-accordion-item]");

  items.forEach((item) => {
    const trigger = item.querySelector("[data-accordion-trigger]");
    const panel = item.querySelector("[data-accordion-panel]");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      setPanelState(trigger, panel, !isOpen);
    });
  });

  // Recalcula a altura de painéis abertos se a janela for redimensionada
  // (texto pode quebrar linha de forma diferente).
  window.addEventListener("resize", () => {
    document
      .querySelectorAll('[aria-expanded="true"][data-accordion-trigger]')
      .forEach((trigger) => {
        const panel = document.getElementById(
          trigger.getAttribute("aria-controls")
        );
        if (panel) panel.style.height = `${panel.scrollHeight}px`;
      });
  });
}

function setPanelState(trigger, panel, open) {
  trigger.setAttribute("aria-expanded", String(open));
  if (open) {
    panel.style.height = `${panel.scrollHeight}px`;
    panel.addEventListener(
      "transitionend",
      () => {
        if (trigger.getAttribute("aria-expanded") === "true") {
          panel.style.height = "auto";
        }
      },
      { once: true }
    );
  } else {
    if (panel.style.height === "auto") {
      panel.style.height = `${panel.scrollHeight}px`;
      // força reflow antes de animar para 0
      // eslint-disable-next-line no-unused-expressions
      panel.offsetHeight;
    }
    panel.style.height = "0px";
  }
}
