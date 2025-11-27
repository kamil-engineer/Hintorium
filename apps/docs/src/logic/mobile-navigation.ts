let initialized = false;
let trapListener: ((e: KeyboardEvent) => void) | null = null;

export const handleMobileNavigation = () => {
  const wrapper = document.querySelector<HTMLElement>(".header-with-nav");
  if (!wrapper) return;

  const mobileMenu = wrapper.querySelector<HTMLElement>(".mobile-nav");
  const toggleButton =
    wrapper.querySelector<HTMLButtonElement>(".button--hamburger");
  const buttonIcon =
    toggleButton?.querySelector<HTMLImageElement>(".button__image");

  if (!mobileMenu || !toggleButton) return;

  const openIcon = "/icons/icon-menu.svg";
  const closeIcon = "/icons/icon-close.svg";

  // ------------------------------------------------------
  // 1. Odpinanie starego trapFocus
  // ------------------------------------------------------
  if (trapListener) {
    document.removeEventListener("keydown", trapListener);
    trapListener = null;
  }

  // ------------------------------------------------------
  // 2. TrapFocus z aktualnymi referencjami
  // ------------------------------------------------------
  const trapFocus = (e: KeyboardEvent) => {
    if (!wrapper.classList.contains("menu-open")) return;

    const focusable = Array.from(
      mobileMenu.querySelectorAll<HTMLElement>(
        `a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])`
      )
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Escape") {
      closeMenu();
      return;
    }

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  // ------------------------------------------------------
  // 3. Funkcje otwierania i zamykania
  // ------------------------------------------------------
  const openMenu = () => {
    mobileMenu.classList.add("open");
    wrapper.classList.add("menu-open");
    document.body.classList.add("body--no-scroll");

    // fokus na pierwszy element
    mobileMenu.querySelector<HTMLElement>(".link--navigation")?.focus();

    trapListener = trapFocus;
    document.addEventListener("keydown", trapListener);

    if (buttonIcon) {
      buttonIcon.src = closeIcon;
      toggleButton.setAttribute("aria-label", "Close menu");
      toggleButton.setAttribute("aria-expanded", "true");
    }
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    wrapper.classList.remove("menu-open");
    document.body.classList.remove("body--no-scroll");

    toggleButton.focus();

    if (trapListener) {
      document.removeEventListener("keydown", trapListener);
      trapListener = null;
    }

    if (buttonIcon) {
      buttonIcon.src = openIcon;
      toggleButton.setAttribute("aria-label", "Open menu");
      toggleButton.setAttribute("aria-expanded", "false");
    }
  };

  // ------------------------------------------------------
  // 4. Event listener na toggle — dodany TYLKO raz
  // ------------------------------------------------------

  document.body.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest(".button--hamburger");
    if (btn) {
      if (btn.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    }
  });

  // ------------------------------------------------------
  // 5. Linki zamykające menu — zawsze podpinane na aktualnym DOM
  // ------------------------------------------------------
  mobileMenu.querySelectorAll(".link--navigation").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
};
