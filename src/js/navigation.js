export function initNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (toggle && mobileNav) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("data-open", "false");
      document.body.style.overflow = "";
    };

    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      mobileNav.setAttribute("data-open", "true");
      document.body.style.overflow = "hidden";
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  initMobileCtaBar();
}

/**
 * Esconde a barra fixa de conversão do mobile quando a seção de contato
 * (que já tem seus próprios CTAs) está visível, evitando redundância.
 */
function initMobileCtaBar() {
  const bar = document.querySelector("[data-mobile-cta-bar]");
  const contactSection = document.getElementById("contato");
  if (!bar || !contactSection || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      bar.setAttribute("data-hidden", entry.isIntersecting ? "true" : "false");
      document.body.classList.toggle("mobile-cta-hidden", entry.isIntersecting);
    },
    { rootMargin: "0px 0px -40% 0px" }
  );

  observer.observe(contactSection);
}
