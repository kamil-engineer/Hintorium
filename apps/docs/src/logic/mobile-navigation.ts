class MobileNavigation {
  private config = {
    buttonSelector: "button--hamburger",
    buttonIconSelector: "button__image",
    menuSelector: "mobile-nav",
    wrapperSelector: "header-with-nav",
    linksSelector: "link--navigation",
    closeIcon: "/icons/icon-close.svg",
    openIcon: "/icons/icon-menu.svg",
  };

  private classModifiers = {
    menuOpen: "open",
    bodyScroll: "body--no-scroll",
  };

  private wrapper: HTMLElement | null = null;
  private menu: HTMLElement | null = null;
  private toggleButton: HTMLButtonElement | null = null;
  private buttonIcon: HTMLElement | null = null;
  private navLinks: NodeListOf<HTMLAnchorElement> | null = null;
  private isOpen = false;
  private cleanupFunctions: (() => void)[] = [];

  constructor() {
    this.init();

    console.log(this);
  }

  private init() {
    this.cleanup();

    if (!this.findElements()) return;

    this.isOpen =
      this.menu?.classList.contains(this.classModifiers.menuOpen) ?? false;

    this.updateButtonState();

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    if (!this.toggleButton || !this.menu || !this.wrapper) return;

    this.toggleButton.addEventListener(
      "click",
      this.handleToggleClick.bind(this)
    );

    this.cleanupFunctions.push(() => {
      this.toggleButton?.removeEventListener(
        "click",
        this.handleToggleClick.bind(this)
      );
    });

    this.navLinks?.forEach((link) => {
      link.addEventListener("click", this.handleLinkClick.bind(this));
    });

    this.cleanupFunctions.push(() => {
      this.navLinks?.forEach((link) => {
        link.removeEventListener("click", this.handleLinkClick.bind(this));
      });
    });

    document.addEventListener("click", this.handleOutsideClick.bind(this));

    this.cleanupFunctions.push(() => {
      document.removeEventListener("click", this.handleOutsideClick.bind(this));
    });

    document.addEventListener("keydown", this.handleKeydown.bind(this));
    this.cleanupFunctions.push(() => {
      document.removeEventListener("keydown", this.handleKeydown.bind(this));
    });
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      e.preventDefault();
      this.close();
      return;
    }

    if (e.key === "Tab" && this.isOpen) {
      this.trapFocus(e);
    }
  }

  private trapFocus(e: KeyboardEvent): void {
    if (!this.wrapper) return;

    const focusableElements = this.getFocusableElements();

    if (focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

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

  private getFocusableElements(): HTMLElement[] {
    if (!this.wrapper) return [];

    return Array.from(
      this.wrapper.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  private handleOutsideClick(e: Event): void {
    if (!this.isOpen || !this.wrapper || !this.menu) return;

    const target = e.target as Node;

    if (!this.wrapper.contains(target)) {
      this.close();
    }
  }

  private handleLinkClick(): void {
    this.close();
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  public open(): void {
    if (this.isOpen || !this.menu || !this.wrapper) return;

    this.isOpen = true;
    this.menu.classList.add(this.classModifiers.menuOpen);
    document.body.classList.add(this.classModifiers.bodyScroll);

    this.updateButtonState();
  }

  public close(): void {
    if (!this.isOpen || !this.menu || !this.wrapper) return;

    this.isOpen = false;
    this.menu.classList.remove(this.classModifiers.menuOpen);
    document.body.classList.remove(this.classModifiers.bodyScroll);

    this.updateButtonState();

    if (this.toggleButton) {
      this.toggleButton.focus();
    }
  }

  private handleToggleClick(e: Event): void {
    e.stopPropagation();
    this.toggle();
  }

  private updateButtonState(): void {
    if (!this.toggleButton) return;

    if (this.buttonIcon) {
      this.buttonIcon.setAttribute(
        "src",
        this.isOpen ? this.config.closeIcon : this.config.openIcon
      );
      this.buttonIcon.setAttribute(
        "alt",
        this.isOpen ? "Close menu icon" : "Open menu icon"
      );
    }

    this.toggleButton.setAttribute(
      "aria-label",
      this.isOpen ? "Close menu" : "Open menu"
    );
    this.toggleButton.setAttribute("aria-expanded", this.isOpen.toString());
  }

  private findElements() {
    this.wrapper = document.querySelector(`.${this.config.wrapperSelector}`);

    if (!this.wrapper) return false;

    this.menu = document.querySelector(`.${this.config.menuSelector}`);
    this.toggleButton = document.querySelector(
      `.${this.config.buttonSelector}`
    );
    this.buttonIcon = document.querySelector(
      `.${this.config.buttonSelector} .${this.config.buttonIconSelector}`
    );

    this.navLinks = document.querySelectorAll(`.${this.config.linksSelector}`);

    return !!(this.menu && this.toggleButton);
  }

  public cleanup(): void {
    this.cleanupFunctions.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    });
    this.cleanupFunctions = [];

    if (this.isOpen && this.menu && this.wrapper) {
      this.menu.classList.remove(this.classModifiers.menuOpen);
      document.body.classList.remove(this.classModifiers.bodyScroll);
    }

    this.wrapper = null;
    this.menu = null;
    this.toggleButton = null;
    this.buttonIcon = null;
    this.navLinks = null;
    this.isOpen = false;
  }
}

export const handleMobileNavigation = () => {
  return new MobileNavigation();
};
