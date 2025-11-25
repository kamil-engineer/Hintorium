let mobileNavInitialized = false;

export const handleMobileNavigation = () => {
  if (mobileNavInitialized) return;
  
  mobileNavInitialized = true;

  const wrapper = document.querySelector<HTMLElement>(".header-with-nav");
  if (!wrapper) return;

  const mobileMenu = wrapper.querySelector<HTMLElement>(".mobile-nav");
  const toggleButton =
    wrapper.querySelector<HTMLButtonElement>(".button--hamburger");
  const buttonIcon =
    toggleButton?.querySelector<HTMLImageElement>(".button__image");

  const openIcon = "/icons/icon-menu.svg";
  const closeIcon = "/icons/icon-close.svg";

  if (!mobileMenu || !toggleButton) return;

  const openMenu = () => {
    mobileMenu.classList.add("open");
    wrapper.classList.add("menu-open");
    document.body.classList.add("body--no-scroll");

    // focus na pierwszy link menu
    const firstLink =
      mobileMenu.querySelector<HTMLElement>(".link--navigation");
    firstLink?.focus();

    document.addEventListener("keydown", trapFocus);
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    wrapper.classList.remove("menu-open");
    document.body.classList.remove("body--no-scroll");
    toggleButton.focus();
    document.removeEventListener("keydown", trapFocus);
  };

  const trapFocus = (e: KeyboardEvent) => {
    if (!wrapper.classList.contains("menu-open")) return;

    const focusable = Array.from(
      wrapper.querySelectorAll<HTMLElement>(
        `a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])`
      )
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Escape") {
      e.preventDefault();
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

  toggleButton.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }

    if (buttonIcon) {
      buttonIcon.src = mobileMenu.classList.contains("open")
        ? closeIcon
        : openIcon;
      toggleButton.setAttribute(
        "aria-label",
        mobileMenu.classList.contains("open") ? "Close menu" : "Open menu"
      );
      toggleButton.setAttribute(
        "aria-expanded",
        mobileMenu.classList.contains("open") ? "true" : "false"
      );
    }
  });

  mobileMenu.querySelectorAll(".link--navigation").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
};
