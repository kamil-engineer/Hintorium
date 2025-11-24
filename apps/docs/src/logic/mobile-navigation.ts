let mobileNavInitialized = false;

export const handleMobileNavigation = () => {
  if (mobileNavInitialized) return;
  mobileNavInitialized = true;

  const mobileMenu = document.querySelector(".mobile-nav");
  const toggleButton =
    document.querySelector<HTMLButtonElement>(".button--hamburger");
  const buttonIcon = toggleButton?.querySelector(".button__image");

  const openIcon = "/icons/icon-menu.svg";
  const closeIcon = "/icons/icon-close.svg";

  const toggleMenu = () => {
    const isOpen = mobileMenu?.classList.toggle("open");

    toggleButton?.setAttribute("aria-expanded", String(isOpen));
    toggleButton?.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    if (isOpen) {
      document.body.classList.add("body--no-scroll");
    } else {
      document.body.classList.remove("body--no-scroll");
    }

    if (!buttonIcon) return;

    buttonIcon.setAttribute("src", isOpen ? closeIcon : openIcon);
  };

  toggleButton?.addEventListener("click", toggleMenu);

  mobileMenu?.querySelectorAll(".link--navigation").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      toggleButton?.setAttribute("aria-expanded", "false");
      toggleButton?.setAttribute("aria-label", "Open menu");
      buttonIcon?.setAttribute("src", openIcon);

      document.body.classList.remove("body--no-scroll");
    });
  });
};
